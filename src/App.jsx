import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./screen/About";
import NavBar from "./components/NavBar";
import PokemonListScreen from "./screen/PokemonList";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<PokemonListScreen />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
