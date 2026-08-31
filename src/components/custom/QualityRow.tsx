import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

export default function QualityRow({
  icon,
  label,
  status,
  success = false,
}: {
  icon: ReactNode;
  label: string;
  status: string;
  success?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex min-w-0 items-center gap-1.5 text-[9px] text-gray-600">
        <span className={success ? "text-green-600" : "text-orange-500"}>
          {success ? <CheckCircle2 size={13} /> : icon}
        </span>

        <span className="truncate">{label}</span>
      </div>

      <span
        className={`
          shrink-0 rounded-[2px] px-1 py-[1px]
          text-[7px] font-medium
          ${
            success
              ? "bg-green-50 text-green-600"
              : "bg-orange-50 text-orange-500"
          }
        `}
      >
        {status}
      </span>
    </div>
  );
}
