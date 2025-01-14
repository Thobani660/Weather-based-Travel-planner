// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SearchBar from "./components/SearchBar";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";



const App = () => {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
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
