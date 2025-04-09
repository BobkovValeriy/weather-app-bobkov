import axios from "axios";
import { cityApiResponse } from "../types/city";
import { WeatherApiResponse } from "../types/currentWeatherResponce";

const API_KEY = "F4koyX8XGPPjLR2UiGX5qZyO06Ys1XHm";

const citySearchURL =
  "http://dataservice.accuweather.com/locations/v1/cities/search";
const currentConditionsURL =
  "http://dataservice.accuweather.com/currentconditions/v1/";

export async function fetchCity(city: string): Promise<cityApiResponse | null> {
  const response = await axios.get<cityApiResponse[]>(citySearchURL, {
    params: {
      q: city,
      apikey: API_KEY,
    },
  });

  return response.data?.[0] || null;
}

export async function fetchWeather(
  key: string
): Promise<WeatherApiResponse | null> {
  const response = await axios.get<WeatherApiResponse[]>(
    `${currentConditionsURL}${key}`,
    {
      params: {
        apikey: API_KEY,
      },
    }
  );

  return response.data.length > 0 ? response.data[0] : null;
}
