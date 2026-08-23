import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { enrolmentMock } from "../../lib/mock";

export default function EnrolmentType({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [selectedType, setSelectedType] = useState("new");

  return (
    <>
      <h2 className="text-[26px] font-semibold text-[#202124]">
        Select Dossier Type
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {enrolmentMock.dossierTypes.map((type) => {
          const Icon = type.icon;
          const selected = selectedType === type.id;

          return (
            <Card
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`
                min-h-75.5
                cursor-pointer
                rounded-lg
                p-6
                shadow-none
                transition-none

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
                  h-12.75
                  w-12.75
                  items-center
                  justify-center
                  rounded-xl

                  ${
                    selected
                      ? "bg-[#20298d] text-white"
                      : type.color === "red"
                        ? "bg-[#ffd9d5] text-[#c40000]"
                        : "bg-[#dce3f2] text-[#667085]"
                  }
                `}
              >
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </div>

              <h3 className="mt-6 text-[22px] font-semibold text-[#202124]">
                {type.title}
              </h3>

              <p className="mt-1 text-[15px] leading-[1.4] text-[#52525b]">
                {type.description}
              </p>
            </Card>
          );
        })}
      </div>
      <div className="mt-8 flex justify-end gap-4">
        <Button
          variant="outline"
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
          onClick={onContinue}
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
