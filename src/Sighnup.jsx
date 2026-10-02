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

const Sighnup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAccount = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please complete all fields before creating your account.');
      return;
    }

    const email = form.email.trim().toLowerCase();
    const name = form.name.trim();
    const users = getSavedUsers();

    if (users.some((user) => user.email.toLowerCase() === email && user.name.toLowerCase() === name.toLowerCase())) {
      setError('This account already exists. Please sign in.');
      return;
    }

    const newUser = { name, email, password: form.password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name, email }));
    setError('');
    navigate('/main');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #f53e1d, #1a63c4,  #4ba70d)', padding: '20px' }}>
      <div style={{ width: '200%', maxWidth: '370px', background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', borderRadius:'10px', marginBottom: '16px' }}>Sign Up</h1>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Name"
          style={{  width: '95%', padding: '10px',  borderRadius:'10px',marginBottom: '10px' }}
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
          style={{ width: '95%', padding: '10px', borderRadius:'10px', marginBottom: '10px' }}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <input type="checkbox" />
          I read and agree to Terms & Conditions
        </label>
        {error && <p style={{ color: 'red', marginTop: 0 }}>{error}</p>}
        <button onClick={handleCreateAccount} style={{  width: '95%', padding: '12px', backgroundColor: 'blue', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          CREATE ACCOUNT
        </button>
        <p style={{ marginTop: '12px', textAlign: 'center' }}>
          Already have an account?
          <Link to="/signin" style={{ marginLeft: '6px', color: 'blue' }}>LOGIN</Link>
        </p>
      </div>
    </div>
  );
};

export default Sighnup;