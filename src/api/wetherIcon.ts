export function WeatherIconUrl({ weatherIcon }: { weatherIcon: number }) {
  const iconUrl = `https://www.accuweather.com/images/weathericons/${
    weatherIcon < 10 ? `0${weatherIcon}` : weatherIcon
  }.svg`;

  return iconUrl;
}
