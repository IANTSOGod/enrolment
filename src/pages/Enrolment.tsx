import { useState } from "react";
import EnrolmentStepper from "../components/custom/EnrolmentStepper";
import { enrolmentMock } from "../lib/mock";
import EnrolmentType from "./enrolmentstepper/EnrolmentType";
import EnrolmentBio from "./enrolmentstepper/new/EnrolmentBio";
import EnrolmentDetails from "./enrolmentstepper/new/EnrolmentDetails";
import EnrolmentUpdate from "./enrolmentstepper/update/EnrolmentUpdate";

export default function Enrolment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [type, setType] = useState<string>("new");

  return (
    <div className="bg-[#f8f9fb]">
      <header className="flex h-25.25 items-center justify-between border-b border-[#d4d4d8] bg-white px-12">
        <div>
          <h1 className="text-[36px] font-bold leading-none tracking-tight text-[#202124]">
            Application Setup
          </h1>

          <p className="mt-2 text-[15px] text-[#52525b]">
            Auto-generated ID:{" "}
            <span className="font-medium text-[#20298d]">
              {enrolmentMock.applicationId}
            </span>
          </p>
        </div>
        <EnrolmentStepper currentStep={currentStep} type={type} />
      </header>
      <main className="px-12 pt-7">
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
          <EnrolmentDetails
            onBack={() => setCurrentStep(1)}
            onContinue={() => {
              setCurrentStep(3);
            }}
          />
        )}

        {currentStep === 3 && type === "new" && (
          <EnrolmentBio
            onBack={() => {
              setCurrentStep(1);
            }}
          />
        )}

        {currentStep === 2 && type === "update" && (
          <EnrolmentUpdate />
        )}
      </main>
    </div>
  );
}
