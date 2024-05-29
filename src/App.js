import './App.css';
import VersionComponent from './components/VersionComponent.tsx';

import baseball from './galery/baseball.png'
function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundImage: `url(${baseball})` }} >
        <p>
          Website Versions By customer
        </p>
       <VersionComponent/>
      </header>
    </div>
  );
}

export default App;
