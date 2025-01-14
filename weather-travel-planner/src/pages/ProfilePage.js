import React, { useState } from "react";
import { auth } from "../firebase"; // Ensure you have firebase setup and exported properly

const ProfilePage = () => {
  const [user, setUser] = useState(auth.currentUser); // Get the current user from Firebase Auth
  const [image, setImage] = useState(null); // Store the image uploaded by the user
  const [imageUrl, setImageUrl] = useState(user.photoURL || null); // Default to user's current photo if available

  // Handle file input change (image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set image URL to display the image
      };
      reader.readAsDataURL(file); // Convert file to a data URL
      setImage(file); // Set the image file
    }
  };

  // Handle form submission to update profile picture
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      // Handle updating the photo URL in Firebase Auth (upload to Firebase Storage if needed)
      try {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`profilePictures/${user.uid}`);
        await imageRef.put(image); // Upload the image
        const photoURL = await imageRef.getDownloadURL(); // Get the download URL of the uploaded image

        await user.updateProfile({ photoURL }); // Update the profile picture in Firebase Auth
        alert("Profile picture updated!");
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Failed to upload image.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", maxWidth: "600px", margin: "auto" }}>
      <h1>User Profile</h1>

      {/* Display User's Email */}
      <h2>{user.email}</h2>

      {/* Display Profile Picture */}
      <div style={{ marginBottom: "20px" }}>
        <img
          src={imageUrl || "https://via.placeholder.com/150"} // Placeholder if no image
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
        />
      </div>

      {/* File Input for Uploading Profile Picture */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "10px" }}
        />
      </div>

      {/* Button to Save the Image */}
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Update Profile Picture
      </button>
    </div>
  );
};

export default ProfilePage;
