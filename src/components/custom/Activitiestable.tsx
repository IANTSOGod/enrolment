import { CircleCheck, CloudOff } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";

export default function ActivitiesTable({ data }: { data: ActivityRow[] }) {
  return (
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
        {data.map((activity) => (
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
                <Badge className="bg-green-400 text-green-800">
                  <CircleCheck className="mr-1 h-3 w-3" />
                  Synced
                </Badge>
              ) : (
                <Badge className="bg-amber-400 text-amber-800">
                  <CloudOff className="mr-1 h-3 w-3" />
                  Local Only
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
