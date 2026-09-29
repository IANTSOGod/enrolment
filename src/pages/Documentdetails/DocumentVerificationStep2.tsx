import { useEffect, useRef, useState } from "react";
import { Camera, Check, RotateCcw } from "lucide-react";
import QualityControlCard from "../../components/custom/QualityControlCard";

const facialViews: Array<{
  key: keyof FacialCaptures;
  label: string;
  instruction: string;
}> = [
  { key: "front", label: "De face", instruction: "Regardez droit devant vous." },
  { key: "leftProfile", label: "Profil gauche", instruction: "Tournez légèrement la tête vers votre gauche." },
  { key: "rightProfile", label: "Profil droit", instruction: "Tournez légèrement la tête vers votre droite." },
];

export default function DocumentVerificationStep2({
  onValidatePhoto,
  onCaptureChange,
  initialCapture,
}: DocumentVerificationStep2Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [captures, setCaptures] = useState<FacialCaptures>(initialCapture);
  const [activeView, setActiveView] = useState<keyof FacialCaptures>("front");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const activeCapture = captures[activeView];
  const activeInstruction = facialViews.find((view) => view.key === activeView)!;
  const hasAllCaptures = facialViews.every((view) => captures[view.key] !== null);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("La caméra n'est pas disponible dans ce navigateur.");
      return;
    }

    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 720 },
          height: { ideal: 960 },
        },
        audio: false,
      });
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setCameraError("Accès à la caméra refusé ou indisponible.");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void startCamera();
    return () =>
      streamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  const createImageEmbedding = (context: CanvasRenderingContext2D) => {
    const pixels = context.getImageData(0, 0, 16, 16).data;
    const vector: number[] = [];

    for (let index = 0; index < pixels.length; index += 4) {
      const grayscale =
        (0.299 * pixels[index] +
          0.587 * pixels[index + 1] +
          0.114 * pixels[index + 2]) /
        255;
      vector.push(Number(grayscale.toFixed(6)));
    }

    return vector;
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (
      !video ||
      !canvas ||
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      setCameraError("La caméra n'est pas encore prête.");
      return;
    }

    setIsCapturing(true);
    canvas.width = 720;
    canvas.height = 960;
    const context = canvas.getContext("2d");
    if (!context) {
      setIsCapturing(false);
      setCameraError("Impossible de capturer l'image.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg", 0.9);
    const embeddingCanvas = document.createElement("canvas");
    embeddingCanvas.width = 16;
    embeddingCanvas.height = 16;
    const embeddingContext = embeddingCanvas.getContext("2d");
    if (!embeddingContext) {
      setIsCapturing(false);
      setCameraError("Impossible de générer le vecteur image.");
      return;
    }

    embeddingContext.drawImage(canvas, 0, 0, 16, 16);
    const updatedCaptures = {
      ...captures,
      [activeView]: {
        image,
        embedding: createImageEmbedding(embeddingContext),
      },
    };
    setCaptures(updatedCaptures);
    onCaptureChange(updatedCaptures);
    setIsCapturing(false);
  };

  const retakePhoto = () => {
    const updatedCaptures = { ...captures, [activeView]: null };
    setCaptures(updatedCaptures);
    onCaptureChange(updatedCaptures);
  };

  const validatePhoto = () => {
    if (hasAllCaptures) onValidatePhoto(captures);
  };
  return (
    <div className="w-full max-w-full ">
      {/* Titre */}
      <div className="mb-5">
        <h1 className="text-[20px] font-bold leading-tight text-[#092b50]">
          Capture de photo
        </h1>

        <p className="mt-1 text-[11px] text-gray-500">
          Capturez les trois vues du visage pour compléter la biométrie.
        </p>
      </div>

      {/* Zone principale */}
      <div className="flex flex-col items-start gap-5.5 lg:flex-row">
        {/* =========================
            ZONE DE CAPTURE
        ========================== */}
        <div className="relative w-full max-w-88.75 shrink-0">
          <div
            className="
              relative
              aspect-3/4
              w-full
              overflow-hidden
              rounded-lg
              bg-gray-500
            "
          >
            {activeCapture && (
              <img
                src={activeCapture.image}
                alt={`Capture ${activeInstruction.label.toLowerCase()}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <video
              ref={videoRef}
              muted
              playsInline
              className={`h-full w-full object-cover ${activeCapture ? "hidden" : ""}`}
              aria-label="Aperçu de la caméra"
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Cercle / zone visage */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[48%]
                h-46.25
                w-46.25
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white/5
                ring-1
                ring-white/40
              "
            />

            {/* Ligne verticale */}
            <div
              className="
                pointer-events-none
                absolute
                bottom-[7%]
                left-1/2
                top-[10%]
                border-l
                border-dashed
                border-green-500/60
              "
            />

            {/* Ligne horizontale */}
            <div
              className="
                pointer-events-none
                absolute
                left-[20%]
                right-[20%]
                top-[50%]
                border-t
                border-orange-400/70
              "
            />

            {/* Bouton caméra */}
            <button
              type="button"
              onClick={capturePhoto}
              disabled={isCapturing || Boolean(activeCapture)}
              className="
                absolute
                bottom-2.25
                left-1/2
                flex
                h-10
                w-10
                -translate-x-1/2
                items-center
                justify-center
                rounded-full
                border-[3px]
                border-white
                bg-[#07345e]
                text-white
                shadow-md
                transition
                hover:bg-[#0b4378]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Camera size={19} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* =========================
            COLONNE DROITE
        ========================== */}
        <div className="w-full min-w-0 shrink-0 lg:w-80">
          {/* Dernière capture */}
          <div
            className="
              rounded-[5px]
              border
              border-gray-200
              bg-white
              p-3.5
            "
          >
            <h2 className="mb-2.5 text-[12px] font-semibold text-[#092b50]">
              Captures du visage
            </h2>

            <div className="mb-3 grid grid-cols-3 gap-1.5" role="group" aria-label="Choisir l'angle à capturer">
              {facialViews.map((view, index) => {
                const captured = captures[view.key] !== null;
                return (
                  <button
                    key={view.key}
                    type="button"
                    aria-pressed={activeView === view.key}
                    onClick={() => setActiveView(view.key)}
                    className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded border px-1 text-[10px] font-medium ${activeView === view.key ? "border-[#173d68] bg-[#eef3f8] text-[#173d68]" : "border-gray-200 bg-white text-gray-600"}`}
                  >
                    <span>{captured ? <Check className="size-3.5" aria-label="Capturé" /> : `0${index + 1}`}</span>
                    <span>{view.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="mb-2 text-[11px] text-[#52525b]">{activeInstruction.instruction}</p>

            {/* Image */}
            <div className="overflow-hidden rounded-xs border border-gray-200">
              <img
                src={activeCapture?.image ?? "/images/photo-capture.jpg"}
                alt={activeCapture ? `Capture ${activeInstruction.label.toLowerCase()}` : "Aucune capture pour cet angle"}
                className="h-36 w-full bg-gray-100 object-cover"
              />
            </div>

            {/* Boutons */}
            <div className="mt-2.25 space-y-1.25">
              <button
                type="button"
                onClick={retakePhoto}
                disabled={!activeCapture}
                className="
                  h-6.75
                  w-full
                  rounded-xs
                  border
                  border-[#173d68]
                  bg-white
                  text-[9px]
                  font-semibold
                  text-[#173d68]
                  transition
                  hover:bg-gray-50
                "
              >
                  <RotateCcw className="mr-1 inline size-3" />Reprendre cet angle
              </button>

              <button
                type="button"
                disabled={!hasAllCaptures}
                onClick={validatePhoto}
                className="
                  h-6.75
                  w-full
                  rounded-xs
                  bg-[#062d54]
                  text-[9px]
                  font-medium
                  text-white
                  transition
                  hover:bg-[#083b6d]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Valider les trois captures
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-[#52525b]">
              {facialViews.filter((view) => captures[view.key]).length}/3 angles capturés
            </p>
            {cameraError && (
              <p className="mt-2 text-[9px] text-red-600">{cameraError}</p>
            )}
          </div>

          <QualityControlCard></QualityControlCard>
        </div>
      </div>
    </div>
  );
}
