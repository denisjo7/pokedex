import axios from 'axios';

export default async function fetchAllPokeNames(amount) {
  const URL_ALL_POKES = `https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`;

  try {
    const { data } = await axios(URL_ALL_POKES);
    const { results } = data;
    return results;
  } catch (error) {
    return console.error('Algo deu errado. :(', error);
  }
}
