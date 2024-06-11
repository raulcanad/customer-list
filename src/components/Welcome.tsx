import React, { useEffect, useState } from 'react';
import './Welcome.css';

const Welcome: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 500); // Gradually appear after 0.5s
  }, []);

  return (
    <div className={`welcome-container ${visible ? 'visible' : ''}`}>
      <h2>Welcome to Version Viewer</h2>
    </div>
  );
};

export default Welcome;