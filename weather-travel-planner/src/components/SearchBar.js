// src/components/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", margin: "20px" }}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", flex: 1 }}
      />
      <button onClick={handleSearch} style={{ padding: "10px", fontSize: "16px" }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
