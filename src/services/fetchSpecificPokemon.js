import axios from 'axios';

export default async function fetchSpecificPokemon(url) {
  try {
    const { data } = await axios(url);
    return data;
  } catch (error) {
    return console.error('Algo deu errado ao tentar buscar o pokémon específico :(', error);
  }
}
