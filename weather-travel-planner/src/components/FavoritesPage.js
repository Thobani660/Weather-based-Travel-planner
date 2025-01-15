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
              {/* <p>Temperature: {fav.}</p> */}
              <p>Description: {fav.weather.description}</p>
              <p>Wind: {fav.wind.speed}</p>
              <p>Degrees: {fav.wind.deg}</p>
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
