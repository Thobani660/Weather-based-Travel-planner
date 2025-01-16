import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const styles = {
    container: {
      textAlign: "center",
      padding: "50px 20px",
      backgroundImage: 'url("../../res/Weather-Proof-Your-Travel-Plans-featured.webp")', // Replace with your image URL
      backgroundSize: 'cover', // Ensures the image covers the entire container
      backgroundPosition: 'center', // Centers the image
      backgroundRepeat: 'no-repeat',
      height: '100vh', // Ensures the background covers the entire viewport height
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff', // Ensure text is readable
      backgroundAttachment: 'fixed', // Adds a nice effect to background when scrolling
    },
    heading: {
      fontSize: "3rem",
      color: "#fff",
      fontWeight: "700",
      marginBottom: "20px",
      backgroundColor: "rgba(0, 0, 0, 0.151)", // Semi-transparent background for better readability
      width: "80%",
      maxWidth: "600px",
      padding: "20px",
      borderRadius: "10px",
      marginTop:"-750px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Adds text shadow for better readability
    },
    subHeading: {
      fontSize: "1.5rem",
      color: "black",
      marginBottom: "30px",
      maxWidth: "700px",
      margin: "0 auto", // Centers the subheading
      fontStyle: "italic",
      backgroundColor: "rgba(0, 0, 0, 0.151)",
      padding: "10px",
      borderRadius: "8px",
    },
    linksContainer: {
      marginTop: "40px",
      display: 'flex',
      justifyContent: 'center',
      gap: '20px', // Space between links
      marginBottom:"-550px",
    },
    link: {
      fontSize: "18px",
      color: "#fff",
      padding: "15px 30px",
      textDecoration: "none",
      borderRadius: "30px",
      backgroundColor: "#4CAF50",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease, background-color 0.3s ease",
      fontWeight: '600',
    },
    linkHover: {
      backgroundColor: "#45a049",
      transform: "scale(1.05)",
    },
    footer: {
      marginTop: "auto", // Ensures the footer sticks to the bottom of the page
      fontSize: "14px",
      color: "#fff",
      height:"300px",
      backgroundColor: '#003366', // Footer background color
      padding: '20px 0',
      textAlign: 'center',
      width: '100%', // Full width
      position: 'relative', // To ensure it spans the full width
      marginTop:"-200px"
    },
    footerText: {
      fontSize: "1rem",
      fontStyle: "italic",
      color: "#ddd",
    },
  };

  return (
   <>
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
    </div>

    <div style={styles.footer}>
      <p style={styles.footerText}>&copy; 2025-Thobani Zondi ft Thobeka Bovana Weather-Based Travel Planner. All rights reserved.</p>
    </div>
   </>
  );
};

export default HomePage;
