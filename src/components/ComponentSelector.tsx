import React, { useState } from 'react';
import VersionComponent from './VersionComponent.tsx';
import PamComponent from './PamComponent.tsx';
import '../style/ComponentSelector.css';
import Welcome from './Welcome.tsx';
import ScreenComponent from './ScreenComponent.tsx';
import DbcoreComponent from './DbcoreComponent.tsx';

const ComponentSelector: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('welcome');
  const [isHomeSelected, setIsHomeSelected] = useState<boolean>(true);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedComponent(prevValue => prevValue === newValue ? '' : newValue); // Toggle selection
    setIsHomeSelected(newValue === ''); // Check if "HOME" is selected
  };

  return (
    <div className="container">
      <div className={`fullscreen ${isHomeSelected ? 'centered' : ''}`}>
        <div className={`select-wrapper ${isHomeSelected ? 'top-right home-selected' : 'top-right'}`}>
          <select className="select-box" value={selectedComponent} onChange={handleSelectChange}>
            <option value="welcome">HOME</option>
            <option value="version">SPORTSBOOK</option>
            <option value="pam">PAM</option>
            <option value="screens">SCREENS</option>
            <option value="backend">DB-SCHEMES</option>
          </select>
        </div>
        {selectedComponent === 'welcome' && <Welcome /> }
        {selectedComponent === 'version' && <VersionComponent />}
        {selectedComponent === 'pam' && <PamComponent />}
        {selectedComponent === 'screens' && <ScreenComponent />}
        {selectedComponent === 'backend' && <DbcoreComponent />}
      </div>
    </div>
  );
};

export default ComponentSelector;
