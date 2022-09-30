import PokemonApi from "../repositories/PokemonApi";
export default async function getDataPokemon(
  str,
  pokemons,
  setNextPokemon,
  setPokemons,
  setIsLoading,
  setIsError
) {
  try {
    setIsLoading(true);
    setIsError(false);
    const pokemonData = await PokemonApi.getPokemons(str);
    setIsLoading(false);
    setNextPokemon(pokemonData.next);
    setPokemons(pokemons.concat(pokemonData.results));
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    console.log(error);
  }
}
