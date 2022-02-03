export default function toggleSuggestions({
  allPokes,
  pokeToSearch,
  setShowSuggestions,
  showSuggestions,
  wasSuggested,
}) {
  const checkSearch = allPokes.some(({ name }) => name.includes(pokeToSearch));

  if (!showSuggestions) setShowSuggestions(true);
  if (pokeToSearch === '' || !checkSearch || wasSuggested) {
    setShowSuggestions(false);
  }
}
