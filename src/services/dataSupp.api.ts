const API_URL = "http://192.168.11.163:3000";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: { accept: "*/*" },
  });

  if (!response.ok) {
    throw new Error(`Erreur API (${response.status}) : ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const getCountrie = (): Promise<Country[]> =>
  get<Country[]>("/countries");

export const getRegions = (countryId: string): Promise<Region[]> =>
  get<Region[]>(`/countries/${encodeURIComponent(countryId)}/regions`);

export const getDistrict = (regionId: string): Promise<District[]> =>
  get<District[]>(`/regions/${encodeURIComponent(regionId)}/districts`);

export const getCommunes = (districtId: string): Promise<Commune[]> =>
  get<Commune[]>(`/districts/${encodeURIComponent(districtId)}/communes`);

export const getFokotany = (communeId: string): Promise<Fokotany[]> =>
  get<Fokotany[]>(`/communes/${encodeURIComponent(communeId)}/fokontany`);

export const getOccupancyTypes = (): Promise<OccupancyType[]> =>
  get<OccupancyType[]>("/references/occupancy-types");
