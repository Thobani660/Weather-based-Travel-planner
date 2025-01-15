import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
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
      // Firebase Authentication for user sign-up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // After Firebase sign-up, store additional user information in Firestore
      const userData = {
        name,
        surname,
        email,
        uid: user.uid, // Firebase user ID
      };

      // Save user info to Firebase Firestore
      await setDoc(doc(db, "users", user.uid), userData);

      // Optionally, you can still use your backend API to store this data in a separate database
      // await axios.post("http://localhost:3000/api/register", userData);

      // Redirect the user to the login page after successful registration
      navigate("/SignIn");
    } catch (err) {
      setError(err.message); // Display Firebase authentication error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="container max-w-md p-8 bg-white shadow-md rounded-lg mt-20 mb-20">
        <h1 className="text-3xl font-bold mb-4 text-center text-pink-500">Sign Up</h1>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name 
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

            {/* Surname */}
            <div className="mb-4">
            <label htmlFor="surname" className="block text-gray-700 font-bold mb-2">
             Surname
            </label>
            <input
              type="text"
              id="surname"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/logIn")}
              className="text-blue-600 underline"
            >
              Click here
            </button>
          </p>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}


