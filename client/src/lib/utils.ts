import { useEffect, useState } from "react";

export function formatTemperature(temp: number, unit: "C" | "F" = "C"): string {
	if (unit === "F") {
		return `${Math.round((temp * 9) / 5 + 32)}°F`;
	}
	return `${Math.round(temp)}°C`;
}

export function formatDate(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
	});
}

export function formatTime(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function getWeatherIcon(iconCode: string): string {
	return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function getWindDirection(degrees: number): string {
	const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	const index = Math.round(degrees / 45) % 8;
	return directions[index];
}

export function useDebounce(value: string, delay: number = 500) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
