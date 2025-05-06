// src/components/AuthForm.js
import React, { useState } from 'react';

const AuthForm = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      onLogin(username, password);
    } else {
      onRegister(username, password);
    }
  };

  return (
    <div className="auth-form" style={styles.container}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button onClick={() => setMode('register')} style={styles.linkBtn}>
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button onClick={() => setMode('login')} style={styles.linkBtn}>
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f0f0f0',
    padding: '2rem',
    borderRadius: '10px',
    width: '300px',
    margin: 'auto',
    marginTop: '5rem',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    margin: '0.5rem 0',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

export default AuthForm;
