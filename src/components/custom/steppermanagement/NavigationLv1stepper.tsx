import { ArrowRight, Check } from "lucide-react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";

export default function NavigationLv1stepper({
  onBack,
  onContinue,
  isfinal,
}: {
  onBack: () => void;
  onContinue: () => void;
  isfinal: boolean;
}) {
  return (
    <div className="mt-0 mb-0 flex justify-end gap-4">
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
        onClick={onContinue}
      >
        {isfinal ? (
          <>
            <Label>Finish</Label>
            <Check className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            <Label>Continue</Label>
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
