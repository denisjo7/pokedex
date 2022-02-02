import fetchPokeList from '../services/fetchPokeList';

export default async function getDefaultPokeList({
  setCurrentPokeList,
  setNextPokeList,
  setPrevPokeList,
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
