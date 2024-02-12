// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });
      console.log(response.data);
      setMessage('Login successful');
      history.push('/order');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>New user? <Link to="/signup">Sign up</Link> here</p> {/* Link to signup page */}
    </div>
  );
};

export default Login;
