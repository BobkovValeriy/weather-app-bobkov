import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { fetchCity, fetchWeather } from "./fetchwether";
import { WeatherIconUrl } from "./wetherIcon";

vi.mock("axios");

describe("API Functions", () => {
  describe("fetchCity", () => {
    it("must return city data", async () => {
      const mockData = [{ Key: "123", LocalizedName: "Kyiv" }];
      (axios.get as any).mockResolvedValue({ data: mockData });

      const result = await fetchCity("Kyiv");
      expect(result).toEqual(mockData[0]);
    });

    it("must return null if city not found", async () => {
      (axios.get as any).mockResolvedValue({ data: [] });

      const result = await fetchCity("InvalidCity");

      expect(result).toBeNull();
    });
  });

  describe("fetchWeather", () => {
    it("must return weather data", async () => {
      const mockData = [
        {
          Temperature: { Metric: { Value: 22 } },
          WeatherText: "Sunny",
          WeatherIcon: 1,
        },
      ];

      (axios.get as any).mockResolvedValue({ data: mockData });

      const result = await fetchWeather("123");
      expect(result).toEqual(mockData[0]);
    });

    it("must return null if no weather data is found", async () => {
      (axios.get as any).mockResolvedValue({ data: [] });

      const result = await fetchWeather("InvalidCity");
      expect(result).toBeNull();
    });
  });

  describe("WeatherIconUrl", () => {
    it("must return the correct icon URL", () => {
      const weatherIcon = 1;
      const result = WeatherIconUrl({ weatherIcon });
      expect(result).toBe(
        "https://www.accuweather.com/images/weathericons/01.svg"
      );
    });

    it("must pad the icon number when less than 10", () => {
      const weatherIcon = 9;
      const result = WeatherIconUrl({ weatherIcon });
      expect(result).toBe(
        "https://www.accuweather.com/images/weathericons/09.svg"
      );
    });
  });
});
