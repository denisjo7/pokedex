export default function handleSearchOnSuggestionClick(dependencies, id) {
  const {
    setPokeToSearch,
    setWasSuggested,
    getCustomPokeList,
  } = dependencies;

  setPokeToSearch(id);
  setWasSuggested(true);
  getCustomPokeList(dependencies, id);
}
