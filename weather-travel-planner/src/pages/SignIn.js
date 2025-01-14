// src/pages/SignIn.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Sign-In Successful!");
      navigate("/"); // Redirect to HomePage after sign-in
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", margin: "5px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", margin: "5px" }}
      />
      <button onClick={handleSignIn} style={{ padding: "10px", margin: "5px" }}>
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
