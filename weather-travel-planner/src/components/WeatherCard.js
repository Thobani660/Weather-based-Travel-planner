import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const apiKey = '02deab10a7e6c992f803cb27121f0563'; 

  // Function to fetch the weather data
  const fetchWeatherData = async () => {
    try {
      // Fetch coordinates for the input location
      const geoResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
      const { lat, lon } = geoResponse.data.coord;
      setLat(lat);
      setLon(lon);

      // Fetch weather data using the coordinates
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);
    } catch (err) {
      setError(err);
      console.error('Error fetching weather data:', err);
    }
  };

  // Use Effect to fetch weather data when lat/lon changes
  useEffect(() => {
    if (lat && lon) {
      fetchWeatherData();
    }
  }, [lat, lon]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (location) {
      fetchWeatherData(); 
    }
  };

  if (error) {
    return <div style={styles.error}>Error: {error.message}</div>;
  }

  if (!weatherData) {
    return (
      <div style={styles.weatherContainer}>
        <h1 style={styles.title}>Weather-Based Travel Planner</h1>
        <form onSubmit={handleSearch} style={styles.form}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location (e.g., Pietermaritzburg)"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Search</button>
        </form>
        <p style={styles.text}>Enter a location to get the 7-day weather forecast.</p>
      </div>
    );
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div style={styles.weatherContainer}>
      <h1 style={styles.title}>Weather Forecast for {location}</h1>
      <div style={styles.weatherCards}>
        {weatherData.daily.slice(1, 8).map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const dayOfWeek = daysOfWeek[date.getDay()];

          return (
            <div key={index} style={styles.weatherCard}>
              <h2 style={styles.day}>{dayOfWeek}</h2>
              <p style={styles.temp}>Temperature: {forecast.temp.day}°C</p>
              <p style={styles.text}>Weather: {forecast.weather[0].description}</p>
              <p style={styles.text}>Humidity: {forecast.humidity}%</p>
              <p style={styles.text}>Wind Speed: {forecast.wind_speed} m/s</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  weatherContainer: {
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    padding: '8px 12px',
    borderRadius: '5px',
    fontSize: '16px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  text: {
    fontSize: '1rem',
    color: '#333',
  },
  weatherCards: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  weatherCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '200px',
  },
  day: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  temp: {
    fontSize: '1rem',
    marginBottom: '5px',
  },
  error: {
    color: 'red',
    fontSize: '1.2rem',
  },
};

export default Weather;
