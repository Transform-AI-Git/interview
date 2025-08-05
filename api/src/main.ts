import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || "demo";
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
	res.json({ message: "Weather API Server" });
});

app.get("/health", (_req: Request, res: Response) => {
	res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.get("/api/cities", async (_req: Request, _res: Response) => {
	// TODO: Implement city search functionality
});

app.get("/api/weather/current", async (req: Request, res: Response) => {
	try {
		const { city, lat, lon } = req.query;

		let url: string;
		if (lat && lon) {
			url = `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
		} else if (city) {
			url = `${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
		} else {
			return res
				.status(400)
				.json({ error: "Please provide either city name or coordinates" });
		}

		const response = await fetch(url);
		const data = await response.json();

		if (!response.ok) {
			return res.status(response.status).json(data);
		}

		res.json(data);
	} catch (error) {
		console.error("Weather API error:", error);
		res.status(500).json({ error: "Failed to fetch weather data" });
	}
});

app.get("/api/weather/forecast", async (req: Request, res: Response) => {
	try {
		const { city, lat, lon } = req.query;

		let url: string;
		if (lat && lon) {
			url = `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&cnt=40`;
		} else if (city) {
			url = `${OPENWEATHER_BASE_URL}/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&cnt=40`;
		} else {
			return res
				.status(400)
				.json({ error: "Please provide either city name or coordinates" });
		}

		const response = await fetch(url);
		const data = await response.json();

		if (!response.ok) {
			return res.status(response.status).json(data);
		}

		res.json(data);
	} catch (error) {
		console.error("Forecast API error:", error);
		res.status(500).json({ error: "Failed to fetch forecast data" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
