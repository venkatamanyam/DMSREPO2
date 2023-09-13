import { HashRouter } from 'react-router-dom';
import './App.css';
import { RouterPage } from './Router/RouterPage';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <RouterPage />
      </HashRouter>
    </div>
  );
}

export default App;
