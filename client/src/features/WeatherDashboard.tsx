import { useEffect, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { ForecastCard } from "../components/ForecastCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { SearchBar } from "../components/SearchBar";
import { WeatherCard } from "../components/WeatherCard";
import { useWeather } from "../hooks/useWeather";
import "./WeatherDashboard.css";

export function WeatherDashboard() {
	const [city, setCity] = useState("London");
	const { weather, forecast, loading, error, refetch } = useWeather(city);

	useEffect(() => {
		const savedCity = localStorage.getItem("lastCity");
		if (savedCity) {
			setCity(savedCity);
		}
	}, []);

	const handleSearch = (newCity: string) => {
		setCity(newCity);
		localStorage.setItem("lastCity", newCity);
	};

	return (
		<div className="weather-dashboard">
			<header className="dashboard-header">
				<h1 className="dashboard-title">Weather Dashboard</h1>
				<SearchBar onSearch={handleSearch} />
			</header>

			<main className="dashboard-content">
				{loading && <LoadingSpinner />}
				{error &&
					Object.entries(error).map(([key, value]) => (
						<ErrorMessage message={value} onRetry={refetch} key={key} />
					))}

				{weather && <WeatherCard weather={weather} />}
				{forecast && <ForecastCard forecast={forecast} />}
			</main>
		</div>
	);
}
