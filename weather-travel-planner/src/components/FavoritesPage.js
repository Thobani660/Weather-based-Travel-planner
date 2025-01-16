import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from 'firebase/firestore';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [todos, setTodos] = useState({});
  const [formVisibility, setFormVisibility] = useState({});
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState({});

  // Weather-based activity suggestions
  const weatherActivities = {
    sunny: ['Go for a walk', 'Visit a park', 'Go for a bike ride', 'Outdoor picnic'],
    rainy: ['Watch a movie', 'Visit a museum', 'Indoor games', 'Read a book'],
    cloudy: ['Go for a walk', 'Photography', 'Explore a cafe'],
    snowy: ['Skiing', 'Build a snowman', 'Go snowboarding', 'Ice skating'],
    windy: ['Fly a kite', 'Go sailing', 'Take a scenic drive'],
    stormy: ['Stay indoors', 'Watch the storm', 'Read or listen to music'],
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'favorites'));
        const fetchedFavorites = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(fetchedFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const fetchTodos = async (favoriteId) => {
    try {
      const q = query(collection(db, 'todos'), where('favoriteId', '==', favoriteId));
      const querySnapshot = await getDocs(q);
      const fetchedTodos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos((prev) => ({
        ...prev,
        [favoriteId]: fetchedTodos,
      }));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTask = async (favoriteId) => {
    if (!newTask.trim()) return;

    try {
      // Save task to Firebase
      await addDoc(collection(db, 'todos'), {
        favoriteId,
        task: newTask,
      });

      // Clear input after adding task
      setNewTask('');

      // Fetch updated todos list
      fetchTodos(favoriteId);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (favoriteId, taskId, newTaskValue) => {
    try {
      const taskRef = doc(db, 'todos', taskId);
      await updateDoc(taskRef, { task: newTaskValue });

      fetchTodos(favoriteId);
      setEditTask({});
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (favoriteId, taskId) => {
    try {
      const taskRef = doc(db, 'todos', taskId);
      await deleteDoc(taskRef);

      fetchTodos(favoriteId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      const favoriteRef = doc(db, 'favorites', favoriteId);
      await deleteDoc(favoriteRef);
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== favoriteId));
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  const toggleFormVisibility = (favoriteId, visible) => {
    setFormVisibility((prev) => ({
      ...prev,
      [favoriteId]: visible,
    }));
  };

  const getActivitiesForWeather = (weather) => {
    // Return a list of activities based on the weather condition
    return weatherActivities[weather] || [];
  };

  return (
    <div style={{ position: 'relative', padding: '20px', marginTop: '50px', backgroundColor: '#003366b2' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Favorites</h2>
      {favorites.length > 0 ? (
        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {favorites.map((fav) => (
            <li
              key={fav.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '15px',
                border: '1px solid #ccc',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h4>{fav.name}</h4>
                  <p>Weather: {fav.weather?.[0]?.description || 'N/A'}</p>
                  <p>
                    Wind: {fav.wind?.speed || 'N/A'} m/s, {fav.wind?.deg || 'N/A'}°
                  </p>
                  <div>
                    <h5>Possible Activities:</h5>
                    <ul style={{ paddingLeft: '20px' }}>
                      {getActivitiesForWeather(fav.weather?.[0]?.main.toLowerCase()).map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h5>Activities List:</h5>
                  <div style={{ marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="Add a task"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      style={{
                        padding: '10px',
                        marginRight: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                      }}
                    />
                    <button
                      onClick={() => handleAddTask(fav.id)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        backgroundColor: '#0072ff',
                        color: 'white',
                        border: 'none',
                      }}
                    >
                      Add ToDos
                    </button>
                  </div>

                  <ul>
                    {(todos[fav.id] || []).map((todo) => (
                      <li key={todo.id} style={{ marginBottom: '10px' }}>
                        {editTask.id === todo.id ? (
                          <input
                            type="text"
                            value={editTask.value}
                            onChange={(e) =>
                              setEditTask({ id: todo.id, value: e.target.value })
                            }
                            style={{
                              padding: '5px',
                              marginRight: '5px',
                            }}
                          />
                        ) : (
                          todo.task
                        )}
                        {editTask.id === todo.id ? (
                          <button
                            onClick={() =>
                              handleEditTask(fav.id, todo.id, editTask.value)
                            }
                            style={{
                              marginLeft: '5px',
                              backgroundColor: '#28a745',
                              color: 'white',
                              padding: '5px 10px',
                              border: 'none',
                              borderRadius: '5px',
                            }}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setEditTask({ id: todo.id, value: todo.task })
                            }
                            style={{
                              marginLeft: '5px',
                              backgroundColor: '#ffc107',
                              color: 'white',
                              padding: '5px 10px',
                              border: 'none',
                              borderRadius: '5px',
                            }}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTask(fav.id, todo.id)}
                          style={{
                            marginLeft: '5px',
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '5px',
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleDeleteFavorite(fav.id)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  marginTop: '10px',
                }}
              >
                Delete Favorite
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center' }}>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
