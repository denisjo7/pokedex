import getCustomPokeList from './getCustomPokeList';

export default function handleSearchOnSuggestionClick(dependencies, id) {
  const {
    setPokeToSearch,
    setWasSuggested,
  } = dependencies;

  setPokeToSearch(id);
  setWasSuggested(true);
  getCustomPokeList(dependencies, id);
}
