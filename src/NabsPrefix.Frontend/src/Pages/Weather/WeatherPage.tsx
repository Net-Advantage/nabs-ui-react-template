import { Cards, Panel } from "@net-advantage/nabs-ui-shell";
import { useEffect, useMemo, useState } from "react";
import { WeatherPageViewModel } from "./WeatherPage.view-model";
import type { WeatherForecastModel } from "./WeatherPage.view-model";

const weatherPageViewModel = new WeatherPageViewModel();

export function WeatherPage() {
  const [model, setModel] = useState<WeatherForecastModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    weatherPageViewModel
      .loadWeather()
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setModel(data);
      })
      .catch((err: unknown) => {
        if (!isMounted) {
          return;
        }

        if (err instanceof Error) {
          setError(err.message);
          return;
        }

        setError("Unable to load weather data.");
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = useMemo(
    () =>
      model.map((forecast) => ({
        id: forecast.id,
        header: new Date(forecast.date).toLocaleDateString(),
        content: (
          <ul>
            <li>Summary: {forecast.summary}</li>
            <li>Temp C: {forecast.temperatureC}°C</li>
            <li>Temp F: {forecast.temperatureF}°F</li>
          </ul>
        ),
        actions: "From /api/weather",
      })),
    [model],
  );

  return (
    <Panel header="Weather">
      <p>{weatherPageViewModel.topicPrompt}</p>
      {isLoading && <p>Loading weather forecast...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <Cards aria-label="Weather forecast card list" columns={2} layout="N" items={cards} />
      )}
    </Panel>
  );
}
