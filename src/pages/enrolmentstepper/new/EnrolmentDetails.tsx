import { useState } from "react";
import DocumentStepper from "../../../components/custom/steppermanagement/DocumentStepper";
import VerificationHeader from "../../../components/custom/VerificationHeader";
import DocumentVerificationCIN from "../../Documentdetails/DocumentVerificationCIN";
import DocumentVerificationStep2 from "../../Documentdetails/DocumentVerificationStep2";

export default function EnrolmentDetails({
  setlv1step,
}: {
  setlv1step: (step: number) => void;
}) {
  const [stepLv2, setstepLv2] = useState<number>(1);

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
          <DocumentVerificationStep2></DocumentVerificationStep2>
          </div>
        )}
      </div>
    </div>
  );
}
