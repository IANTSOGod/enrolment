import { useState } from "react";
import DocumentStepper from "../../../components/custom/steppermanagement/DocumentStepper";
import VerificationHeader from "../../../components/custom/VerificationHeader";
import DocumentVerificationCIN from "../../Documentdetails/DocumentVerificationCIN";
import DocumentVerificationStep2 from "../../Documentdetails/DocumentVerificationStep2";
import DocumentSupp from "../../Documentdetails/DocumentSupp";
import Consentement from "../../Documentdetails/Consentement";

export default function EnrolmentDetails({
  setlv1step,
  draft,
  onDraftChange,
}: EnrolmentDetailsProps) {
  const [stepLv2, setstepLv2] = useState<number>(1);

  const updateIdentity = (key: string, value: string) => {
    const identityKey = key === "nom"
      ? "last_name"
      : key === "prenom"
        ? "first_name"
      : key === "naissance"
        ? "date_of_birth"
        : key === "lieu"
          ? "birth_place"
          : key === "sexe"
            ? "sex"
          : null;
    if (!identityKey) return;
    onDraftChange((current) => ({
      ...current,
      identity: { ...current.identity, [identityKey]: value },
    }));
  };

  return (
    <div className="bg-[#f8f9fb]">
      <VerificationHeader
        title="Vérification des documents"
        subtitle="Positionnez le document d'identité dans le cadre pour extraire et vérifier automatiquement les données."
        applicationId="ENR-2026-8942A"
      />

      <div className="flex flex-col  gap-6 p-6 sm:flex-row sm:p-8">
        <div className="w-full sm:h-full sm:w-auto">
          <DocumentStepper currentStep={stepLv2} />
        </div>

        {stepLv2 == 1 && (
          <DocumentVerificationCIN
            identity={draft.identity}
            documents={draft.documents}
            onDocumentsChange={(documents) =>
              onDraftChange((current) => ({ ...current, documents }))
            }
            onIdentityDetected={(identity) =>
              onDraftChange((current) => ({
                ...current,
                identity: { ...current.identity, ...identity },
              }))
            }
            onIdentityChange={updateIdentity}
            onBack={() => {
              setlv1step(1);
            }}
            onContinue={() => {
              setstepLv2(2);
            }}
            isfinal={false}
          ></DocumentVerificationCIN>
        )}
        {stepLv2 == 2 && (
          <div className="w-full">
            <DocumentVerificationStep2
              initialCapture={draft.faceCapture}
              onCaptureChange={(faceCapture) =>
                onDraftChange((current) => ({ ...current, faceCapture }))
              }
              onValidatePhoto={(faceCapture) => {
                onDraftChange((current) => ({ ...current, faceCapture }));
                setstepLv2(3);
              }}
            />
          </div>
        )}
        {stepLv2 == 3 && (
          <div className="w-full">
            <DocumentSupp
              address={draft.address}
              onAddressChange={(address) =>
                onDraftChange((current) => ({ ...current, address }))
              }
              onBack={() => {
                setstepLv2(2);
              }}
              onContinue={(address) => {
                onDraftChange((current) => ({ ...current, address }));
                setstepLv2(4);
              }}
            />
          </div>
        )}
        {stepLv2 == 4 && (
          <div className="w-full">
            <Consentement
              consent={draft.consent}
              onConsentChange={(consent) =>
                onDraftChange((current) => ({ ...current, consent }))
              }
              onBack={() => {
                setstepLv2(3);
              }}
              onContinue={(consent) => {
                onDraftChange((current) => ({ ...current, consent }));
                setlv1step(3);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
