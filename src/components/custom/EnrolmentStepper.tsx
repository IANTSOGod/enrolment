import { Check } from "lucide-react";
import { enrolmentMock } from "../../lib/mock";

export default function EnrolmentStepper({
  currentStep,
  type,
}: {
  currentStep: number;
  type: string;
}) {
  const steps = enrolmentMock.steps;

  return (
    <div className="flex w-1/2 flex-col items-center gap-1 sm:ml-auto sm:w-1/6">
      {type && (
        <span className="text-sm font-medium tracking-wide text-[#52525b]">
          {type === "new"
            ? "Nouveau Dossier"
            : type === "update"
              ? "Mise à jour"
              : "Correction"}
        </span>
      )}

      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: steps
            .map((_, i) =>
              i === steps.length - 1 ? "auto" : "auto minmax(1.5rem,1fr)",
            )
            .join(" "),
        }}
      >
        {steps.map((step, index) => {
          const active = currentStep === step.id;
          const completed = currentStep > step.id;
          const last = index === steps.length - 1;
          const circleCol = index * 2 + 1;

          return (
            <div key={step.id} className="contents">
              {/* Cercle */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-xs font-medium sm:h-8.5 sm:w-8.5 sm:rounded-xl sm:text-[14px] ${
                  active || completed
                    ? "border-primary bg-primary text-white"
                    : "border-[#c7c9d8] bg-white text-[#71717a]"
                }`}
                style={{ gridColumn: circleCol, gridRow: 1 }}
              >
                {completed ? (
                  <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  step.id
                )}
              </div>

              {/* Connecteur — remplit toute la largeur entre deux cercles */}
              {!last && (
                <div
                  className={`h-0.5 w-full self-center sm:h-0.75 ${
                    completed ? "bg-primary" : "bg-[#c7c9d8]"
                  }`}
                  style={{ gridColumn: circleCol + 1, gridRow: 1 }}
                />
              )}

              {/* Label — centré uniquement sous le cercle */}
              <span
                className={`mt-1 justify-self-center whitespace-nowrap text-[10px] sm:text-[11px] ${
                  active ? "font-semibold text-primary" : "text-[#71717a]"
                }`}
                style={{ gridColumn: circleCol, gridRow: 2 }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
