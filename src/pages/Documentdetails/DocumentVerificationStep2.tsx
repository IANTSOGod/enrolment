import { Camera, ScanFace, ShieldCheck, Sun, UserRound } from "lucide-react";
import QualityRow from "../../components/custom/QualityRow";

export default function DocumentVerificationStep2() {
  return (
    <div className="w-full max-w-200">
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
            <img
              src="/images/photo-capture.jpg"
              alt="Capture biométrique"
              className="h-full w-full object-cover"
            />

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
              "
            >
              <Camera size={19} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* =========================
            COLONNE DROITE
        ========================== */}
        <div className="w-47.5 shrink-0">
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
                src="/images/photo-capture.jpg"
                alt="Dernière capture"
                className="h-33 w-full object-cover"
              />
            </div>

            {/* Boutons */}
            <div className="mt-2.25 space-y-1.25">
              <button
                type="button"
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
                "
              >
                Valider la photo
              </button>
            </div>
          </div>

          {/* Contrôles qualité */}
          <div
            className="
              mt-2.5
              rounded-[5px]
              border
              border-gray-200
              bg-white
              p-3
            "
          >
            <h2 className="mb-2.5 text-[12px] font-semibold text-[#092b50]">
              Contrôles de qualité
            </h2>

            <div className="space-y-2">
              <QualityRow
                icon={<Sun size={13} />}
                label="Éclairage"
                status="OK"
                success
              />

              <QualityRow
                icon={<ScanFace size={13} />}
                label="Centrage"
                status="À ajuster"
              />

              <QualityRow
                icon={<UserRound size={13} />}
                label="Expression neutre"
                status="OK"
                success
              />

              <QualityRow
                icon={<ShieldCheck size={13} />}
                label="Détection du vivant (PAD)"
                status="Réussi"
                success
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
