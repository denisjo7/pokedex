export default async function getNextOrPrevPokeList(dependencies, option) {
  const {
    nextPokeList,
    prevPokeList,
    fetchPokeList,
    setCurrentPokeList,
    setNextPokeList,
    setPrevPokeList,
  } = dependencies;

  const action = (option === 'next') ? nextPokeList : prevPokeList;
  const { next, previous, results } = await fetchPokeList(action);
  setCurrentPokeList(results);
  setNextPokeList(next);
  setPrevPokeList(previous);
}
