import React, { useEffect, useState } from "react";
import getDetailPokemon from "../helpers/pokemon-detail-state";
const PokemonModal = ({ pokeId }) => {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false); // eslint-disable-line
  const [isFront, setIsFront] = useState(true);
  const pokemonId = pokeId();
  useEffect(() => {
    getDetailPokemon(pokemonId, setPokemonDetail, setIsLoading, setIsError);
    // PokemonApi.getPokemonDetail(pokeId())
    //   .then((data) => {
    //     setPokemonDetail(data);
    //   })
    //   .catch((error) => {
    //     console.log(error, "useEffect detail error");
    //   });
  }, [pokemonId]);

  function renderSelectedPokemon() {
    if (!pokemonId) {
      return null;
    } else {
      return (
        <div>
          <div>{isLoading && "Loading..."}</div>
          <div>
            <img
              src={
                isFront
                  ? pokemonDetail?.sprites.front_default
                  : pokemonDetail?.sprites.back_default
              }
              alt="pokemon"
            />
            <button
              onClick={() => {
                setIsFront(!isFront);
              }}
            >
              ROTATE SPRITE
            </button>
            <p>{pokemonDetail?.name}</p>
            <div>
              {pokemonDetail?.types.map((type, index) => {
                return <p key={index}>{type.type.name}</p>;
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  return <div>{renderSelectedPokemon()}</div>;
};

export default PokemonModal;
