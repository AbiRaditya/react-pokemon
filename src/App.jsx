import { Routes, Route } from "react-router-dom";
import "./App.css";
import MyPokemon from "./screen/MyPokemon";
import NavBar from "./components/NavBar";
import PokemonListScreen from "./screen/PokemonList";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<PokemonListScreen />} />
        <Route path="my-pokemon" element={<MyPokemon />} />
      </Routes>
    </div>
  );
}

export default App;
