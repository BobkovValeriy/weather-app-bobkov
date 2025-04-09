import { useState } from "react";
import { Text } from "@mantine/core";
import { WeatherApiResponse } from "./types/currentWeatherResponce";
import CityForm from "./modules/Cityform";
import WetherCard from "./modules/WeatherCard";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null
  );
  const [error, setError] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <CityForm
        setCity={setCity}
        setWeatherData={setWeatherData}
        setError={setError}
      />

      {error && <Text color="red">{error}</Text>}

      {weatherData && <WetherCard city={city} weatherData={weatherData} />}
    </div>
  );
};

export default App;
