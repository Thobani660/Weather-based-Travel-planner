import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom'; 
import FavoritesPage from '../components/FavoritesPage';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';

const ProfileUser = () => {
  const [profileData, setProfileData] = useState(null);
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updates, setUpdates] = useState({});
  const userId = auth.currentUser?.uid;
  const [activeTab, setActiveTab] = useState('favourites');
  const [selectedDates, setSelectedDates] = useState([]); 
  const [showTodoList, setShowTodoList] = useState(false);
  const [needsList, setNeedsList] = useState([]); 
  const [wantsList, setWantsList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        const profileDocRef = doc(db, 'Users', userId);
        const profileSnap = await getDoc(profileDocRef);

        if (profileSnap.exists()) {
          setProfileData(profileSnap.data()); 
        } else {
          console.log('No profile data found for this user');
          setProfileData(null); 
        }
      } else {
        console.log('User is not authenticated');
        setProfileData(null); 
      }
    };

    fetchProfile();
  }, [userId]);

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

  // Log off function
  const handleLogOff = async () => {
    try {
      await auth.signOut(); 
      navigate('/'); 
    } catch (error) {
      console.error('Error logging off:', error);
    }
  };

  // Handle adding new to-do items
  const handleAddItem = (type, item) => {
    if (item.trim()) {
      if (type === 'needs') {
        setNeedsList([...needsList, item]);
      } else {
        setWantsList([...wantsList, item]);
      }
    }
  };

  // Handle deleting a to-do item
  const handleDeleteItem = (type, index) => {
    if (type === 'needs') {
      setNeedsList(needsList.filter((_, i) => i !== index));
    } else {
      setWantsList(wantsList.filter((_, i) => i !== index));
    }
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

  // Handle the date selection
  const handleDateChange = (dates) => {
    setSelectedDates(dates); 
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'calendar') {
      setSelectedDates([]); 
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '70px',
        backgroundColor:"#003366b2"
      }}
    >
      {/* Profile Image */}
      <div
        style={{
          position: 'relative',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #3b82f6',
            backgroundColor: 'white',
          }}
        >
          {image ? (
            <img
              src={image}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#6b7280',
              }}
            >
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

      {/* Edit and Log Off Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
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

        <button
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onClick={handleLogOff}
        >
          Log Off
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

      {/* Tabs Section */}
      <main
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <button
          style={{
            ...buttonStyle,
            ...activeTab === 'favourites' ? activeButtonStyle : inactiveButtonStyle,
          }}
          onClick={() => handleTabChange('favourites')}
        >
          Favourites
        </button>
        <button
          style={{
            ...buttonStyle,
            ...activeTab === 'needs' ? activeButtonStyle : inactiveButtonStyle,
          }}
          onClick={() => handleTabChange('needs')}
        >
          Needs & Wants
        </button>
        <button
          style={{
            ...buttonStyle,
            ...activeTab === 'calendar' ? activeButtonStyle : inactiveButtonStyle,
          }}
          onClick={() => handleTabChange('calendar')}
        >
          Calendar
        </button>
      </main>

      {/* Tab Content */}
      {activeTab === 'favourites' && <FavoritesPage />}
      {activeTab === 'needs' && (
        <div>
          <h3>My Needs</h3>
          {/* Needs List */}
          <div>
            {needsList.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '8px' }}>
                <span>{item}</span>
                <button onClick={() => handleDeleteItem('needs', index)}>Delete</button>
              </div>
            ))}
          </div>
          {/* Add Need */}
          <input
            type="text"
            placeholder="Add a new need"
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem('needs', e.target.value)}
          />
          <h3>My Wants</h3>
          {/* Wants List */}
          <div>
            {wantsList.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '8px' }}>
                <span>{item}</span>
                <button onClick={() => handleDeleteItem('wants', index)}>Delete</button>
              </div>
            ))}
          </div>
          {/* Add Want */}
          <input
            type="text"
            placeholder="Add a new want"
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem('wants', e.target.value)}
          />
        </div>
      )}

      {activeTab === 'calendar' && (
        <div>
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileUser;
