import { useCallback, useEffect, useState } from "react";
import { getCurrentWeather, getForecast } from "../lib/api.ts";
import type { ForecastData, WeatherData } from "../types/weather";

interface UseWeatherResult {
	weather: WeatherData | null;
	forecast: ForecastData | null;
	loading: boolean;
	error: {
		weatherData?: string;
		forecastData?: string;
	} | null;
	refetch: () => void;
}

export function useWeather(city: string): UseWeatherResult {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [forecast, setForecast] = useState<ForecastData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<{
		weatherData?: string;
		forecastData?: string;
	} | null>(null);

	const fetchWeatherData = useCallback(async () => {
		if (!city) return;

		setLoading(true);
		setError(null);

		try {
			const weatherData = await getCurrentWeather(city);
			setWeather(weatherData);
		} catch (err) {
			setError({
				weatherData:
					err instanceof Error ? err.message : "Failed to fetch weather data",
			});
			setWeather(null);
			setForecast(null);
		} finally {
			setLoading(false);
		}

		try {
			const forecastData = await getForecast(city);
			setForecast(forecastData);
		} catch (err) {
			setError({
				forecastData:
					err instanceof Error ? err.message : "Failed to fetch weather data",
			});
			setWeather(null);
			setForecast(null);
		} finally {
			setLoading(false);
		}
	}, [city]);

	useEffect(() => {
		fetchWeatherData();
	}, [fetchWeatherData]);

	return { weather, forecast, loading, error, refetch: fetchWeatherData };
}
