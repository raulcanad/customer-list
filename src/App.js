import logo from './logo.svg';
import './App.css';
import VersionComponent from './components/SegundoComponente';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Website Versions
        </p>
       <VersionComponent/>
      </header>
    </div>
  );
}

export default App;
