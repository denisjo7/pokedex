export default async function fetchPokemons(apiUrl) {
  const POKE_API = apiUrl || 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0';

  try {
    const response = await fetch(POKE_API);
    const data = await response.json();
    return data;
  } catch (error) {
    return console.error(error);
  }
}
