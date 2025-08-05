import type { ForecastData } from "../types/weather";
import { formatTemperature, formatDate, formatTime, getWeatherIcon } from "../lib/utils";

interface ForecastCardProps {
	forecast: ForecastData;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
	const dailyForecasts = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5);

	return (
		<div className="forecast-card">
			<h3 className="forecast-title">5-Day Forecast</h3>
			<div className="forecast-list">
				{dailyForecasts.map((item) => (
					<div key={item.dt} className="forecast-item">
						<div className="forecast-date">{formatDate(item.dt)}</div>
						<img
							src={getWeatherIcon(item.weather[0].icon)}
							alt={item.weather[0].description}
							className="forecast-icon"
						/>
						<div className="forecast-temps">
							<span className="temp-high">{formatTemperature(item.main.temp_max)}</span>
							<span className="temp-low">{formatTemperature(item.main.temp_min)}</span>
						</div>
						<div className="forecast-description">{item.weather[0].main}</div>
						<div className="forecast-details">
							<span>💧 {item.main.humidity}%</span>
							<span>🌬️ {item.wind.speed} m/s</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}