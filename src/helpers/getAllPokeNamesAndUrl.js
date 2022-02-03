import fetchAllPokeNamesAndUrl from '../services/fetchAllPokeNamesAndUrl';

export default async function getAllPokeNamesAndUrl({ totalAmountPokes, setAllPokes }) {
  const results = await fetchAllPokeNamesAndUrl(totalAmountPokes);
  const pokeNamesAndIds = results.reduce((acc, poke) => {
    const { name, url } = poke;
    const [, id] = url.split('/').reverse();
    acc.push({ name, id });
    return acc;
  }, []);

  pokeNamesAndIds.sort((a, b) => a.name.localeCompare(b.name));

  setAllPokes([...pokeNamesAndIds]);
}
