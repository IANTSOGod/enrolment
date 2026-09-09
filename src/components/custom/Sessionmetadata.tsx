import { Info } from "lucide-react";

export default function SessionMetadataPanel({
  metadata,
}: {
  metadata: SessionMetadata;
}) {
  return (
    <aside className="h-fit rounded-[5px] border border-gray-200 bg-white p-3">
      <div className="mb-2.5 flex items-center gap-1.5 border-b border-gray-100 pb-2">
        <Info className="h-3.5 w-3.5 text-[#173d68]" />
        <h2 className="text-[12px] font-semibold text-[#092b50]">
          Session Metadata
        </h2>
      </div>

      <div className="flex flex-col gap-2.5 text-[9px]">
        <div>
          <p className="text-gray-400">Active Agent</p>
          <p className="font-mono text-gray-600">
            {metadata.agentName} ({metadata.agentId})
          </p>
        </div>
        <div>
          <p className="text-gray-400">Timestamp</p>
          <p className="font-mono text-gray-600">{metadata.timestamp}</p>
        </div>
        <div>
          <p className="text-gray-400">Application ID</p>
          <span className="mt-1 inline-block rounded-xs bg-blue-50 px-1.5 py-0.5 font-mono text-[8px] text-[#173d68]">
            {metadata.applicationId}
          </span>
        </div>
      </div>
    </aside>
  );
}
