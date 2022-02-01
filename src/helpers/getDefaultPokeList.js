export default async function getDefaultPokeList({
  fetchPokeList,
  setNextPokeList,
  setPrevPokeList,
  setCurrentPokeList,
  setTotalAmountPokes,
}) {
  const {
    count, next, previous, results,
  } = await fetchPokeList();
  setNextPokeList(next);
  setPrevPokeList(previous);
  setCurrentPokeList(results);
  setTotalAmountPokes(count);
}
