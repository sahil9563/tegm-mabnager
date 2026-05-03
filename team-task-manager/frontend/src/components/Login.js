import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const data = isSignup ? formData : { email: formData.email, password: formData.password };
      const res = await axios.post(endpoint, data);
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="login">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="">Role</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </>
        )}
        {!isSignup && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </>
        )}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p>{error}</p>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Switch to Login' : 'Create Account'}
      </button>
    </div>
  );
};

export default Login;

