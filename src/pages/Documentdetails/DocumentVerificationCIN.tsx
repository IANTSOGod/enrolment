import CrossCheckPanel from "../../components/custom/CrossCheckPanel";
import DocumentCapturePanel from "../../components/custom/DocumentCapturePanel";
import NavigationLv1stepper from "../../components/custom/steppermanagement/NavigationLv1stepper";

export default function DocumentVerificationCIN({
  onBack,
  onContinue,
  isfinal,
}: {
  onBack: () => void;
  onContinue: () => void;
  isfinal: boolean;
}) {
  return (
    <div className="flex flex-col gap-y-5">
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
      <NavigationLv1stepper
        onBack={onBack}
        onContinue={onContinue}
        isfinal={isfinal}
      ></NavigationLv1stepper>
    </div>
  );
}
