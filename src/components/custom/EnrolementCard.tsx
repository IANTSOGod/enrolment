import { UserPlus, CloudOff, CirclePlus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function EnrolmentCard({
  data,
  proceed,
}: {
  data: StatOverview;
  proceed: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card className="h-37 rounded-lg border-[#dedede] bg-white shadow-none">
        <CardContent className="flex h-full flex-col justify-between p-4">
          <div className="flex items-start justify-between">
            <span className="text-[15px] font-semibold text-[#4b4b56]">
              Enrolments Today
            </span>

            <UserPlus className="h-5 w-5 text-primary" strokeWidth={2} />
          </div>

          <p className="text-[44px] font-bold leading-none text-primary">
            {data.enrolmentsToday}
          </p>
        </CardContent>
      </Card>
      <Card className="h-37 rounded-lg border-[#dedede] bg-white shadow-none">
        <CardContent className="flex h-full flex-col justify-between p-4">
          <div className="flex items-start justify-between">
            <span className="text-[15px] font-semibold text-[#4b4b56]">
              Pending Sync
            </span>

            <CloudOff className="h-5 w-5 text-red-600" strokeWidth={1.8} />
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-[44px] font-bold leading-none text-[#18181b]">
              {data.pendingSync}
            </p>

            <span className="text-[13px] text-[#52525b]">dossiers</span>
          </div>
        </CardContent>
      </Card>

      <Button
        className="
          h-37
          rounded-lg
          bg-[#20298d]
          text-white
          shadow-none
          hover:bg-[#1b237a]
          xl:h-37
        "
        onClick={proceed}
      >
        <div className="flex flex-col items-center gap-3">
          <CirclePlus className="size-10" strokeWidth={1.8} />
          <span className="text-[21px] font-bold">Nouvel Enrôlement</span>
        </div>
      </Button>
    </div>
  );
}
