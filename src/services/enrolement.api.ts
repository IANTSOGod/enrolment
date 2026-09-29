
const API_URL = import.meta.env.VITE_API_URL ?? '';

function getAccessToken(): string {
	const accessToken = localStorage.getItem('accessToken');
	if (!accessToken) throw new Error('Session expirée. Veuillez vous reconnecter.');
	return accessToken;
}

async function getErrorMessage(response: Response): Promise<string> {
	const message = await response.text();
	return message || `Erreur HTTP ${response.status}`;
}

export async function uploadFile(file: File): Promise<UploadedFile> {
	const formData = new FormData();
	formData.append('file', file);
	const response = await fetch(`${API_URL}/files`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${getAccessToken()}` },
		body: formData
	});

	if (!response.ok) throw new Error(await getErrorMessage(response));

	const result = (await response.json()) as UploadedFile;
	if (!result.path) throw new Error('La réponse de /files ne contient pas de chemin.');
	return result;
}

async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
	const response = await fetch(dataUrl);
	const blob = await response.blob();
	return new File([blob], filename, { type: blob.type || 'image/jpeg' });
}

export async function submitEnrolmentDraft(draft: EnrolmentDraft): Promise<unknown> {
	if (!draft.documents?.front || !draft.documents.back) {
		throw new Error('Les images recto et verso du CIN sont obligatoires.');
	}
	const captures = [
		{ key: 'front' as const, capture: draft.faceCapture.front },
		{ key: 'leftProfile' as const, capture: draft.faceCapture.leftProfile },
		{ key: 'rightProfile' as const, capture: draft.faceCapture.rightProfile }
	];
	if (captures.some(({ capture }) => !capture)) {
		throw new Error('Les trois captures faciales sont obligatoires.');
	}
	if (captures.some(({ capture }) =>
		!capture?.embedding.length || capture.embedding.some((value) => !Number.isFinite(value))
	)) {
		throw new Error('Chaque capture faciale doit contenir un vecteur biométrique valide.');
	}
	if (!draft.consent.truthAccepted || !draft.consent.biometricAccepted || !draft.consent.signature) {
		throw new Error('Le consentement et la signature sont obligatoires.');
	}

	const [frontDocument, backDocument] = await Promise.all([
		uploadFile(draft.documents.front),
		uploadFile(draft.documents.back)
	]);

	const facialFiles = await Promise.all(
		captures.map(async ({ key, capture }) => ({
			key,
			capture: capture!,
			file: await dataUrlToFile(capture!.image, `face-${key}.jpg`)
		}))
	);
	const uploadedFacialCaptures = await Promise.all(
		facialFiles.map(async ({ key, capture, file }) => ({
			key,
			capture,
			upload: await uploadFile(file)
		}))
	);

	const payload: EnrolmentPayload = {
		person: draft.identity,
		address: {
			house_number: draft.address.house_number,
			fokontany_id: draft.address.fokontany_id,
			occupancy_type: draft.address.occupancy_type
		},
		contacts: [{
			type: 'phone',
			value: '+261341234567',
			is_primary: true,
			is_verified: false
		}],
		relationships: [{
			related_person_id: '550e8400-e29b-41d4-a716-446655440000',
			related_person_name: `${draft.identity.last_name} ${draft.identity.first_name}`,
			relationship_type: 'FATHER'
		}],
		documents: [{
			document_type_id: '6851e3d4-ae17-4a93-a48e-1853a596367d',
			front_file_path: frontDocument.path,
			back_file_path: backDocument.path
		}],
		face_biometrics: uploadedFacialCaptures.map(({ capture, upload }) => ({
			image_file_path: upload.path,
			model_name: 'FaceNet',
			model_version: '1.0.0',
			embeding: JSON.stringify(capture.embedding),
			quality_score: 98.5,
			face_detected: true
		})),
		created_offline: false,
		enrolment_type: 'NEW'
	};

	const validationErrors = validateEnrolmentPayload(payload);
	if (validationErrors.length > 0) throw new Error(validationErrors.join(' '));
	return createEnrolment(payload);
}

export function validateEnrolmentPayload(data: EnrolmentPayload): string[] {
	const errors: string[] = [];

	if (!data.person.first_name.trim()) errors.push('Le prénom est obligatoire.');
	if (!data.person.last_name.trim()) errors.push('Le nom est obligatoire.');
	const dateOfBirth = data.person.date_of_birth.trim();
	const dateParts = dateOfBirth.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	const parsedDate = dateParts
		? new Date(Number(dateParts[1]), Number(dateParts[2]) - 1, Number(dateParts[3]))
		: null;
	const isValidDate =
		parsedDate !== null &&
		parsedDate.getFullYear() === Number(dateParts?.[1]) &&
		parsedDate.getMonth() === Number(dateParts?.[2]) - 1 &&
		parsedDate.getDate() === Number(dateParts?.[3]);

	if (!isValidDate) {
		errors.push('La date de naissance doit être au format YYYY-MM-DD.');
	}
	if (!data.person.country_of_birth_id) errors.push('Le pays de naissance est obligatoire.');
	if (!data.address.fokontany_id) errors.push('Le fokontany est obligatoire.');
	if (!data.address.occupancy_type) errors.push('Le statut de résidence est obligatoire.');
	if (data.contacts.length === 0) errors.push('Au moins un contact est obligatoire.');
	if (data.documents.length === 0) errors.push('Au moins un document est obligatoire.');
	if (data.face_biometrics.length === 0) errors.push('La biométrie faciale est obligatoire.');

	return errors;
}

export async function createEnrolment(
	data: EnrolmentPayload,
	options: RequestInit = {}
): Promise<unknown> {
	const headers = new Headers(options.headers);
	headers.set('Content-Type', 'application/json');
	headers.set('Authorization', `Bearer ${getAccessToken()}`);

	const response = await fetch(`${API_URL}/enrolments`, {
		...options,
		method: 'POST',
		headers,
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		throw new Error(await getErrorMessage(response));
	}

	if (response.status === 204) return undefined;
	const responseBody = await response.text();
	return responseBody ? JSON.parse(responseBody) : undefined;
}
