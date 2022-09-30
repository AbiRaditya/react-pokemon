import PokemonApi from "../repositories/PokemonApi";
export default async function getDetailPokemon(
  id,
  setPokemonDetail,
  setIsLoading,
  setIsError
) {
  try {
    setIsLoading(true);
    setIsError(false);
    const pokemonData = await PokemonApi.getPokemonDetail(id);
    setIsLoading(false);
    setPokemonDetail(pokemonData);
    // setNextPokemon(pokemonData.next);
    // setPokemons(pokemons.concat(pokemonData.results));
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    console.log(error);
  }
}
