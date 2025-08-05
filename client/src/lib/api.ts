import type { ForecastData, WeatherData } from "../types/weather";

const API_BASE_URL = "/api";

export async function getCurrentWeather(city: string): Promise<WeatherData> {
	const response = await fetch(
		`${API_BASE_URL}/weather/current?location=${encodeURIComponent(city)}`,
	);
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to fetch weather data");
	}
	return response.json();
}

export async function getCurrentWeatherByCoords(
	lat: number,
	lon: number,
): Promise<WeatherData> {
	const response = await fetch(
		`${API_BASE_URL}/weather/current?lat=${lat}&lon=${lon}`,
	);
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to fetch weather data");
	}
	return response.json();
}

export async function getForecast(city: string): Promise<ForecastData> {
	const response = await fetch(
		`${API_BASE_URL}/weather/forecast?city=${encodeURIComponent(city)}`,
	);
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to fetch forecast data");
	}
	return response.json();
}

export async function getForecastByCoords(
	lat: number,
	lon: number,
): Promise<ForecastData> {
	const response = await fetch(
		`${API_BASE_URL}/weather/forecast?lat=${lat}&lon=${lon}`,
	);
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to fetch forecast data");
	}
	return response.json();
}
