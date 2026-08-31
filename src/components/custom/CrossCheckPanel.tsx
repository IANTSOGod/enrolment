import { AlertCircle, CheckCircle2, PenLine } from "lucide-react";
import { useState } from "react";

type CrossCheckField = {
  key: string;
  label: string;
  ocrValue: string;
  inputValue: string;
};

type CrossCheckPanelProps = {
  confidence: number;
  fields: CrossCheckField[];
  onChange?: (fieldKey: string, value: string) => void;
  onManualVerify?: (fieldKey: string) => void;
};

export default function CrossCheckPanel({
  confidence,
  fields,
  onChange,
  onManualVerify,
}: CrossCheckPanelProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.key, field.inputValue])),
  );

  const handleChange = (fieldKey: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));

    onChange?.(fieldKey, value);
  };

  const normalize = (value: string) => value.trim().toLowerCase();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          Cross-Check Data
        </h2>

        <span className="text-xs text-zinc-500">
          Confiance :{" "}
          <span className="font-semibold text-slate-900">{confidence}%</span>
        </span>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-4">
        {fields.map((field) => {
          const inputValue = values[field.key] ?? "";

          const match =
            normalize(inputValue) === normalize(field.ocrValue) &&
            inputValue.trim() !== "";

          return (
            <div key={field.key}>
              {/* Label + status */}
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {field.label}
                </p>

                {match ? (
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Correspondance
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs font-medium text-red-500">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Différent
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* OCR - référence */}
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2.5">
                  <p className="text-[11px] font-medium text-zinc-500">
                    Résultat OCR
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-slate-900">
                      {field.ocrValue || "—"}
                    </span>
                  </div>
                </div>

                {/* Input utilisateur */}
                <div>
                  <p className="mb-1 text-[11px] font-medium text-zinc-500">
                    Saisie de données
                  </p>

                  <div className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className={`w-full rounded-md border bg-white px-3 py-2.5 pr-9 text-sm font-medium outline-none transition-colors ${
                        match
                          ? "border-emerald-500 bg-emerald-50/30 text-emerald-700 focus:ring-2 focus:ring-emerald-100"
                          : "border-red-400 bg-red-50/30 text-red-600 focus:ring-2 focus:ring-red-100"
                      }`}
                    />

                    {match && (
                      <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />
                    )}

                    {!match && inputValue && (
                      <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Vérification manuelle */}
              {!match && (
                <button
                  type="button"
                  onClick={() => onManualVerify?.(field.key)}
                  className="mt-2 flex items-center gap-1.5 rounded-md border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  <PenLine className="h-3.5 w-3.5" />
                  Vérifier manuellement
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
