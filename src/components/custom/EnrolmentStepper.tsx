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
    <div className="flex flex-col items-center gap-1">
      {type && (
        <span className="text-sm font-medium tracking-wide text-[#52525b]">
          {type === "new"
            ? "Nouveau Dossier"
            : type === "update"
              ? "Mise à jour"
              : "Correction"}
        </span>
      )}
      <div className="flex items-start gap-2 sm:gap-3">
        {enrolmentMock.steps.map((step, index) => {
          const active = currentStep === step.id;
          const completed = currentStep > step.id;
          const last = index === enrolmentMock.steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex
                    h-8 w-8
                    items-center
                    justify-center
                    rounded-lg
                    border-2
                    text-xs
                    font-medium
                    sm:h-8.5
                    sm:w-8.5
                    sm:text-[14px]
                    sm:rounded-xl

                    ${
                      active || completed
                        ? "border-[#080f83] bg-[#080f83] text-white"
                        : "border-[#c7c9d8] bg-white text-[#71717a]"
                    }
                  `}
                >
                  {completed ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : step.id}
                </div>

                <span
                  className={`
                    mt-1
                    whitespace-nowrap
                    text-[10px]
                    sm:text-[11px]
                    ${active ? "font-semibold text-[#080f83]" : "text-[#71717a]"}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {!last && (
                <div
                  className={`
                    mx-1
                    h-0.5
                    w-6
                    rounded-full
                    sm:mt-4
                    sm:h-0.75
                    sm:w-8.5

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
