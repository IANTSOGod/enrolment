import { useState } from "react";
import CrossCheckPanel from "../../components/custom/CrossCheckPanel";
import DocumentCaptureSuccess from "../../components/custom/Documentcapturestates/DocumentcaptureSuccess";
import NavigationLv1stepper from "../../components/custom/steppermanagement/NavigationLv1stepper";
import DocumentcaptureInit from "../../components/custom/Documentcapturestates/DocumentcaptureInit";

export default function DocumentVerificationCIN({
  onBack,
  onContinue,
  isfinal,
}: Documentverificationcininterface) {
  const [verifstate, setverifstate] = useState<number>(0);

  return (
    <div className="flex flex-col gap-y-5">
      <main className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
        {verifstate == 0 && (
          <DocumentcaptureInit proceed={setverifstate}></DocumentcaptureInit>
        )}
        {verifstate == 1 && (
          <DocumentCaptureSuccess
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
        )}
        {verifstate == 1 && (
          <CrossCheckPanel
            confidence={98}
            fields={[
              {
                key: "nom",
                label: "Nom de famille",
                ocrValue: "RAKOTOMALALA",
                inputValue: "Rakotomalala",
              },
              {
                key: "naissance",
                label: "Date de naissance",
                ocrValue: "15/04/1985",
                inputValue: "15/04/1985",
              },
              {
                key: "lieu",
                label: "Lieu de naissance",
                ocrValue: "ANTANNARIVO",
                inputValue: "Antananarivo",
              },
            ]}
          />
        )}
      </main>
      <NavigationLv1stepper
        onBack={verifstate == 0 ? onBack : () => setverifstate(0)}
        onContinue={onContinue}
        isfinal={isfinal}
        disabled={verifstate == 1 ? false : true}
      ></NavigationLv1stepper>
    </div>
  );
}
