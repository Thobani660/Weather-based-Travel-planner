// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Register from "./pages/signUp";
import SearchBar from "./components/SearchBar";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import FavoritesPage from "./components/FavoritesPage";
// import ProfilePage from "./pages/ProfilePage";



const App = () => {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<Register />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}

    
        
        <Route
          path="/searchbar"
          element={
            <ProtectedRoute>
              <SearchBar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
