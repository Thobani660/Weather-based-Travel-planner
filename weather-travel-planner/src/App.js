import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Register from "./pages/signUp";
import SearchBar from "./components/SearchBar";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import FavoritesPage from "./components/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import TodoList from './pages/AddToDo';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<Register />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddToDo"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        />

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
