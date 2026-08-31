import { Check } from "lucide-react";

type Step = {
  id: number;
};

const steps: Step[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function DocumentStepper({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="w-full sm:mt-20 shrink-0 sm:h-full sm:w-fit">
      {/* Version horizontale — mobile */}
      <div
        className="grid w-full sm:hidden"
        style={{
          gridTemplateColumns: steps
            .map((_, i) =>
              i === steps.length - 1 ? "auto" : "auto minmax(1rem,1fr)",
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
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-xs font-medium ${
                  active || completed
                    ? "border-primary bg-primary text-white"
                    : "border-[#c7c9d8] bg-white text-[#71717a]"
                }`}
                style={{ gridColumn: circleCol, gridRow: 1 }}
              >
                {completed ? <Check className="h-3 w-3" /> : step.id}
              </div>

              {!last && (
                <div
                  className={`h-0.5 w-full self-center ${
                    completed ? "bg-primary" : "bg-[#c7c9d8]"
                  }`}
                  style={{ gridColumn: circleCol + 1, gridRow: 1 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Version verticale — desktop */}
      <div
        className="hidden h-full sm:grid"
        style={{
          gridTemplateRows: steps
            .map((_, i) =>
              i === steps.length - 1 ? "auto" : "auto minmax(1rem,1fr)",
            )
            .join(" "),
        }}
      >
        {steps.map((step, index) => {
          const active = currentStep === step.id;
          const completed = currentStep > step.id;
          const last = index === steps.length - 1;
          const circleRow = index * 2 + 1;

          return (
            <div key={step.id} className="contents">
              <div
                className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl border-2 text-[14px] font-medium ${
                  active || completed
                    ? "border-primary bg-primary text-white"
                    : "border-[#c7c9d8] bg-white text-[#71717a]"
                }`}
                style={{
                  gridRow: circleRow,
                  gridColumn: 1,
                  justifySelf: "center",
                }}
              >
                {completed ? <Check className="h-4 w-4" /> : step.id}
              </div>

              {!last && (
                <div
                  className={`h-full w-0.75 ${
                    completed ? "bg-primary" : "bg-[#c7c9d8]"
                  }`}
                  style={{
                    gridRow: circleRow + 1,
                    gridColumn: 1,
                    justifySelf: "center",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
