import { useEffect, useRef, useState } from "react";
import CrossCheckPanel from "../../components/custom/CrossCheckPanel";
import DocumentCaptureSuccess from "../../components/custom/Documentcapturestates/DocumentcaptureSuccess";
import NavigationLv1stepper from "../../components/custom/steppermanagement/NavigationLv1stepper";
import DocumentcaptureInit from "../../components/custom/Documentcapturestates/DocumentcaptureInit";

export default function DocumentVerificationCIN({
  onBack,
  onContinue,
  identity,
  documents,
  onDocumentsChange,
  onIdentityDetected,
  onIdentityChange,
  isfinal,
}: Documentverificationcininterface) {
  const [verifstate, setverifstate] = useState<number>(0);
  const [scanResult, setScanResult] = useState<CinScanResult | null>(null);
  const [frontImageUrl, setFrontImageUrl] = useState("/assets/mock-cin.jpg");
  const [backImageUrl, setBackImageUrl] = useState("/assets/mock-cin.jpg");
  const capturedImageUrls = useRef<{ front: string | null; back: string | null }>({
    front: null,
    back: null,
  });

  useEffect(
    () => () => {
      if (capturedImageUrls.current.front) {
        URL.revokeObjectURL(capturedImageUrls.current.front);
      }
      if (capturedImageUrls.current.back) {
        URL.revokeObjectURL(capturedImageUrls.current.back);
      }
    },
    [],
  );

  return (
    <div className="flex flex-col gap-y-5">
      <main className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
        {verifstate == 0 && (
          <DocumentcaptureInit
            onDocumentsChange={onDocumentsChange}
            onScanResult={(result) => {
              setScanResult(result);
              onIdentityDetected(result.identity);
            }}
            initialImages={documents}
            proceed={(step, frontUrl, backUrl) => {
              capturedImageUrls.current = { front: frontUrl, back: backUrl };
              setFrontImageUrl(frontUrl);
              setBackImageUrl(backUrl);
              setverifstate(step);
            }}
          />
        )}
        {verifstate == 1 && (
          <DocumentCaptureSuccess
            frontImageUrl={frontImageUrl}
            backImageUrl={backImageUrl}
            mrzStatus={scanResult?.mrzStatus ?? { label: "MRZ STATUS", value: "Non lu", valid: false }}
            nfcStatus={scanResult?.nfcStatus ?? { label: "NFC CHIP", value: "Non lu", valid: false }}
          />
        )}
        {verifstate == 1 && scanResult && (
          <CrossCheckPanel
            confidence={scanResult.confidence}
            onChange={onIdentityChange}
            values={{
              nom: identity.last_name,
              naissance: identity.date_of_birth,
              lieu: identity.birth_place,
              prenom: identity.first_name,
              sexe: identity.sex,
            }}
            fields={[
              {
                key: "prenom",
                label: "Prénom",
                ocrValue: scanResult.identity.first_name,
                inputValue: scanResult.identity.first_name,
              },
              {
                key: "nom",
                label: "Nom de famille",
                ocrValue: scanResult.identity.last_name,
                inputValue: scanResult.identity.last_name,
              },
              {
                key: "naissance",
                label: "Date de naissance",
                ocrValue: scanResult.identity.date_of_birth,
                inputValue: scanResult.identity.date_of_birth,
              },
              {
                key: "lieu",
                label: "Lieu de naissance",
                ocrValue: scanResult.identity.birth_place,
                inputValue: scanResult.identity.birth_place,
              },
              {
                key: "sexe",
                label: "Sexe",
                ocrValue: scanResult.identity.sex,
                inputValue: scanResult.identity.sex,
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
