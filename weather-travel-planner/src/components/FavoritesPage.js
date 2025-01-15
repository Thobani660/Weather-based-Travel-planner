import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Function to fetch favorites from Firestore
    const fetchFavorites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'favorites'));
        const fetchedFavorites = querySnapshot.docs.map(doc => doc.data());
        setFavorites(fetchedFavorites); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((fav, index) => (
            <li key={index}>
              <p>Name: {fav.name}</p>
              <p>Description: {fav.description}</p> {/* Adjust fields as per your data */}
              {/* Add more fields as needed */}
            </li>
          ))
        ) : (
          <p>No favorites added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default FavoritesPage;
