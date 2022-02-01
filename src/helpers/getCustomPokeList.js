export default function getCustomPokeList(customId, {
  allPokes,
  pokeToSearch,
  setShowSuggestions,
  setCurrentPokeList,
}) {
  const filteredPokeNameList = allPokes
    .filter(({ name }) => name.includes(customId || pokeToSearch));
  const customPokeList = filteredPokeNameList.map(({ id, name }) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return { name, url };
  });
  setShowSuggestions(false);
  setCurrentPokeList(customPokeList);
}
