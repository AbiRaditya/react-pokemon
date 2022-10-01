import React from "react";

const PokemonCard = ({
  setSelectedPokemon,
  setIsModalOpen,
  pokemonId,
  poke,
}) => {
  return (
    <div
      onClick={() => {
        setSelectedPokemon(poke);
        setIsModalOpen(true);
      }}
      className="pokemon__card"
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
};

export default PokemonCard;
