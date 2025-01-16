import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        name,
        surname,
        email,
        uid: user.uid, 
      };

      
      await setDoc(doc(db, "users", user.uid), userData);

     
      navigate("/signIn");
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#003366b2" }}>
      <div style={{ maxWidth: "600px", padding: "32px", backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", marginTop: "20px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign: "center", color: "#93c8e8" }}>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="name" style={{ display: "block", color: "#4B5563", fontWeight: "bold", marginBottom: "8px" }}>
              Name
            </label>
            <input
              type="text"
              id="name"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Surname Field */}
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="surname" style={{ display: "block", color: "#4B5563", fontWeight: "bold", marginBottom: "8px" }}>
              Surname
            </label>
            <input
              type="text"
              id="surname"
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
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

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
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <p style={{ marginTop: "16px", textAlign: "center" }}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signIn")}
              style={{ color: "#3b82f6", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
            >
              Click here
            </button>
          </p>

          {error && <p style={{ color: "#ef4444", marginTop: "16px", textAlign: "center" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
