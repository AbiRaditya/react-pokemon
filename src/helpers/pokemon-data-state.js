import PokemonApi from "../repositories/PokemonApi";
export default async function getDataPokemon(
  str,
  pokemons,
  setNextPokemon,
  setPokemons
) {
  const pokemonData = await PokemonApi.getPokemons(str);
  setNextPokemon(pokemonData.next);
  setPokemons(pokemons.concat(pokemonData.results));
}
