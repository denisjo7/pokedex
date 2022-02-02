import createCustomPokeList from './createCustomPokeList';

export default function handleSearchOnSuggestionClick(dependencies, id) {
  const {
    setPokeToSearch,
    setWasSuggested,
  } = dependencies;

  setPokeToSearch(id);
  setWasSuggested(true);
  createCustomPokeList(dependencies, id);
}
