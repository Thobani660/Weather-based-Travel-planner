import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const SearchBar = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Fetch weather data by city name or coordinates
  const fetchWeather = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Get weather by city name
  const searchLocation = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0d60273acd621b755f1317978b6f426a`;
    fetchWeather(url);
  };

  // Get weather by coordinates
  const getWeatherByCoordinates = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0d60273acd621b755f1317978b6f426a`;
    fetchWeather(url);
  };

  // Handle user input
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchLocation(location);
      setLocation("");
    }
  };

  // Fetch user's current location weather on mount
  useEffect(() => {
    const fetchCurrentLocationWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setData({ name: "Location access denied", main: {}, weather: [] });
          }
        );
      } else {
        console.error("Geolocation not supported by this browser.");
      }
    };

    fetchCurrentLocationWeather();
  }, []);

  const addFavorite = async () => {
    try {
      if (data.name && !favorites.some((fav) => fav.name === data.name)) {
        // Add to local state
        setFavorites([...favorites, data]);

        // Save to Firestore
        const favoritesRef = collection(db, "favorites");
        await addDoc(favoritesRef, data);

        console.log("Favorite added to Firestore!");
      }
    } catch (error) {
      console.error("Error adding favorite to Firestore:", error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        background: "linear-gradient(135deg, #00c6ff, #0072ff)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Search Input */}
      <div style={{ marginBottom: "20px", width: "100%", maxWidth: "500px" }}>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter location"
          type="text"
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "30px",
            border: "none",
            outline: "none",
            fontSize: "18px",
            textAlign: "center",
            background: "#fff",
            color: "#333",
          }}
        />
      </div>

      {/* Weather Data Display */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "36px", margin: "10px 0" }}>
            {data.name || "Enter a city"}
          </h2>
          <h1 style={{ fontSize: "60px", margin: "10px 0" }}>
            {data.main ? `${Math.round(data.main.temp - 273.15)}°C` : "N/A"}
          </h1>
          <p style={{ fontSize: "20px", margin: "10px 0" }}>
            {data.weather ? data.weather[0].description : "N/A"}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
            fontSize: "18px",
          }}
        >
          <div>
            <p style={{ fontWeight: "bold", fontSize: "22px" }}>
              {data.main
                ? `${Math.round(data.main.feels_like - 273.15)}°C`
                : "N/A"}
            </p>
            <p>Feels like</p>
          </div>

          <div>
            <p style={{ fontWeight: "bold", fontSize: "22px" }}>
              {data.main ? `${data.main.humidity}%` : "N/A"}
            </p>
            <p>Humidity</p>
          </div>

          <div>
            <p style={{ fontWeight: "bold", fontSize: "22px" }}>
              {data.wind ? `${data.wind.speed} m/s` : "N/A"}
            </p>
            <p>Wind Speed</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "50px" }}>
          <button
            onClick={addFavorite}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#0072ff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Save as Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
