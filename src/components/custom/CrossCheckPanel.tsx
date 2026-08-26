import { AlertCircle, CheckCircle2, PenLine } from "lucide-react";

type CrossCheckField = {
  key: string;
  label: string;
  ocrValue: string;
  inputValue: string;
  match: boolean;
};

export default function CrossCheckPanel({
  confidence,
  fields,
  onManualVerify,
}: {
  confidence: number;
  fields: CrossCheckField[];
  onManualVerify?: (fieldKey: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#e4e4e7] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0f172a]">
          Cross-Check Data
        </h2>
        <span className="text-xs text-[#71717a]">
          Confiance:{" "}
          <span className="font-semibold text-[#0f172a]">{confidence}%</span>
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#334155]">
              {field.label}
            </p>

            <div
              className={`flex flex-col gap-2 rounded-lg p-3 sm:flex-row sm:items-center sm:gap-3 ${
                field.match ? "" : "border border-red-200 bg-red-50"
              }`}
            >
              {!field.match && (
                <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-red-600 sm:hidden">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Écart détecté
                </div>
              )}

              <div
                className={`flex-1 rounded-md border px-3 py-2 ${
                  field.match
                    ? "border-[#e4e4e7] bg-[#fafafa]"
                    : "border-red-200 bg-white"
                }`}
              >
                <p
                  className={`text-[11px] ${
                    field.match ? "text-[#71717a]" : "text-red-500"
                  }`}
                >
                  Résultat OCR
                </p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className={`text-sm font-semibold ${
                      field.match ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {field.ocrValue}
                  </span>
                  {field.match && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  )}
                </div>
              </div>

              <div
                className={`flex-1 rounded-md border px-3 py-2 ${
                  field.match ? "border-[#e4e4e7]" : "border-red-300"
                }`}
              >
                <p className="text-[11px] text-[#71717a]">Saisie de données</p>
                <p className="mt-0.5 text-sm font-medium text-[#0f172a]">
                  {field.inputValue}
                </p>
              </div>
            </div>

            {!field.match && (
              <button
                type="button"
                onClick={() => onManualVerify?.(field.key)}
                className="mt-2 flex items-center gap-1.5 rounded-md border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5"
              >
                <PenLine className="h-3.5 w-3.5" />
                Vérifier manuellement
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
