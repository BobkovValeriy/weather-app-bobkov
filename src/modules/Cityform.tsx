import { TextInput, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { fetchCity, fetchWeather } from "../api/fetchwether";
import { WeatherApiResponse } from "../types/currentWeatherResponce";
import { setWeatherCache, getWeatherCache } from "../cashe/casheFunctions";

interface CityFormProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setWeatherData: React.Dispatch<
    React.SetStateAction<WeatherApiResponse | null>
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

function CityForm({ setCity, setWeatherData, setError }: CityFormProps) {
  const form = useForm({
    initialValues: {
      city: "",
    },

    validate: {
      city: (value) => {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return "City name must contain only Latin letters";
        }
        if (value.trim().length < 2) {
          return "City must have 2 characters minimum";
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: { city: string }) => {
    const city = values.city.trim();
    setCity(city);

    const cachedData = getWeatherCache(city);
    if (cachedData) {
      console.log("cache");
      setError("");
      setWeatherData(cachedData);
      return;
    }

    try {
      const cityData = await fetchCity(city);
      if (!cityData?.Key) {
        setError("City not found");
        setWeatherData(null);
        return;
      }

      const weather = await fetchWeather(cityData.Key);
      setWeatherData(weather);
      setError("");
      if (weather) {
        setWeatherCache(city, weather);
      }
    } catch (error) {
      console.error(error);

      setWeatherData(null);
      setError("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack
        gap="md"
        style={{ maxWidth: 400, margin: "var(--mantine-spacing-xl) auto 0" }}
      >
        <TextInput
          label="City"
          placeholder="Enter a city name"
          {...form.getInputProps("city")}
        />
        <Button type="submit">Show the weather</Button>
      </Stack>
    </form>
  );
}

export default CityForm;
