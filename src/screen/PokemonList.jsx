import React, { useState, useEffect } from "react";
import PokemonApi from "../repositories/PokemonApi";
export default function PokemonListScreen() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    //   document.title = `You clicked ${count} times`;
    PokemonApi.getPokemons()
      .then((pokemonData) => {
        console.log(pokemonData, "pokemonData");
        setPokemons(pokemonData.results);
      })
      .catch((e) => {
        console.log(e, "Error useeffect");
      });
  }, []);
  return (
    <div className="pokemon-list-container">
      {pokemons.map((poke, index) => {
        return <p key={index}>{poke.name}</p>;
      })}
    </div>
  );
}
