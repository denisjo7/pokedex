import axios from 'axios';

export default async function fetchPokeList(apiUrl) {
  const POKE_API = apiUrl || 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0';

  try {
    const { data } = await axios(POKE_API);
    return data;
  } catch (error) {
    return console.error('Algo deu errado ao buscar a lista de pokémons :(', error);
  }
}
