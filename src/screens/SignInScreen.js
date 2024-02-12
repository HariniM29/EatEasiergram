// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/signup', {
        email,
        password,
      });
   
      setMessage('Signup successful');
    } catch (error) {
      console.error('Signup failed:',error.response.data.message);
      
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to login page */}
    </div>
  );
};

export default Signup;
