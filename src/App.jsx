// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import "./index.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
            <button className='btn btn-primary m-3' type='button' onClick={handleLogout}>Logout</button>
            <TaskList />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
