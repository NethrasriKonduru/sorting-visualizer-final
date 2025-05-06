import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { usernameOrEmail, password });
    alert('Login successful (bypassing actual authentication)!');
    onLogin();
    history.push('/sorting-visualizer');
  };

  return (
    <div
      style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{
        background: 'rgba(255, 255, 255, 0.85)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      }}>
        <h2 style={{ marginBottom: '20px' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            style={{ padding: '10px', margin: '10px', width: '250px' }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', margin: '10px', width: '250px' }}
          />
          <br />
          <button type="submit" style={{ padding: '10px 20px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
