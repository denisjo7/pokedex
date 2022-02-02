export default function createCustomPokeList(dependencies, customId) {
  const {
    allPokes,
    pokeToSearch,
    setShowSuggestions,
    setCurrentPokeList,
  } = dependencies;

  const filteredPokeNameList = allPokes
    .filter(({ name }) => name.includes(customId || pokeToSearch));

  const customPokeList = filteredPokeNameList.map(({ id, name }) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return { name, url };
  });

  setShowSuggestions(false);
  setCurrentPokeList(customPokeList);
}
