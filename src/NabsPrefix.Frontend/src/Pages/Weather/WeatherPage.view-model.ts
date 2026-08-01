export interface WeatherForecastModel {
  id: string;
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface WeatherApiResponseItem {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
}

export class WeatherPageViewModel {
  public readonly topicPrompt = "Live 5-day weather forecast from the Weather API.";

  public weatherModel: WeatherForecastModel[] = [];

  public async loadWeather(fetcher: typeof fetch = fetch): Promise<WeatherForecastModel[]> {
    const response = await fetcher("/api/weather");

    if (!response.ok) {
      throw new Error(`Weather API request failed with status ${response.status}.`);
    }

    const data = (await response.json()) as WeatherApiResponseItem[];

    const model = data.map((item, index) => ({
      id: `forecast-${index + 1}`,
      date: item.date,
      temperatureC: item.temperatureC,
      temperatureF: item.temperatureF,
      summary: item.summary ?? "Unknown",
    }));

    this.weatherModel = model;

    return model;
  }
}
