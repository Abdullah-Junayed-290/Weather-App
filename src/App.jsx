import { useState } from "react";
import "./App.css";

const API_KEY = env.WEATHER_API_KEY;

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchWeather = async () => {
        if (!city) {
            setLoading(true);
            setError("");
            setWeather(null);
        }

        try {
            setLoading(true);
            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
            );
            const data = await res.json();
            setWeather(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="WeatherHome">
            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Enter city"
                className="cityName"
            />
            <button className="search" onClick={fetchWeather}>
                Search
            </button>

            {loading && <p className="loading">Loading...</p>}

            {error && <p className="error">{error}</p>}

            {weather && weather.current && (
                <div className="weatherDetails">
                    <h2>
                        {weather.location.name}, {weather.location.country}
                    </h2>

                    <p>🌡 Temp: {weather.current.temp_c} °C</p>

                    <p>💧 Humidity: {weather.current.humidity}</p>

                    <p>💨 Wind: {weather.current.wind_kph} kph</p>

                    <p>🌥 Condition: {weather.current.condition.text}</p>

                    <img
                        src={weather.current.condition.icon}
                        alt="Weather Icon"
                    />
                </div>
            )}
        </div>
    );
}

export default App;
