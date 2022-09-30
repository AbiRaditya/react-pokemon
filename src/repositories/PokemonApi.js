import AxiosInstance from "./AxiosFactory";
export default class PokemonApi {
  static async getPokemons(url) {
    try {
      let params = {};
      if (url) {
        params = new URL(url).searchParams;
      }
      // https://pokeapi.co/api/v2/pokemon/
      const pokemonList = await AxiosInstance({
        method: "get",
        url: "/pokemon",
        params: params,
      });
      return pokemonList.data;
    } catch (error) {
      console.log(error, "getPokemons");
      return error;
    }
  }
  static async getPokemonDetail(id) {
    try {
      const pokemonDetail = await AxiosInstance({
        method: "get",
        url: `/pokemon/${id}`,
      });
      return pokemonDetail.data;
    } catch (error) {
      console.log(error, "getPokemons");
      return error;
    }
  }
}
