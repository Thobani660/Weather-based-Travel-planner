import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const styles = {
    container: {
      textAlign: "center",
      padding: "50px 20px",
      backgroundImage: 'url("../../res/Weather-Proof-Your-Travel-Plans-featured.webp)', // Replace with your image URL
      backgroundSize: 'cover', // Ensures the image covers the entire container
      backgroundPosition: 'center', // Centers the image
      backgroundRepeate: 'no-repeate',
      height: '100vh', // Makes sure the background covers the entire viewport height
    },
    heading: {
      fontSize: "3rem",
      color: "#4CAF50",
      fontWeight: "700",
      marginBottom: "20px",
      backgroundColor:"transparent",
      width: "550px",
      marginLeft:"385px",
      padding:"20px",
      borderRadius:"20px"
    },
    subHeading: {
      fontSize: "1.5rem",
      color: "#777",
      marginBottom: "30px",
      marginLeft:"35px"
    },
    linksContainer: {
      marginTop: "40px",
    },
    link: {
      fontSize: "18px",
      color: "#fff",
      padding: "10px 25px",
      textDecoration: "none",
      borderRadius: "30px",
      margin: "10px",
      backgroundColor: "#4CAF50",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
    linkHover: {
      backgroundColor: "#45a049",
      transform: "scale(1.05)",
    },
    footer: {
      marginTop: "200px",
      fontSize: "14px",
      color: "yellow",
      backgroundColor: 'black',
      height:'150px',
      width:"1400px"
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Weather-Based Travel Planner</h1>
      <p style={styles.subHeading}>Plan your next adventure with real-time weather insights</p>

      <div style={styles.linksContainer}>
        <Link
          to="/signin"
          style={styles.link}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          style={styles.link}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Sign Up
        </Link>
      </div>

      {/* Add other components like SearchBar, WeatherCard, etc. */}

      <div style={styles.footer}>
        <p>&copy; 2025-Thobani Zondi ft Thobeka Bovana Weather-Based Travel Planner. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;
