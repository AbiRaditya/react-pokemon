import React, { useState, useEffect, useRef, useCallback } from "react";
import getDataPokemon from "../helpers/pokemon-data-state";
export default function PokemonListScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const observer = useRef();
  const lastPokemonElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getPokemonData(nextPokemon);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  function getPokemonData(str) {
    getDataPokemon(
      str,
      pokemons,
      setNextPokemon,
      setPokemons,
      setIsLoading,
      setIsError
    );
  }
  // const onScroll = () => {
  // if (listInnerRef.current) {
  //   const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //   console.log({ scrollTop, scrollHeight, clientHeight }, "testing scroll");
  //   if (scrollTop + clientHeight === scrollHeight) {
  //     // This will be triggered after hitting the last element.
  //     // API call should be made here while implementing pagination.
  //     getPokemonData(nextPokemon);
  //   }
  // }
  // };

  useEffect(() => {
    getDataPokemon(
      null,
      pokemons,
      setNextPokemon,
      setPokemons,
      setIsLoading,
      setIsError
    );
  }, []);

  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png

  return (
    <div className="pokemon-list-container">
      {pokemons.map((poke, index) => {
        if (pokemons.length == index + 1) {
          return (
            <div key={index} ref={lastPokemonElementRef}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  poke.url.split("/")[poke.url.split("/").length - 2]
                }.png`}
                alt=""
              />
              <p>{poke.name}</p>
            </div>
          );
        } else {
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
        }
      })}
      <div>{isLoading && "Loading..."}</div>
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
