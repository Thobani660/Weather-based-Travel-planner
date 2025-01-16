import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: "#003366", // Baby blue color
      padding: "20px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      position: "fixed", // Fix the navbar at the top of the page
      top: "0",
      left: "0",
      width: "100%",
      zIndex: "1000", // Ensure it's on top of other content
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#fff",
      textDecoration: "none",
    },
    menu: {
      display: "flex",
      listStyleType: "none",
      margin:" 0  30px",
      padding: 0,
    },
    menuItem: {
      margin: "0 30px",
    },
    menuLink: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "18px",
      transition: "color 0.3s ease",
    },
    menuLinkHover: {
      color: "#f0c419",
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>🌦️Phila's Weather-based travel Planner</Link>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <Link
            to="/searchbar"
            style={styles.menuLink}
            onMouseOver={(e) => (e.target.style.color = styles.menuLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.menuLink.color)}
          >
            Search
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link
            to="/favorites"
            style={styles.menuLink}
            onMouseOver={(e) => (e.target.style.color = styles.menuLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.menuLink.color)}
          >
            Favorites
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link
            to="/profile"
            style={styles.menuLink}
            onMouseOver={(e) => (e.target.style.color = styles.menuLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.menuLink.color)}
          >
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
