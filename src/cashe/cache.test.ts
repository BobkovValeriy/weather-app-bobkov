import { describe, it, expect, vi } from "vitest";
import { beforeAll, afterEach } from "vitest";
import { getWeatherCache, setWeatherCache } from "./casheFunctions";
import { WeatherApiResponse } from "../types/currentWeatherResponce";

// Создаем мок для localStorage
class MockStorage implements Storage {
  private store: Record<string, string> = {};

  get length() {
    return Object.keys(this.store).length;
  }

  clear() {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
}

describe("Weather cache functions", () => {
  const mockLocalStorage = new MockStorage();

  beforeAll(() => {
    vi.stubGlobal("localStorage", mockLocalStorage);
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("should return null if no cached data found", () => {
    mockLocalStorage.removeItem("Kyiv");

    const result = getWeatherCache("Kyiv");

    expect(result).toBeNull();
    expect(mockLocalStorage.getItem("Kyiv")).toBeNull();
  });

  it("should return null if cached data is expired", () => {
    const cachedData = JSON.stringify({
      data: { WeatherText: "Sunny" },
      timestamp: Date.now() - 400000,
    });
    mockLocalStorage.setItem("Kyiv", cachedData);

    const result = getWeatherCache("Kyiv");

    expect(result).toBeNull();
    expect(mockLocalStorage.getItem("Kyiv")).toBeNull();
  });

  it("should return cached data if it is valid", () => {
    const validData = {
      WeatherText: "Sunny",
      Temperature: { Metric: { Value: 25, Unit: "C", UnitType: 1 } },
    };

    const cachedData = JSON.stringify({
      data: validData,
      timestamp: Date.now(),
    });
    mockLocalStorage.setItem("Kyiv", cachedData);

    const result = getWeatherCache("Kyiv");

    expect(result).toEqual(validData);
    expect(mockLocalStorage.getItem("Kyiv")).toBe(cachedData);
  });

  it("should store data in localStorage", () => {
    const weatherData: WeatherApiResponse = {
      WeatherText: "Cloudy",
      Temperature: {
        Metric: { Value: 25, Unit: "C", UnitType: 1 },
        Imperial: { Value: 77, Unit: "F", UnitType: 1 },
      },
      WeatherIcon: 2,
      LocalObservationDateTime: "2025-04-09T12:00:00",
      EpochTime: 1617900000,
      HasPrecipitation: false,
      PrecipitationType: "",
      IsDayTime: true,
    };

    setWeatherCache("Kyiv", weatherData);

    expect(mockLocalStorage.getItem("Kyiv")).toContain(
      '"WeatherText":"Cloudy"'
    );
  });
});
