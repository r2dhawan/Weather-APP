import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${city}&key=fb6f0066347143b6b3e9299bbd940c64`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data.data[0]); // Update to access the weather data correctly
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="cityInput"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.city_name}</h2> {/* Updated to access city_name */}
          <p>Temperature: {weatherData.temp}°C</p> {/* Updated to access temp */}
          <p>Humidity: {weatherData.rh}%</p> {/* Updated to access rh */}
          <p>Weather: {weatherData.weather.description}</p> {/* Updated to access weather description */}
        </div>
      )}
    </div>
  );
}

export default App;
