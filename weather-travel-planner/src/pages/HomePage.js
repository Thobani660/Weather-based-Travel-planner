// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Weather-Based Travel Planner</h1>
      <nav>
        <Link to="/signin" style={{ margin: "10px" }}>Sign In</Link>
        <Link to="/signup" style={{ margin: "10px" }}>Sign Up</Link>
      </nav>
      {/* Add other components like SearchBar, WeatherCard, etc. */}
    </div>
  );
};

export default HomePage;
