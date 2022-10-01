import React, { useState, useEffect, useRef, useCallback } from "react";
import getDataPokemon from "../helpers/pokemon-data-state";
import Modal from "../components/Modal";
import PokemonModal from "../components/PokemonModal";
import PokemonCard from "../components/PokemonCard";

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
          <PokemonCard
            poke={poke}
            setSelectedPokemon={setSelectedPokemon}
            setIsModalOpen={setIsModalOpen}
            pokemonId={pokemonId}
          ></PokemonCard>
        );
      })}
      <div ref={lastPokemonElementRef}></div>
      <div>{isLoading && "Loading..."}</div>
    </div>
  );
}
