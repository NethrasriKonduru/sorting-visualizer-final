import React, { useState, useEffect } from 'react';
import SortingVisualizer from '../SortingVisualizer';
import Login from '../login';

const Loginpage = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn === 'true' || false;
  });

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <>
      {loggedIn ? <SortingVisualizer /> : <Login onLogin={handleLoginSuccess} />}
    </>
  );
};

export default Loginpage;