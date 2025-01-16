import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // Import Firebase authentication
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/SignIn"); // Redirect to the dashboard if already logged in
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Attempt to sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/searchbar"); // Redirect after successful sign-in
    } catch (err) {
      // Handle errors and display a user-friendly message
      setError("Failed to sign in. Please check your email and password.");
      console.error("SignIn Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#003366b2",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "32px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: "center",
            color: "#2563eb",
          }}
        >
          Sign In
        </h1>
        <form onSubmit={handleSignIn}>
          {/* Email Input */}
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#374151",
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                outline: "none",
                fontSize: "16px",
              }}
            />
          </div>
          {/* Password Input */}
          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#374151",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                outline: "none",
                fontSize: "16px",
              }}
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "#93c8e8" : "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "4px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {/* Register Redirect */}
          <p style={{ marginTop: "16px", textAlign: "center" }}>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signUp")}
              style={{
                color: "#2563eb",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Register here
            </button>
          </p>
          {/* Error Message */}
          {error && (
            <p
              style={{
                color: "#ef4444",
                marginTop: "16px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
