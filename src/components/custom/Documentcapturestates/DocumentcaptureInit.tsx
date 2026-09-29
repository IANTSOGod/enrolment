import { useEffect, useRef, useState } from "react";
import { ImagePlus, RefreshCw, ScanLine } from "lucide-react";
import { Button } from "../../ui/button";
import { scanCIN } from "../../../services/UploadCIN";
import { useMutation } from "@tanstack/react-query";

export default function DocumentcaptureInit({
  proceed,
  onDocumentsChange,
  onScanResult,
  initialImages,
}: {
  proceed: (step: number, frontImageUrl: string, backImageUrl: string) => void;
  onDocumentsChange: (files: { front: File; back: File }) => void;
  onScanResult: (result: CinScanResult) => void;
  initialImages: { front: File; back: File } | null;
}) {
  const [frontImage, setFrontImage] = useState<File | null>(initialImages?.front ?? null);
  const [backImage, setBackImage] = useState<File | null>(initialImages?.back ?? null);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: scanCIN,

    onSuccess: (result, images) => {
      onDocumentsChange(images);
      onScanResult(result);
      proceed(
        1,
        URL.createObjectURL(images.front),
        URL.createObjectURL(images.back),
      );
    },
  });

  const handleScan = () => {
    if (frontImage && backImage) {
      mutate({ front: frontImage, back: backImage });
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#e4e4e7] bg-white p-5 sm:w-150">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0f172a]">
          Insertion de la photo
        </h2>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-5 overflow-hidden sm:flex-row">
        <CaptureFace label="Recto" file={frontImage} onFileChange={setFrontImage} />
        <CaptureFace label="Verso" file={backImage} onFileChange={setBackImage} />
      </div>

      {isError && (
        <div className="text-sm text-red-500">
          {error instanceof Error ? error.message : "Une erreur est survenue"}
        </div>
      )}

      <div className="flex flex-row items-center justify-center">
        <Button
          onClick={handleScan}
          disabled={isPending || !frontImage || !backImage}
          className="h-12.75 min-w-34 rounded-xl bg-primary px-6 text-[15px] font-semibold text-white hover:bg-primary"
        >
          {isPending ? "Chargement..." : "Valider les deux faces"}
        </Button>
      </div>
    </div>
  );
}

function CaptureFace({
  label,
  file,
  onFileChange,
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    const imageElement = imageRef.current;
    if (imageElement) imageElement.src = url;
    return () => {
      imageElement?.removeAttribute("src");
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <section className="flex h-72 w-full flex-col overflow-hidden rounded-lg border border-[#e4e4e7] bg-[#fafafa] sm:flex-1">
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        {file ? (
          <img ref={imageRef} alt={`Aperçu du ${label.toLowerCase()} de la carte`} className="h-full w-full object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-sm text-[#71717a]">
            <ScanLine className="size-8" aria-hidden="true" />
            <span>Image du {label.toLowerCase()}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-[#e4e4e7] bg-white px-3 py-2">
        <span className="text-sm font-medium text-[#0f172a]">{label}</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          {file ? <RefreshCw aria-hidden="true" /> : <ImagePlus aria-hidden="true" />}
          {file ? "Reprendre" : "Capturer"}
        </Button>
      </div>
    </section>
  );
}
