import { getAccessToken } from "./enrolement.api";

export async function Dashboardstats(): Promise<Dashboardinterface> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`
    },
  });
  const data = await response.json();
  console.log(data)
  return data as Dashboardinterface;
}


