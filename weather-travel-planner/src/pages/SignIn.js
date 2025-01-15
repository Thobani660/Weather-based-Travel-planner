import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/signin"); // Redirect to searchbar if already logged in
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/signin"); // Redirect to search bar page
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
    }
  };


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "600px", padding: "32px", backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", marginTop: "20px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign: "center", color: "#93c8e8" }}>Sign In</h1>

        <form onSubmit={handleSignIn}>
          {/* Email Field */}
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="email" style={{ display: "block", color: "#4B5563", fontWeight: "bold", marginBottom: "8px" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                color: "#4B5563",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="password" style={{ display: "block", color: "#4B5563", fontWeight: "bold", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                color: "#4B5563",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: "#93c8e8",
              color: "#fff",
              fontWeight: "bold",
              padding: "12px 16px",
              borderRadius: "4px",
              width: "100%",
              cursor: "pointer",
              border: "none",
            }}
          >
            Sign In
          </button>

          <p style={{ marginTop: "16px", textAlign: "center" }}>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/SignUp")}
              style={{ color: "#3b82f6", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
            >
              Register here
            </button>
          </p>

          {error && <p style={{ color: "#ef4444", marginTop: "16px", textAlign: "center" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
