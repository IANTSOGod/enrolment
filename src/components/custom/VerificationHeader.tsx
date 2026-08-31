export default function VerificationHeader({
  title,
  subtitle,
  applicationId,
}: VerificationHeaderinterface) {
  return (
    <div className="flex flex-row flex-nowrap items-start justify-between gap-x-3 px-6 sm:px-8">
      <div className="min-w-0">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-[#0f172a] sm:text-2xl">
          {title}
        </h1>
        <p className="mt-1 text-[13px] text-[#52525b] sm:text-sm">{subtitle}</p>
      </div>

      <span className="shrink-0 whitespace-nowrap rounded-md border border-[#d4d4d8] bg-[#f8f9fb] px-3 py-1.5 text-xs font-semibold text-[#334155]">
        {applicationId}
      </span>
    </div>
  );
}
