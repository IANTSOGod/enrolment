import { Camera, ScanFace, ShieldCheck, Sun, UserRound } from "lucide-react";
import QualityRow from "../../components/custom/QualityRow";

export default function DocumentVerificationStep2() {
  return (
    <div className="w-full max-w-[800px]">
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
      <div className="flex items-start gap-[22px]">
        {/* =========================
            ZONE DE CAPTURE
        ========================== */}
        <div className="relative w-[355px] shrink-0">
          <div
            className="
              relative
              h-[379px]
              w-[355px]
              overflow-hidden
              rounded-[4px]
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
                h-[185px]
                w-[185px]
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
                bottom-[9px]
                left-1/2
                flex
                h-[40px]
                w-[40px]
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
        <div className="w-[190px] shrink-0">
          {/* Dernière capture */}
          <div
            className="
              rounded-[5px]
              border
              border-gray-200
              bg-white
              p-[14px]
            "
          >
            <h2 className="mb-[10px] text-[12px] font-semibold text-[#092b50]">
              Dernière capture
            </h2>

            {/* Image */}
            <div className="overflow-hidden rounded-[2px] border border-gray-200">
              <img
                src="/images/photo-capture.jpg"
                alt="Dernière capture"
                className="h-[132px] w-full object-cover"
              />
            </div>

            {/* Boutons */}
            <div className="mt-[9px] space-y-[5px]">
              <button
                type="button"
                className="
                  h-[27px]
                  w-full
                  rounded-[2px]
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
                  h-[27px]
                  w-full
                  rounded-[2px]
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
              mt-[10px]
              rounded-[5px]
              border
              border-gray-200
              bg-white
              p-[12px]
            "
          >
            <h2 className="mb-[10px] text-[12px] font-semibold text-[#092b50]">
              Contrôles de qualité
            </h2>

            <div className="space-y-[8px]">
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
