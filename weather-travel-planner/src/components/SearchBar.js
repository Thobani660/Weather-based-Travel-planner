import React, { useState } from "react";
import axios from "axios";

const activitiesByWeather = {
  Clear: ["Go for a walk", "Have a picnic", "Stargazing"],
  Clouds: ["Visit a museum", "Read a book", "Go to a café"],
  Rain: ["Watch a movie", "Play indoor games", "Do some cooking"],
  Snow: ["Build a snowman", "Go skiing", "Have hot cocoa"],
  Thunderstorm: ["Stay indoors", "Watch lightning from a safe spot", "Catch up on shows"],
  Drizzle: ["Take a short walk with an umbrella", "Visit a nearby café"],
  Mist: ["Go for a relaxing walk", "Take photos of the misty scenery"],
};

const SearchBar = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [favorites, setFavorites] = useState([]);

  const searchLocation = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0d60273acd621b755f1317978b6f426a`;
    try {
      const response = await axios.get(url);
      setData(response.data);
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

  const addFavorite = () => {
    if (data.name && !favorites.some((fav) => fav.name === data.name)) {
      setFavorites([...favorites, data]);
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
            {data.main
              ? `${Math.round(data.main.temp - 273.15)}°C`
              : "N/A"}
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
        <button
          onClick={addFavorite}
          style={{
            marginTop: "20px",
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

      {/* Favorite Locations */}
      <div style={{ marginTop: "40px", textAlign: "left", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ fontSize: "28px", marginBottom: "20px" }}>Favorite Locations</h3>
        {favorites.map((fav, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4 style={{ fontSize: "20px", margin: "0" }}>{fav.name}</h4>
            <p style={{ fontSize: "16px", margin: "5px 0" }}>
              {fav.weather ? fav.weather[0].description : "N/A"}
            </p>
            <p style={{ fontSize: "16px", margin: "5px 0" }}>
              Activities: {activitiesByWeather[fav.weather[0]?.main]?.join(", ") || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
