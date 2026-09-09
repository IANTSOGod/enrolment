import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import QualityControlCard from "../../components/custom/QualityControlCard";

export default function DocumentVerificationStep2({
  onValidatePhoto,
}: DocumentVerificationStep2Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [embedding, setEmbedding] = useState<number[] | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

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
    setPhoto(image);
    setEmbedding(createImageEmbedding(embeddingContext));
    setIsCapturing(false);
  };

  const retakePhoto = () => {
    setPhoto(null);
    setEmbedding(null);
    void startCamera();
  };

  const validatePhoto = () => {
    if (photo && embedding) onValidatePhoto({ image: photo, embedding });
  };
  return (
    <div className="w-full max-w-full ">
      {/* Titre */}
      <div className="mb-5">
        <h1 className="text-[20px] font-bold leading-tight text-[#092b50]">
          Capture de photo
        </h1>

        <p className="mt-1 text-[11px] text-gray-500">
          Étape 5 sur 10 - Capture biométrique conforme ISO/IEC 19794-5:2011
        </p>
      </div>

      {/* Zone principale */}
      <div className="flex items-start gap-5.5">
        {/* =========================
            ZONE DE CAPTURE
        ========================== */}
        <div className="relative w-88.75 shrink-0">
          <div
            className="
              relative
              h-94.75
              w-88.75
              overflow-hidden
              rounded-lg
              bg-gray-500
            "
          >
            {photo ? (
              <img
                src={photo}
                alt="Photo capturée"
                className="h-full w-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                muted
                playsInline
                className="h-full w-full object-cover"
                aria-label="Aperçu de la caméra"
              />
            )}
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
              disabled={isCapturing || Boolean(photo)}
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
        <div className="w-80 shrink-0">
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
              Dernière capture
            </h2>

            {/* Image */}
            <div className="overflow-hidden rounded-xs border border-gray-200">
              <img
                src={photo ?? "/images/photo-capture.jpg"}
                alt={photo ? "Photo capturée" : "Aucune capture"}
                className="h-33 w-full object-cover"
              />
            </div>

            {/* Boutons */}
            <div className="mt-2.25 space-y-1.25">
              <button
                type="button"
                onClick={retakePhoto}
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
                Reprendre
              </button>

              <button
                type="button"
                disabled={!photo || !embedding}
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
                Valider la photo
              </button>
            </div>
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
