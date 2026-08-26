import { UserRound } from "lucide-react";
import NavigationLv1stepper from "../../../components/custom/steppermanagement/NavigationLv1stepper";

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

      <NavigationLv1stepper
        onBack={onBack}
        onContinue={onContinue}
        isfinal={false}
      ></NavigationLv1stepper>
    </div>
  );
}
