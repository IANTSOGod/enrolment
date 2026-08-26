import CrossCheckPanel from "../../components/custom/CrossCheckPanel";
import DocumentCapturePanel from "../../components/custom/DocumentCapturePanel";
import DocumentStepper from "../../components/custom/steppermanagement/DocumentStepper";
import VerificationHeader from "../../components/custom/VerificationHeader";

export default function DocumentVerification() {
  return (
    <div className="bg-[#f8f9fb]">
      <VerificationHeader
        title="Vérification des documents"
        subtitle="Positionnez le document d'identité dans le cadre pour extraire et vérifier automatiquement les données."
        applicationId="ENR-2026-8942A"
      />

      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
        <div className="w-full sm:h-full sm:w-auto">
          <DocumentStepper currentStep={1} />
        </div>

        <main className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <DocumentCapturePanel
            imageUrl="/assets/mock-cin.jpg"
            mrzStatus={{
              label: "MRZ STATUS",
              value: "Read: Valid",
              valid: true,
            }}
            nfcStatus={{
              label: "NFC CHIP",
              value: "Read Success",
              valid: true,
            }}
          />

          <CrossCheckPanel
            confidence={98}
            fields={[
              {
                key: "nom",
                label: "Nom de famille",
                ocrValue: "RAKOTOMALALA",
                inputValue: "Rakotomalala",
                match: true,
              },
              {
                key: "naissance",
                label: "Date de naissance",
                ocrValue: "15/04/1985",
                inputValue: "15/04/1985",
                match: true,
              },
              {
                key: "lieu",
                label: "Lieu de naissance",
                ocrValue: "ANTANNARIVO",
                inputValue: "Antananarivo",
                match: false,
              },
            ]}
          />
        </main>
      </div>
    </div>
  );
}
