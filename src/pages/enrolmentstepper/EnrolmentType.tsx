import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { enrolmentMock } from "../../lib/mock";

export default function EnrolmentType({
  selectedType,
  onTypeChange,
  onContinue,
  onCancel,
}: EnrolmentTypeinterface) {
  return (
    <>
      <h2 className="text-xl font-semibold text-[#202124] sm:text-[26px]">
        Select Dossier Type
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {enrolmentMock.dossierTypes.map((type) => {
          const Icon = type.icon;
          const selected = selectedType === type.id;

          return (
            <Card
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`
                min-h-40
                cursor-pointer
                rounded-lg
                p-4
                shadow-none
                transition-none
                md:min-h-75.5
                md:p-6

                ${
                  selected
                    ? "border-2 border-[#080f83] bg-[#dfe1ff]"
                    : "border border-[#c9cad8] bg-white"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-10 w-10
                  items-center
                  justify-center
                  rounded-xl
                  md:h-12.75
                  md:w-12.75

                  ${
                    selected
                      ? "bg-[#20298d] text-white"
                      : type.color === "red"
                        ? "bg-[#ffd9d5] text-[#c40000]"
                        : "bg-[#dce3f2] text-[#667085]"
                  }
                `}
              >
                <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.8} />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[#202124] sm:text-[22px]">
                {type.title}
              </h3>

              <p className="mt-1 text-sm leading-[1.4] text-[#52525b] sm:text-[15px]">
                {type.description}
              </p>
            </Card>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end gap-4 sm:mt-8">
        <Button
          variant="outline"
          onClick={onCancel}
          className="
            h-12.75
            min-w-25.75
            rounded-xl
            border-[#858792]
            bg-white
            px-6
            text-[15px]
            font-semibold
          "
        >
          Cancel
        </Button>

        <Button
          onClick={() => onContinue(selectedType)}
          className="
            h-12.75
            min-w-34
            rounded-xl
            bg-[#20298d]
            px-6
            text-[15px]
            font-semibold
            text-white
            hover:bg-[#1b237a]
          "
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
