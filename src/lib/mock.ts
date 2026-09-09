import { ClipboardList, FileEdit, History } from "lucide-react";

export const enrolmentMock = {
  applicationId: "APP-2024-8921",

  steps: [
    {
      id: 1,
      label: "Type",
    },
    {
      id: 2,
      label: "Details",
    },
    {
      id: 3,
      label: "Bio",
    },
  ],

  dossierTypes: [
    {
      id: "new",
      title: "New File",
      description:
        "Initiate a completely new applicant record. Requires full demographic and biometric capture.",
      icon: ClipboardList,
      color: "blue",
    },
    {
      id: "update",
      title: "Update file",
      description:
        "Update an existing applicant record. Requires previous application ID or search by biometrics.",
      icon: History,
      color: "gray",
    },
    {
      id: "correction",
      title: "Correct application",
      description:
        "Fix errors in a recently submitted application. Requires supervisor authorization code.",
      icon: FileEdit,
      color: "red",
    },
  ],
};

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
}