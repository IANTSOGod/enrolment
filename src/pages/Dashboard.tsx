import { CircleCheck, CirclePlus, CloudOff, UserPlus } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const dashboardMock = {
  stats: {
    enrolmentsToday: 42,
    pendingSync: 15,
  },

  recentActivity: [
    {
      id: 1,
      applicantName: "Jean Dupont",
      reference: "REQ-2023-8921",
      time: "10:45 AM",
      status: "synced",
    },
    {
      id: 2,
      applicantName: "Marie Curie",
      reference: "REQ-2023-8922",
      time: "11:12 AM",
      status: "local-only",
    },
    {
      id: 3,
      applicantName: "Omar Sy",
      reference: "REQ-2023-8923",
      time: "11:58 AM",
      status: "local-only",
    },
  ],
};

export default function Dashboard() {
  const { stats, recentActivity } = dashboardMock;
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-[#f8f9fb] p-6">
      <div className="mx-auto w-full max-w-300">
        <div className="mb-6">
          <h1 className="text-[40px] font-bold leading-none tracking-tight text-[#18181b]">
            Dashboard
          </h1>

          <p className="mt-2 text-[15px] text-[#52525b]">
            Overview of today's activities
          </p>
        </div>
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
                {stats.enrolmentsToday}
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
                  {stats.pendingSync}
                </p>

                <span className="text-[13px] text-[#52525b]">dossiers</span>
              </div>
            </CardContent>
          </Card>

          {/* New Enrolment */}

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
            onClick={() => {
              navigate("/admin/enrolment");
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <CirclePlus className="size-10" strokeWidth={1.8} />
              <span className="text-[21px] font-bold">Nouvel Enrôlement</span>
            </div>
          </Button>
        </div>

        <div className="mt-9 mb-4 flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-[#202124]">
            Recent Activity
          </h2>

          <Button
            variant="ghost"
            className="
              h-auto
              p-0
              text-[13px]
              font-medium
              text-primary
              hover:bg-transparent
              hover:text-[#000080]
            "
          >
            View All
          </Button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-[#dedede] bg-white">
          <Table className="min-w-140">
            <TableHeader>
              <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
                <TableHead className="h-9 px-4 text-[11px] font-medium uppercase tracking-wide text-[#52525b]">
                  Applicant Name
                </TableHead>

                <TableHead className="h-9 px-4 text-[11px] font-medium uppercase tracking-wide text-[#52525b]">
                  ID Reference
                </TableHead>

                <TableHead className="h-9 px-4 text-[11px] font-medium uppercase tracking-wide text-[#52525b]">
                  Time
                </TableHead>

                <TableHead className="h-9 px-4 text-right text-[11px] font-medium uppercase tracking-wide text-[#52525b]">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow
                  key={activity.id}
                  className="h-14.75 border-[#dedede] hover:bg-white"
                >
                  <TableCell className="px-4 text-[14px] font-semibold text-[#27272a]">
                    {activity.applicantName}
                  </TableCell>

                  <TableCell className="px-4 text-[14px] text-[#52525b]">
                    {activity.reference}
                  </TableCell>

                  <TableCell className="px-4 text-[14px] text-[#52525b]">
                    {activity.time}
                  </TableCell>

                  <TableCell className="px-4 text-right">
                    {activity.status === "synced" ? (
                      <Badge
                        className="
                          rounded-full
                          border border-[#86efac]
                          bg-[#dcfce7]
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          text-[#15803d]
                          hover:bg-[#dcfce7]
                        "
                      >
                        <CircleCheck className="mr-1 h-3 w-3" />
                        Synced
                      </Badge>
                    ) : (
                      <Badge
                        className="
                          rounded-full
                          border border-[#fcd34d]
                          bg-[#fef3c7]
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          text-[#b45309]
                          hover:bg-[#fef3c7]
                        "
                      >
                        <CloudOff className="mr-1 h-3 w-3" />
                        Local Only
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
