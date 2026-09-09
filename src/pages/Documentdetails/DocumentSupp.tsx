import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Map, MapPin } from "lucide-react";
import NavigationLv1stepper from "../../components/custom/steppermanagement/NavigationLv1stepper";
import {
  getCommunes,
  getCountrie,
  getDistrict,
  getFokotany,
  getOccupancyTypes,
  getRegions,
} from "../../services/dataSupp.api";
import SelectField from "../../components/custom/SelectField";
import SectionCard from "../../components/custom/SectionCard";
import SessionMetadataPanel from "../../components/custom/Sessionmetadata";
import { sessionMetadata } from "../../lib/mock";

export default function DocumentSupp({
  onBack,
  onContinue,
}: DocumentSuppProps) {
  // Sélections explicites de l'utilisateur (vide = "pas encore choisi, prendre le défaut")
  const [paysSel, setPaysSel] = useState("");
  const [regionSel, setRegionSel] = useState("");
  const [districtSel, setDistrictSel] = useState("");
  const [communeSel, setCommuneSel] = useState("");
  const [fokontanySel, setFokontanySel] = useState("");
  const [statutSel, setStatutSel] = useState("");
  const [adresse, setAdresse] = useState("");

  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: getCountrie,
  });
  const pays = paysSel || countriesQuery.data?.[0]?.id || "";

  const regionsQuery = useQuery({
    queryKey: ["regions", pays],
    queryFn: () => getRegions(pays),
    enabled: !!pays,
  });
  const region = regionSel || regionsQuery.data?.[0]?.id || "";

  const districtsQuery = useQuery({
    queryKey: ["districts", region],
    queryFn: () => getDistrict(region),
    enabled: !!region,
  });
  const district = districtSel || districtsQuery.data?.[0]?.id || "";

  const communesQuery = useQuery({
    queryKey: ["communes", district],
    queryFn: () => getCommunes(district),
    enabled: !!district,
  });
  const commune = communeSel || communesQuery.data?.[0]?.id || "";

  const fokotanyQuery = useQuery({
    queryKey: ["fokotany", commune],
    queryFn: () => getFokotany(commune),
    enabled: !!commune,
  });
  const fokontany = fokontanySel || fokotanyQuery.data?.[0]?.id || "";

  const occupancyTypesQuery = useQuery({
    queryKey: ["occupancyTypes"],
    queryFn: getOccupancyTypes,
  });
  const statut = statutSel || occupancyTypesQuery.data?.[0]?.value || "";

  const handlePaysChange = (value: string) => {
    setPaysSel(value);
    setRegionSel("");
    setDistrictSel("");
    setCommuneSel("");
    setFokontanySel("");
  };
  const handleRegionChange = (value: string) => {
    setRegionSel(value);
    setDistrictSel("");
    setCommuneSel("");
    setFokontanySel("");
  };
  const handleDistrictChange = (value: string) => {
    setDistrictSel(value);
    setCommuneSel("");
    setFokontanySel("");
  };
  const handleCommuneChange = (value: string) => {
    setCommuneSel(value);
    setFokontanySel("");
  };

  const error =
    (countriesQuery.isError && "Impossible de charger les pays.") ||
    (regionsQuery.isError && "Impossible de charger les régions.") ||
    (districtsQuery.isError && "Impossible de charger les districts.") ||
    (communesQuery.isError && "Impossible de charger les communes.") ||
    (fokotanyQuery.isError && "Impossible de charger les fokontany.") ||
    (occupancyTypesQuery.isError &&
      "Impossible de charger les statuts de résidence.") ||
    "";

  return (
    <div className="w-full max-w-full">
      <div className="mb-5">
        <h1 className="text-[20px] font-bold leading-tight text-[#092b50]">
          Données supplémentaires
        </h1>
        <p className="mt-1 text-[11px] text-gray-500">
          Étape 6 sur 10 - Collecte de données administratives et territoriales
        </p>
      </div>

      {error && (
        <p className="mb-3 rounded-xs border border-red-100 bg-red-50 px-2.5 py-2 text-[10px] text-red-600">
          {error}
        </p>
      )}

      <div className="flex flex-col items-start gap-5 xl:flex-row">
        <div className="flex min-w-0 w-full flex-1 flex-col gap-2.5">
          <SectionCard
            icon={<Map className="h-3.5 w-3.5" />}
            title="Données territoriales"
          >
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <SelectField
                label="Pays"
                value={pays}
                options={countriesQuery.data ?? []}
                onChange={handlePaysChange}
                loading={countriesQuery.isLoading}
              />
              <SelectField
                label="Région"
                value={region}
                options={regionsQuery.data ?? []}
                onChange={handleRegionChange}
                disabled={!pays}
                loading={regionsQuery.isLoading}
              />
              <SelectField
                label="District"
                value={district}
                options={districtsQuery.data ?? []}
                onChange={handleDistrictChange}
                disabled={!region}
                loading={districtsQuery.isLoading}
              />
              <SelectField
                label="Commune"
                value={commune}
                options={communesQuery.data ?? []}
                onChange={handleCommuneChange}
                disabled={!district}
                loading={communesQuery.isLoading}
              />
              <div className="sm:col-span-2">
                <SelectField
                  label="Fokontany"
                  value={fokontany}
                  options={fokotanyQuery.data ?? []}
                  onChange={setFokontanySel}
                  disabled={!commune}
                  loading={fokotanyQuery.isLoading}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            icon={<MapPin className="h-3.5 w-3.5" />}
            title="Données de résidence"
          >
            <div className="flex flex-col gap-2.5">
              <SelectField
                label="Statut"
                value={statut}
                options={occupancyTypesQuery.data ?? []}
                onChange={setStatutSel}
                loading={occupancyTypesQuery.isLoading}
              />
              <label className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-[#092b50]">
                  Adresse complète
                </span>
                <textarea
                  className="min-h-25 w-full resize-y rounded-xs border border-gray-200 bg-white px-2.5 py-2 text-[10px] text-gray-600 outline-none transition placeholder:text-gray-400 focus:border-[#173d68] focus:ring-1 focus:ring-[#173d68]/20"
                  placeholder="Lot IV B 23 Alarobia, Antananarivo"
                  value={adresse}
                  onChange={(event) => setAdresse(event.target.value)}
                />
              </label>
            </div>
          </SectionCard>
        </div>

        <div className="w-full shrink-0 xl:w-80">
          <SessionMetadataPanel metadata={sessionMetadata} />
        </div>
      </div>

      <div className="mt-5 border-t border-gray-200 pt-3">
        <NavigationLv1stepper
          onBack={onBack}
          onContinue={onContinue}
          isfinal={true}
          disabled={
            !pays || !region || !district || !commune || !fokontany || !statut
          }
        />
      </div>
    </div>
  );
}
