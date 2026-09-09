const API_URL = 'http://192.168.11.163:3000';
;

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
	const accessToken = localStorage.getItem('accessToken');
	if (!accessToken) {
		throw new Error('Session expirée. Veuillez vous reconnecter.');
	}

	const headers = new Headers(options.headers);
	headers.set('Content-Type', 'application/json');
	headers.set('Authorization', `Bearer ${accessToken}`);

	const response = await fetch(`${API_URL}/enrolments`, {
		...options,
		method: 'POST',
		headers,
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || `Erreur HTTP ${response.status}`);
	}

	return response.status === 204 ? undefined : response.json();
}
