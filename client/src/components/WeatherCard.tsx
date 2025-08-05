import type { WeatherData } from "../types/weather";
import { formatTemperature, formatTime, getWeatherIcon, getWindDirection } from "../lib/utils";

interface WeatherCardProps {
	weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
	return (
		<div className="weather-card">
			<div className="weather-header">
				<h2 className="city-name">
					{weather.name}, {weather.sys.country}
				</h2>
				<p className="weather-description">{weather.weather[0].description}</p>
			</div>

			<div className="weather-main">
				<div className="temperature-section">
					<img
						src={getWeatherIcon(weather.weather[0].icon)}
						alt={weather.weather[0].description}
						className="weather-icon"
					/>
					<div className="temperature-display">
						<span className="temperature">{formatTemperature(weather.main.temp)}</span>
						<span className="feels-like">Feels like {formatTemperature(weather.main.feels_like)}</span>
					</div>
				</div>

				<div className="weather-details">
					<div className="detail-item">
						<span className="detail-label">High / Low</span>
						<span className="detail-value">
							{formatTemperature(weather.main.temp_max)} / {formatTemperature(weather.main.temp_min)}
						</span>
					</div>
					<div className="detail-item">
						<span className="detail-label">Humidity</span>
						<span className="detail-value">{weather.main.humidity}%</span>
					</div>
					<div className="detail-item">
						<span className="detail-label">Wind</span>
						<span className="detail-value">
							{weather.wind.speed} m/s {getWindDirection(weather.wind.deg)}
						</span>
					</div>
					<div className="detail-item">
						<span className="detail-label">Pressure</span>
						<span className="detail-value">{weather.main.pressure} hPa</span>
					</div>
					<div className="detail-item">
						<span className="detail-label">Sunrise</span>
						<span className="detail-value">{formatTime(weather.sys.sunrise)}</span>
					</div>
					<div className="detail-item">
						<span className="detail-label">Sunset</span>
						<span className="detail-value">{formatTime(weather.sys.sunset)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}