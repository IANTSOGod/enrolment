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
      title: "Nouveau Dossier",
      description:
        "Initiate a completely new applicant record. Requires full demographic and biometric capture.",
      icon: ClipboardList,
      color: "blue",
    },
    {
      id: "update",
      title: "Mise à jour",
      description:
        "Update an existing applicant record. Requires previous application ID or search by biometrics.",
      icon: History,
      color: "gray",
    },
    {
      id: "correction",
      title: "Correction",
      description:
        "Fix errors in a recently submitted application. Requires supervisor authorization code.",
      icon: FileEdit,
      color: "red",
    },
  ],
};
