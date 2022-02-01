export default async function getNextOrPrevPokeList(option, {
  nextPokeList,
  prevPokeList,
  fetchPokeList,
  setCurrentPokeList,
  setNextPokeList,
  setPrevPokeList,
}) {
  const action = (option === 'next') ? nextPokeList : prevPokeList;
  const { next, previous, results } = await fetchPokeList(action);
  setCurrentPokeList(results);
  setNextPokeList(next);
  setPrevPokeList(previous);
}
