import { ArrowRight, UserRound } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function EnrolmentDetails({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <h2 className="text-[26px] font-semibold text-[#202124]">
        Applicant Details
      </h2>

      <p className="mt-2 text-[15px] text-[#52525b]">
        Enter the applicant's demographic information.
      </p>

      <div className="mt-6 rounded-lg border bg-white p-8">
        <div className="flex items-center gap-3 text-[#52525b]">
          <UserRound className="h-5 w-5" />
          <span>Applicant information</span>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12.75 rounded-xl px-6"
        >
          Back
        </Button>

        <Button
          onClick={onContinue}
          className="h-12.75 rounded-xl bg-[#20298d] px-6 hover:bg-[#1b237a]"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
