import React, { useState, useEffect, useRef, useCallback } from "react";
import getDataPokemon from "../helpers/pokemon-data-state";
import Modal from "../components/Modal";
import PokemonModal from "../components/PokemonModal";

export default function PokemonListScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false); // eslint-disable-line
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const observer = useRef();
  const lastPokemonElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (nextPokemon) {
            getPokemonData(nextPokemon);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading] // eslint-disable-line
  );

  function pokemonId(pokeUrl) {
    return pokeUrl.split("/")[pokeUrl.split("/").length - 2];
  }

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

  useEffect(() => {
    getDataPokemon(
      null,
      pokemons,
      setNextPokemon,
      setPokemons,
      setIsLoading,
      setIsError
    );
  }, []); // eslint-disable-line

  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png

  return (
    <div className="pokemon-list-container">
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        modalTitle={selectedPokemon}
      >
        <PokemonModal
          pokeId={() => {
            return pokemonId(selectedPokemon.url);
          }}
        ></PokemonModal>
      </Modal>
      {pokemons.map((poke, index) => {
        return (
          <div
            onClick={() => {
              setSelectedPokemon(poke);
              setIsModalOpen(true);
            }}
            className="pokemon__card"
            key={index}
          >
            <img
              className="pokemon__image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId(
                poke.url
              )}.png`}
              alt=""
            />
            <div className="pokemon__information">
              <p className="pokemon__id">
                #{String(pokemonId(poke.url)).padStart(3, "0")}
              </p>
              <p className="pokemon__name">{poke.name}</p>
            </div>
          </div>
        );
      })}
      <div ref={lastPokemonElementRef}></div>
      <div>{isLoading && "Loading..."}</div>
    </div>
  );
}
