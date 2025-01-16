import React, { useState } from 'react';

const TodoList = () => {
  const [task, setTask] = useState(''); 
  const [todos, setTodos] = useState([]);
  const handleTaskChange = (event) => {
    setTask(event.target.value); 
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (task) {
      setTodos([...todos, task]);
      setTask(''); 
    }
  };

  const handleDeleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index); 
    setTodos(newTodos);
  };


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>To-Do List</h2>
      
      {/* Form to add tasks */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input
          type="text"
          value={task}
          onChange={handleTaskChange}
          placeholder="Enter your task"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '100%',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            backgroundColor: '#4f46e5',
            color: 'white',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Task
        </button>
      </form>

      {/* To-Do List */}
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              margin: '8px 0',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <span style={{ fontSize: '16px' }}>{todo}</span>
            <button
              onClick={() => handleDeleteTask(index)}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '4px 12px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const WeatherApp = () => {
  return (
    <div>
      <h1>Weather App</h1>

      {/* To-Do List component */}
      <TodoList />
    </div>
  );
};

export default WeatherApp;
