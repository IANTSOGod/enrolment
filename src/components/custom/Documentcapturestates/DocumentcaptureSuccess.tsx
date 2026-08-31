import { CheckCircle2, ScanLine, Volume2 } from "lucide-react";

export default function DocumentCaptureSuccess({
  imageUrl,
  copyLabel = "Copie Originale",
  mrzStatus,
  nfcStatus,
}: Documentcapturesuccessinterface) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#e4e4e7] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0f172a]">
          Aperçu en direct / Capture
        </h2>
        <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {copyLabel}
        </span>
      </div>

      <div className="flex flex-col items-center align-center justify-center sm:flex-row relative gap-5 overflow-hidden">
        <img
          src={imageUrl}
          alt="Document capturé"
          className="h-64 w-64 object-cover sm:h-72 rounded-lg border border-[#e4e4e7]"
        />
        <img
          src={imageUrl}
          alt="Document capturé 2"
          className="h-64 w-64 object-cover sm:h-72 rounded-lg border border-[#e4e4e7]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-[#e4e4e7] bg-[#fafafa] px-3 py-2.5">
          <ScanLine className="h-4 w-4 text-[#71717a]" />
          <div>
            <p className="text-[11px] text-[#71717a]">{mrzStatus.label}</p>
            <p
              className={`text-xs font-semibold ${
                mrzStatus.valid ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {mrzStatus.value}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#e4e4e7] bg-[#fafafa] px-3 py-2.5">
          <Volume2 className="h-4 w-4 text-[#71717a]" />
          <div>
            <p className="text-[11px] text-[#71717a]">{nfcStatus.label}</p>
            <p
              className={`text-xs font-semibold ${
                nfcStatus.valid ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {nfcStatus.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
