import { Card, Title, Text, Flex, Image } from "@mantine/core";
import { WeatherApiResponse } from "../types/currentWeatherResponce";
import { WeatherIconUrl } from "../api/wetherIcon";

interface WeatherCardProps {
  city: string;
  weatherData: WeatherApiResponse | null;
}

function WeatherCard({ city, weatherData }: WeatherCardProps) {
  if (!weatherData) return null;

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{ marginTop: "34px" }}
    >
      <Card
        shadow="sm"
        padding="lg"
        style={{
          width: 400,
          background: "linear-gradient(to bottom, #b2f2bb, #80e0c0)",
        }}
      >
        <Title order={3}>{city}</Title>
        <Flex direction="row" justify="space-between" align="center">
          <div>
            <Text size="lg">{weatherData.WeatherText}</Text>
            <Text size="xl">
              {weatherData.Temperature.Metric.Value}°
              {weatherData.Temperature.Metric.Unit}
            </Text>
          </div>

          <div>
            <Image
              src={WeatherIconUrl({ weatherIcon: weatherData.WeatherIcon })}
              alt={weatherData.WeatherText}
              width={50}
              height={50}
            />
          </div>
        </Flex>

        <Text size="sm">
          Last updated:{" "}
          {new Date(weatherData.EpochTime * 1000).toLocaleString()}
        </Text>
      </Card>
    </Flex>
  );
}

export default WeatherCard;
