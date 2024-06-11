import './App.css';
import ComponentSelector from './components/ComponentSelector.tsx';
import Welcome from './components/Welcome.tsx';


function App() {
  return (
    <div className="App">
       {/* <VersionComponent/> */}
       {/* <PamComponent/> */}
       <ComponentSelector/>
       <Welcome/>

    </div>
  );
}

export default App;
