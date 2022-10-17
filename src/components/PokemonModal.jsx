import React, { useEffect, useState } from "react";
import getDetailPokemon from "../helpers/pokemon-detail-state";
import Button from "@mui/material/Button";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import CircularProgress from "@mui/material/CircularProgress";

const PokemonModal = ({ pokeId }) => {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false); // eslint-disable-line
  const [isFront, setIsFront] = useState(true);
  const pokemonId = pokeId();
  useEffect(() => {
    getDetailPokemon(pokemonId, setPokemonDetail, setIsLoading, setIsError);
  }, [pokemonId]);

  function renderSelectedPokemon() {
    if (!pokemonId) {
      return null;
    } else {
      return (
        <div>
          <div className="circular-loading">
            {isLoading && <CircularProgress />}
          </div>
          {!isLoading && (
            <div>
              <div className="pokemon-detail__sprite">
                <img
                  src={
                    isFront
                      ? pokemonDetail?.sprites?.front_default
                      : pokemonDetail?.sprites?.back_default
                  }
                  alt="pokemon"
                />
                <Button
                  onClick={() => {
                    setIsFront(!isFront);
                  }}
                  variant="contained"
                >
                  <ThreeSixtyIcon />
                </Button>
                {/* <button
                onClick={() => {
                  setIsFront(!isFront);
                }}
              >
                ROTATE SPRITE
              </button> */}
              </div>
              <div className="pokemon-detail__information">
                <div className="pokemon__types">
                  {pokemonDetail?.types?.map((type, index) => {
                    return <p key={index}>{type.type.name}</p>;
                  })}
                </div>
                <div className="pokemon__abilities">
                  {pokemonDetail?.abilities?.map((ability, index) => {
                    return <p key={index}>{ability.ability.name}</p>;
                  })}
                </div>
                <div className="pokemon__hweight">
                  <p>
                    Height:{pokemonDetail?.height ? pokemonDetail?.height : "-"}
                  </p>
                  <p>
                    Weight:{pokemonDetail?.weight ? pokemonDetail?.weight : "-"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  return <div>{renderSelectedPokemon()}</div>;
};

export default PokemonModal;
