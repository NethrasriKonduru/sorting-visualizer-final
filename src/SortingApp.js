import React from 'react';
import SortingVisualizer from './SortingVisualizer';

function SortingApp({ user }) {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Welcome, {user.name}!</h2>
      <SortingVisualizer />
    </div>
  );
}

export default SortingApp;
