import { Button } from "../../ui/button";
import { UploadCIN } from "../../../services/UploadCIN";
import { useMutation } from "@tanstack/react-query";

export default function DocumentcaptureInit({
  proceed,
}: {
  proceed: (step: number) => void;
}) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: UploadCIN,

    onSuccess: (data) => {
      if (data === true) {
        proceed(1);
      }
    },
  });

  const handleScan = () => {
    mutate();
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#e4e4e7] bg-white p-5 sm:w-150">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0f172a]">
          Insertion de la photo
        </h2>
      </div>

      {isError ? (
        <div className="text-sm text-red-500">
          {error instanceof Error ? error.message : "Une erreur est survenue"}
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center gap-5 overflow-hidden sm:flex-row">
          <div className="h-64 w-full rounded-lg border border-[#e4e4e7] bg-primary text-white sm:h-72">
            Recto
          </div>

          <div className="h-64 w-full rounded-lg border border-[#e4e4e7] bg-primary text-white sm:h-72">
            Verso
          </div>
        </div>
      )}

      <div className="flex flex-row items-center justify-center">
        <Button
          onClick={handleScan}
          disabled={isPending}
          className="h-12.75 min-w-34 rounded-xl bg-primary px-6 text-[15px] font-semibold text-white hover:bg-primary"
        >
          {isPending ? "Chargement..." : "Scanner"}
        </Button>
      </div>
    </div>
  );
}
