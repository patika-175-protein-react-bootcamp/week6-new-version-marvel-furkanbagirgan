import './App.css';

import Router from './rooter/router';
import Header from "./components/Header";
import { CharactersProvider } from './contexts/character';

function App() {
  return (
    <CharactersProvider>
      <div className="dp-flex-col">
        <Header />
        <Router />
      </div>
    </CharactersProvider>
  );
}

export default App;