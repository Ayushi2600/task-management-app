import React, { useState } from 'react';
import "../App.css"

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      alert('Invalid username or password. Write your correct details.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='container p-5 w-50'>
      <h2 className='text-center'>Login</h2>
      <input className='w-100 py-2 mt-5' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input className='w-100 py-2 mt-5' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className='btn btn-dark mt-5' type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
