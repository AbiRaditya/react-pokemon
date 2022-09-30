import AxiosInstance from "./AxiosFactory";
export default class PokemonApi {
  static async getPokemons() {
    try {
      // https://pokeapi.co/api/v2/pokemon/
      const pokemonList = await AxiosInstance({
        method: "get",
        url: "/pokemon",
      });
      return pokemonList.data;
    } catch (error) {
      console.log(error, "getPokemons");
      return error;
    }
  }
}
