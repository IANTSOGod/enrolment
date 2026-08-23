import { Check } from "lucide-react";
import { enrolmentMock } from "../../lib/mock";

export default function EnrolmentStepper({
  currentStep,
  type,
}: {
  currentStep: number;
  type: string;
}) {
  return (
    <div className="flex flex-col items-end gap-1">
      {type && (
        <span className="text-primary font-medium  tracking-wide">
          {type === "new"
            ? "New file"
            : type === "update"
              ? "Update file"
              : "Correction"}
        </span>
      )}
      <div className="flex items-start gap-3">
        {enrolmentMock.steps.map((step, index) => {
          const active = currentStep === step.id;
          const completed = currentStep > step.id;
          const last = index === enrolmentMock.steps.length - 1;

          return (
            <div key={step.id} className="flex items-start">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex
                    h-8.5
                    w-8.5
                    items-center
                    justify-center
                    rounded-xl
                    border-2
                    text-[14px]
                    font-medium

                    ${
                      active || completed
                        ? "border-[#080f83] bg-[#080f83] text-white"
                        : "border-[#c7c9d8] bg-white text-[#71717a]"
                    }
                  `}
                >
                  {completed ? <Check className="h-4 w-4" /> : step.id}
                </div>

                {/* Label */}
                <span
                  className={`
                    mt-1
                    text-[11px]
                    ${active ? "font-semibold text-[#080f83]" : "text-[#71717a]"}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {!last && (
                <div
                  className={`
                    mt-4
                    mx-1
                    h-0.75                  
                    w-8.5
                    rounded-full

                    ${completed ? "bg-[#080f83]" : "bg-[#c7c9d8]"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
