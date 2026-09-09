import { ScanFace, ShieldCheck, Sun, UserRound } from "lucide-react";
import QualityRow from "./QualityRow";

export default function QualityControlCard() {
  return (
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
  );
}
