const API_URL = 'http://192.168.11.163:3000';

export interface EnrolmentPayload {
	person: {
		first_name: string;
		last_name: string;
		date_of_birth: string;
		birth_place: string;
		country_of_birth_id: string;
		sex: string;
	};
	address: {
		house_number: string;
		fokontany_id: string;
		occupancy_type: string;
	};
	contacts: Array<{
		type: string;
		value: string;
		is_primary: boolean;
		is_verified: boolean;
	}>;
	relationships: Array<{
		related_person_id: string;
		related_person_name: string;
		relationship_type: string;
	}>;
	documents: Array<{
		document_type_id: string;
		front_file_path: string;
		back_file_path: string;
	}>;
	face_biometrics: Array<{
		image_file_path: string;
		model_name: string;
		model_version: string;
		embeding: string;
		quality_score: number;
		face_detected: boolean;
	}>;
	created_offline: boolean;
	enrolment_type: string;
}

export const mockEnrolmentPayload: EnrolmentPayload = {
	person: {
		first_name: 'Jean',
		last_name: 'Rakotomalala1',
		date_of_birth: '1995-06-15',
		birth_place: 'Antananarivo',
		country_of_birth_id: '9d4a3e6b-4971-4baa-94ea-aa42489a2c54',
		sex: 'M'
	},
	address: {
		house_number: '12B',
		fokontany_id: '33cc35a3-60ff-482c-9fc3-0e4dd7b7c60f',
		occupancy_type: 'OWNER'
	},
	contacts: [
		{
			type: 'phone',
			value: '+261341234567',
			is_primary: true,
			is_verified: false
		}
	],
	relationships: [
		{
			related_person_id: '550e8400-e29b-41d4-a716-446655440000',
			related_person_name: 'Rakotomalala1 Jean',
			relationship_type: 'FATHER'
		}
	],
	documents: [
		{
			document_type_id: '6851e3d4-ae17-4a93-a48e-1853a596367d',
			front_file_path: '/uploads/documents/7c55adf5-6c15-4705-a37a-40edee4afc83.png',
			back_file_path: '/uploads/documents/7c55adf5-6c15-4705-a37a-40edee4afc83.png'
		}
	],
	face_biometrics: [
		{
			image_file_path: '/uploads/faces/person.jpg',
			model_name: 'FaceNet',
			model_version: '1.0.0',
			embeding: '[0.123,0.456,0.789]',
			quality_score: 98.5,
			face_detected: true
		}
	],
	created_offline: false,
	enrolment_type: 'NEW'
};

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
