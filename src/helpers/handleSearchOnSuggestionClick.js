export default function handleSearchOnSuggestionClick(id, dependencies) {
  const {
    setPokeToSearch,
    setWasSuggested,
    getCustomPokeList,
  } = dependencies;

  setPokeToSearch(id);
  setWasSuggested(true);
  getCustomPokeList(id, dependencies);
}
