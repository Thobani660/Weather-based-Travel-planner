import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Import your Firebase setup
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import FavoritesPage from '../components/FavoritesPage';

const ProfileUser = () => {
  const [profileData, setProfileData] = useState(null);
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updates, setUpdates] = useState({});
  const userId = auth.currentUser?.uid; // Get current user's UID
  const [activeTab, setActiveTab] = useState('favourites'); 

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        const profileDocRef = doc(db, 'Users', userId); // Get the user's document from Firestore
        const profileSnap = await getDoc(profileDocRef);

        if (profileSnap.exists()) {
          setProfileData(profileSnap.data()); // Set profile data
        } else {
          console.log('No profile data found for this user');
          setProfileData(null); // In case there's no profile data
        }
      } else {
        console.log('User is not authenticated');
        setProfileData(null); // Handle case where user is not logged in
      }
    };

    fetchProfile();
  }, [userId]);

  // Render loading state while fetching profile data
  if (profileData === null) {
    // return <div>Loading profile...</div>; // Handle the loading state
  }

  // Handle file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle update change
  const handleUpdateChange = (e) => {
    setUpdates({ ...updates, [e.target.name]: e.target.value });
  };

  const buttonStyle = {
    padding: '8px 24px',
    borderRadius: '8px',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  };

  const activeButtonStyle = {
    backgroundColor: '#4f46e5',
    color: 'white',
  };

  const inactiveButtonStyle = {
    backgroundColor: '#e5e7eb',
    color: '#4b5563',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '20px' }}>
      {/* Profile Image */}
      <div style={{ position: 'relative', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #3b82f6', backgroundColor: 'white' }}>
          {image ? (
            <img src={image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#6b7280' }}>
              Upload Image
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <label
          htmlFor="imageUpload"
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Change
        </label>
      </div>

      {/* Profile Name */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {profileData?.name ? (
          <h2>{profileData.name}</h2>
        ) : (
          <h2>Name not available</h2>
        )}
      </div>

      {/* User Email */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p>{profileData?.email || 'Email not available'}</p>
      </div>

      {/* Edit Button */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onClick={() => console.log('Delete functionality here')}
        >
          Delete
        </button>

        <button
          style={{
            backgroundColor: '#4f46e5',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Update'}
        </button>
      </div>

      {/* Editable Fields */}
      {isEditing && (
        <div style={{ textAlign: 'center' }}>
          <input
            type="text"
            name="name"
            placeholder="Update Name"
            onChange={handleUpdateChange}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              marginBottom: '10px',
              width: '100%',
              maxWidth: '300px',
            }}
          />
          <button
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            onClick={() => console.log('Save Changes functionality here')}
          >
            Save Changes
          </button>
        </div>
      )}

      <main style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1200px', width: '100%', padding: '24px' }}>
          {/* Tabs Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <button
              style={{
                ...buttonStyle,
                ...(activeTab === 'favourites' ? activeButtonStyle : inactiveButtonStyle),
              }}
              onClick={() => setActiveTab('favourites')}
            >
              Favourite
            </button>
            <button
              style={{
                ...buttonStyle,
                ...(activeTab === 'bookingHistory' ? activeButtonStyle : inactiveButtonStyle),
              }}
              onClick={() => setActiveTab('bookingHistory')}
            >
              Booking History
            </button>
            <button
              style={{
                ...buttonStyle,
                ...(activeTab === 'booked' ? activeButtonStyle : inactiveButtonStyle),
              }}
              onClick={() => setActiveTab('booked')}
            >
              Booked
            </button>
          </div>

          {/* Content Section */}
          <div
            style={{
              padding: '24px',
              borderRadius: '8px',
              backgroundColor: 'white',
              minHeight: '200px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {activeTab === 'favourites' && (
              <div style={{ width: '100%', maxWidth: '1000px' }}>
                <FavoritesPage />
              </div>
            )}
            {/* {activeTab === 'bookingHistory' && <BookingHistory />} */}
            {/* {activeTab === 'booked' && <Booked />} */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileUser;
