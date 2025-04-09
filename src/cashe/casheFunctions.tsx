import { WeatherApiResponse } from "../types/currentWeatherResponce";

export function getWeatherCache(city: string) {
  const cachedData = localStorage.getItem(city);

  if (!cachedData) return null;

  const { data, timestamp } = JSON.parse(cachedData);

  if (Date.now() - timestamp > 300000) {
    localStorage.removeItem(city);
    return null;
  }

  return data;
}

export function setWeatherCache(city: string, data: WeatherApiResponse) {
  console.log("try");
  const cache = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(city, JSON.stringify(cache));
}
