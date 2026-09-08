import { useEffect, useRef, useState, type PointerEvent } from "react";
import NavigationLv1stepper from "../../components/custom/steppermanagement/NavigationLv1stepper";
import {
  createEnrolment,
  mockEnrolmentPayload,
  validateEnrolmentPayload,
} from "../../lib/api/enrolement.api";

interface ConsentementProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function Consentement({ onBack, onContinue }: ConsentementProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [truthAccepted, setTruthAccepted] = useState(false);
  const [biometricAccepted, setBiometricAccepted] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ratio = window.devicePixelRatio || 1;
    const bounds = canvas.getBoundingClientRect();
    canvas.width = bounds.width * ratio;
    canvas.height = bounds.height * ratio;
    context.scale(ratio, ratio);
    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "#092b50";
  }, []);

  const getPoint = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const bounds = canvas.getBoundingClientRect();
    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  };

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    const point = getPoint(event);
    const context = canvasRef.current?.getContext("2d");
    if (!point || !context) return;

    drawingRef.current = true;
    canvasRef.current?.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const point = getPoint(event);
    const context = canvasRef.current?.getContext("2d");
    if (!point || !context) return;

    context.lineTo(point.x, point.y);
    context.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    drawingRef.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const isComplete = truthAccepted && biometricAccepted && hasSignature;

  const handleSubmit = async () => {
    if (!isComplete || isSubmitting) return;

    setSubmitError("");
    const validationErrors = validateEnrolmentPayload(mockEnrolmentPayload);
    if (validationErrors.length > 0) {
      setSubmitError(validationErrors.join(" "));
      return;
    }

    try {
      setIsSubmitting(true);
      await createEnrolment(mockEnrolmentPayload);
      onContinue();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "La validation de l'enrôlement a échoué.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-full">
      <div className="mb-5">
        <h1 className="text-[20px] font-bold leading-tight text-[#202124]">
          Consentement et déclaration
        </h1>
        <p className="mt-1 text-[11px] text-[#52525b]">
          Le demandeur doit lire (ou se faire lire) la déclaration suivante et donner son consentement explicite avant de poursuivre.
        </p>
      </div>

      <section className="rounded-lg border border-[#c7c9d8] bg-white p-4 sm:p-6">
        <h2 className="text-[13px] font-bold text-[#202124]">
          Systèmes nationaux d'identité - Déclaration de consentement
        </h2>
        <div className="mt-6 space-y-3 text-[12px] leading-tight text-[#202124]">
          <p>
            Je consens à la collecte, au traitement et au stockage de mes données biométriques (empreintes digitales, scans de l'iris et photographie faciale) et de mes données démographiques par le Système national d'identité aux fins d'établir mon identité numérique.
          </p>
          <p>
            Je comprends que mes données seront stockées en toute sécurité dans des bases de données gouvernementales et pourront être partagées avec les organismes autorisés uniquement dans les conditions prévues par la loi, à des fins d'authentification et de vérification d'identité.
          </p>
        </div>
      </section>

      <section className="mt-4 space-y-4 rounded-lg border border-[#c7c9d8] bg-[#f8f9fb] p-4 sm:p-5">
        <label className="flex cursor-pointer items-start gap-3 text-[12px] font-semibold text-[#202124]">
          <input
            type="checkbox"
            checked={truthAccepted}
            onChange={(event) => setTruthAccepted(event.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-[#1a237e]"
          />
          <span>Je déclare que les informations fournies sont vraies et exactes.</span>
        </label>

        <label className="flex cursor-pointer items-start gap-3 text-[12px] font-semibold text-[#202124]">
          <input
            type="checkbox"
            checked={biometricAccepted}
            onChange={(event) => setBiometricAccepted(event.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-[#1a237e]"
          />
          <span>
            Je consens à la collecte et au stockage de mes données biométriques et démographiques.
            <small className="mt-1 block text-[10px] font-normal text-[#52525b]">
              Nécessaire pour l'établissement de l'identité numérique.
            </small>
          </span>
        </label>
      </section>

      <section className="mt-4">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[#202124]">Signature du demandeur</h2>
          <button
            type="button"
            onClick={clearSignature}
            className="text-[12px] font-medium text-[#000b78] hover:underline"
          >
            ⊠ Tampon transparent
          </button>
        </div>
        <div className="relative h-40 overflow-hidden rounded-lg border-2 border-[#c7c9d8] bg-white">
          <canvas
            ref={canvasRef}
            className="h-full w-full touch-none"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
            onPointerLeave={stopDrawing}
          />
          {!hasSignature && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[12px] text-[#8b8d9a]">
              Inscrivez-vous dans la zone
            </div>
          )}
          <div className="pointer-events-none absolute bottom-7 left-7 right-7 border-b border-dashed border-[#d5d7e2]" />
        </div>
        <p className="mt-1 text-[10px] text-[#52525b]">
          ⓘ Veuillez fournir une signature numérique claire correspondant aux documents officiels.
        </p>
      </section>

      {submitError && (
        <p className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-[11px] text-red-600">
          {submitError}
        </p>
      )}

      <div className="mt-5 border-t border-[#d5d7e2] pt-4">
        <NavigationLv1stepper
          onBack={onBack}
          onContinue={handleSubmit}
          isfinal={true}
          disabled={!isComplete || isSubmitting}
        />
        {isSubmitting && (
          <p className="mt-2 text-right text-[10px] text-[#52525b]">
            Validation de l'enrôlement...
          </p>
        )}
      </div>
    </div>
  );
}
