import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const USERS_KEY = 'mr_light_users';
const CURRENT_USER_KEY = 'mr_light_current_user';

const getSavedUsers = () => {
  try {
    const savedUsers = localStorage.getItem(USERS_KEY);
    return savedUsers ? JSON.parse(savedUsers) : [];
  } catch {
    return [];
  }
};

const Sighnin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    const username = form.username.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    if (!username || !email || !password) {
      setError('Please enter your username, email, and password.');
      return;
    }

    const users = getSavedUsers();
    const existingUser = users.find(
      (user) =>
        user.name.toLowerCase() === username.toLowerCase() && user.email.toLowerCase() === email
    );

    if (!existingUser) {
      setError('Create account first. You are not registered yet.');
      return;
    }

    if (existingUser.password !== password) {
      setError('Incorrect password, email, or username.');
      return;
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name: existingUser.name, email: existingUser.email }));
    setError('');
    navigate('/main');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background:'linear-gradient(135deg, #f53e1d, #1a63c4,  #4ba70d)', padding: '20px' }}>
      <div style={{ width: '200%', maxWidth: '470px', background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>Sign In</h1>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          type="text"
          placeholder="Username"
          style={{ width: '95%', padding: '10px',  borderRadius:'10px',marginBottom: '10px' }}
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="E-mail"
          style={{ width: '95%', padding: '10px', borderRadius:'10px', marginBottom: '10px' }}
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          style={{ width: '95%', padding: '10px',  borderRadius:'10px',marginBottom: '12px' }}
        />
        {error && <p style={{ color: 'red', marginTop: 0 }}>{error}</p>}
        <button onClick={handleLogin} style={{ width: '100%', padding: '12px', backgroundColor: 'blue', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          LOGIN
        </button>
        <p style={{ marginTop: '12px', textAlign: 'center' }}>
          No account yet?
          <Link to="/signup" style={{ marginLeft: '6px',  color: 'blue' }}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Sighnin;

