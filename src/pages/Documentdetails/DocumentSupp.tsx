import { useEffect, useState } from "react";
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
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [fokotany, setFokotany] = useState<Fokotany[]>([]);
  const [occupancyTypes, setOccupancyTypes] = useState<OccupancyType[]>([]);
  const [pays, setPays] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [fokontany, setFokontany] = useState("");
  const [statut, setStatut] = useState("");
  const [adresse, setAdresse] = useState("");
  const [loading, setLoading] = useState({
    countries: false,
    regions: false,
    districts: false,
    communes: false,
    fokotany: false,
    occupancyTypes: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    setLoading((current) => ({ ...current, occupancyTypes: true }));
    getOccupancyTypes()
      .then((data) => {
        if (!active) return;
        setOccupancyTypes(data);
        setStatut(data[0]?.value ?? "");
      })
      .catch(() => {
        if (active) setError("Impossible de charger les statuts de résidence.");
      })
      .finally(() => {
        if (active)
          setLoading((current) => ({ ...current, occupancyTypes: false }));
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    setLoading((current) => ({ ...current, countries: true }));
    getCountrie()
      .then((data) => {
        if (!active) return;
        setCountries(data);
        setPays(data[0]?.id ?? "");
      })
      .catch(() => {
        if (active) setError("Impossible de charger les pays.");
      })
      .finally(() => {
        if (active) setLoading((current) => ({ ...current, countries: false }));
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!pays) {
      setRegions([]);
      setRegion("");
      return;
    }

    let active = true;
    setRegions([]);
    setRegion("");
    setDistricts([]);
    setDistrict("");
    setCommunes([]);
    setCommune("");
    setFokotany([]);
    setFokontany("");
    setLoading((current) => ({ ...current, regions: true }));

    getRegions(pays)
      .then((data) => {
        if (!active) return;
        setRegions(data);
        setRegion(data[0]?.id ?? "");
      })
      .catch(() => {
        if (active) setError("Impossible de charger les régions.");
      })
      .finally(() => {
        if (active) setLoading((current) => ({ ...current, regions: false }));
      });

    return () => {
      active = false;
    };
  }, [pays]);

  useEffect(() => {
    if (!region) {
      setDistricts([]);
      setDistrict("");
      return;
    }

    let active = true;
    setDistricts([]);
    setDistrict("");
    setCommunes([]);
    setCommune("");
    setFokotany([]);
    setFokontany("");
    setLoading((current) => ({ ...current, districts: true }));

    getDistrict(region)
      .then((data) => {
        if (!active) return;
        setDistricts(data);
        setDistrict(data[0]?.id ?? "");
      })
      .catch(() => {
        if (active) setError("Impossible de charger les districts.");
      })
      .finally(() => {
        if (active) setLoading((current) => ({ ...current, districts: false }));
      });

    return () => {
      active = false;
    };
  }, [region]);

  useEffect(() => {
    if (!district) {
      setCommunes([]);
      setCommune("");
      return;
    }

    let active = true;
    setCommunes([]);
    setCommune("");
    setFokotany([]);
    setFokontany("");
    setLoading((current) => ({ ...current, communes: true }));

    getCommunes(district)
      .then((data) => {
        if (!active) return;
        setCommunes(data);
        setCommune(data[0]?.id ?? "");
      })
      .catch(() => {
        if (active) setError("Impossible de charger les communes.");
      })
      .finally(() => {
        if (active) setLoading((current) => ({ ...current, communes: false }));
      });

    return () => {
      active = false;
    };
  }, [district]);

  useEffect(() => {
    if (!commune) {
      setFokotany([]);
      setFokontany("");
      return;
    }

    let active = true;
    setFokotany([]);
    setFokontany("");
    setLoading((current) => ({ ...current, fokotany: true }));

    getFokotany(commune)
      .then((data) => {
        if (!active) return;
        setFokotany(data);
        setFokontany(data[0]?.id ?? "");
      })
      .catch(() => {
        if (active) setError("Impossible de charger les fokontany.");
      })
      .finally(() => {
        if (active) setLoading((current) => ({ ...current, fokotany: false }));
      });

    return () => {
      active = false;
    };
  }, [commune]);

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
                options={countries}
                onChange={setPays}
                loading={loading.countries}
              />
              <SelectField
                label="Région"
                value={region}
                options={regions}
                onChange={setRegion}
                disabled={!pays}
                loading={loading.regions}
              />
              <SelectField
                label="District"
                value={district}
                options={districts}
                onChange={setDistrict}
                disabled={!region}
                loading={loading.districts}
              />
              <SelectField
                label="Commune"
                value={commune}
                options={communes}
                onChange={setCommune}
                disabled={!district}
                loading={loading.communes}
              />
              <div className="sm:col-span-2">
                <SelectField
                  label="Fokontany"
                  value={fokontany}
                  options={fokotany}
                  onChange={setFokontany}
                  disabled={!commune}
                  loading={loading.fokotany}
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
                options={occupancyTypes}
                onChange={setStatut}
                loading={loading.occupancyTypes}
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
