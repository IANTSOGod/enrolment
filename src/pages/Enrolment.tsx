import { useState } from "react";
import EnrolmentStepper from "../components/custom/steppermanagement/EnrolmentStepper";
import { enrolmentMock } from "../lib/mock";
import DocumentVerification from "./Documentdetails/DocumentVerification";
import EnrolmentType from "./enrolmentstepper/EnrolmentType";
import EnrolmentBio from "./enrolmentstepper/new/EnrolmentBio";
import EnrolmentUpdate from "./enrolmentstepper/update/EnrolmentUpdate";

export default function Enrolment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [type, setType] = useState<string>("new");

  return (
    <div className="bg-[#f8f9fb]">
      <header className="flex flex-row flex-nowrap items-center justify-between gap-x-3 border-b border-[#d4d4d8] bg-white px-4 sm:h-25.25 sm:px-12">
        <div className="min-w-0">
          <h1 className="text-md font-bold leading-none tracking-tight text-[#202124] sm:text-[36px]">
            Application Setup
          </h1>

          <p className="mt-2 truncate text-[13px] text-[#52525b] sm:text-[15px]">
            ID:{" "}
            <span className="font-medium text-[#20298d]">
              {enrolmentMock.applicationId}
            </span>
          </p>
        </div>
        <EnrolmentStepper currentStep={currentStep} type={type} />
      </header>
      <main className="px-4 pt-7 sm:px-12">
        {currentStep === 1 && (
          <EnrolmentType
            selectedType={type}
            onTypeChange={setType}
            onContinue={(n_type) => {
              setType(n_type);
              setCurrentStep(2);
            }}
            onCancel={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 2 && type === "new" && (
          <DocumentVerification></DocumentVerification>
        )}

        {currentStep === 3 && type === "new" && (
          <EnrolmentBio
            onBack={() => {
              setCurrentStep(2);
            }}
          />
        )}

        {currentStep === 2 && type === "update" && <EnrolmentUpdate />}
      </main>
    </div>
  );
}
