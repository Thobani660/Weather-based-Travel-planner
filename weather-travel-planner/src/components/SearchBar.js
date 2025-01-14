// src/components/SearchBar.js
import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const searchLocation = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0d60273acd621b755f1317978b6f426a`;
    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchLocation(location);
      setLocation("");
    }
  };

  return (
    <div className="app">
      {/* Search Input */}
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter location"
          type="text"
        />
      </div>

      {/* Weather Data Display */}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name || "Enter a city"}</p>
          </div>
          <div className="temp">
            <h1>{data.main ? `${Math.round(data.main.temp - 273.15)}°C` : "N/A"}</h1>
          </div>
          <div className="description">
            <p>{data.weather ? data.weather[0].description : "N/A"}</p>
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            <p className="bold">
              {data.main ? `${Math.round(data.main.feels_like - 273.15)}°C` : "N/A"}
            </p>
            <p>Feels like</p>
          </div>

          <div className="humidity">
            <p className="bold">{data.main ? `${data.main.humidity}%` : "N/A"}</p>
            <p>Humidity</p>
          </div>

          <div className="wind">
            <p className="bold">{data.wind ? `${data.wind.speed} m/s` : "N/A"}</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
