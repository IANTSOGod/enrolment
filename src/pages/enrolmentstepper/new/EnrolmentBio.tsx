import { Check, UserRound } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function EnrolmentBio({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <h2 className="text-[26px] font-semibold text-[#202124]">
        Biometric Capture
      </h2>

      <p className="mt-2 text-[15px] text-[#52525b]">
        Capture the applicant's biometric information.
      </p>

      <div className="mt-6 rounded-lg border bg-white p-8">
        <div className="flex items-center gap-3 text-[#52525b]">
          <UserRound className="h-5 w-5" />
          <span>Biometric information</span>
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
          className="
            h-12.75
            rounded-xl
            bg-primary
            px-6
            hover:bg-[#1b237a]
          "
        >
          Finish
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
