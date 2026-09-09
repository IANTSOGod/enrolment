import { ChevronDown } from "lucide-react";

export default function SelectField({
  label,
  value,
  options,
  onChange,
  disabled = false,
  loading = false,
}: SelectFieldProps) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[10px] font-semibold text-[#092b50]">{label}</span>
      <span className="relative">
        <select
          className="h-8 w-full appearance-none rounded-xs border border-gray-200 bg-white px-2.5 pr-8 text-[10px] text-gray-600 outline-none transition focus:border-[#173d68] focus:ring-1 focus:ring-[#173d68]/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          value={value}
          disabled={disabled || loading}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">{loading ? "Chargement..." : "Sélectionner"}</option>
          {options.map((option) => {
            const optionValue = "value" in option ? option.value : option.id;
            const optionLabel = "label" in option ? option.label : option.name;

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
      </span>
    </label>
  );
}
