import { describe, expect, test, vi } from "vitest";
import { WeatherPageViewModel } from "../../src/Pages/Weather/WeatherPage.view-model";

describe("WeatherPageViewModel", () => {
  test("provides a default topic prompt", () => {
    const viewModel = new WeatherPageViewModel();

    expect(viewModel.topicPrompt).toContain("weather");
  });

  test("loads and maps weather data from the API", async () => {
    const viewModel = new WeatherPageViewModel();

    const fetcher = vi.fn(async () =>
      ({
        ok: true,
        status: 200,
        json: async () => [
          {
            date: "2026-08-01",
            temperatureC: 22,
            temperatureF: 71,
            summary: "Mild",
          },
          {
            date: "2026-08-02",
            temperatureC: 25,
            temperatureF: 77,
            summary: null,
          },
        ],
      }) as Response,
    );

    const model = await viewModel.loadWeather(fetcher as typeof fetch);

    expect(fetcher).toHaveBeenCalledWith("/api/weather");
    expect(model).toHaveLength(2);
    expect(model[0].id).toBe("forecast-1");
    expect(model[0].summary).toBe("Mild");
    expect(model[1].summary).toBe("Unknown");
    expect(viewModel.weatherModel).toHaveLength(2);
  });

  test("throws when API response is not successful", async () => {
    const viewModel = new WeatherPageViewModel();

    const fetcher = vi.fn(async () =>
      ({
        ok: false,
        status: 500,
        json: async () => [],
      }) as Response,
    );

    await expect(viewModel.loadWeather(fetcher as typeof fetch)).rejects.toThrow(
      "Weather API request failed with status 500.",
    );
  });
});
