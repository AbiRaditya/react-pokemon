import React, { useState, useEffect, useRef } from "react";
import getDataPokemon from "../helpers/pokemon-data-state";
export default function PokemonListScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [nextPokemon, setNextPokemon] = useState(null);

  function getPokemonData(str) {
    getDataPokemon(str, pokemons, setNextPokemon, setPokemons);
  }

  useEffect(() => {
    (async function () {
      getDataPokemon(null, pokemons, setNextPokemon, setPokemons);
    })();
  }, []);

  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png

  return (
    <div className="pokemon-list-container">
      {pokemons.map((poke, index) => {
        return (
          <div key={index}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                poke.url.split("/")[poke.url.split("/").length - 2]
              }.png`}
              alt=""
            />
            <p>{poke.name}</p>
          </div>
        );
      })}
      <div>
        <button
          disabled={nextPokemon ? false : true}
          onClick={() => {
            getPokemonData(nextPokemon);
          }}
        >
          NEXT {nextPokemon}
        </button>
      </div>
    </div>
  );
}
