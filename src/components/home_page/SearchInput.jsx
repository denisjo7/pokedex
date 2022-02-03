import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import handleSearch from '../../helpers/handleSearch';
import createCustomPokeList from '../../helpers/createCustomPokeList';
import getDefaultPokeList from '../../helpers/getDefaultPokeList';
import style from '../../styles/home.module.css';

export default function SearchInput({ searchInput }) {
  const helpersDependencies = useContext(AppContext);
  const {
    pokeToSearch,
    setPokeToSearch,
    setShowSuggestions,
    setWasSuggested,
    showSuggestions,
  } = helpersDependencies;

  return (
    <input
      autoComplete="off"
      className={style.search_input}
      id="search-pokemon"
      onChange={() => handleSearch(setPokeToSearch, searchInput)}
      onClick={() => {
        if (!showSuggestions && pokeToSearch !== '') setShowSuggestions(true);
        setWasSuggested(false);
      }}
      onKeyDown={({ key }) => {
        if (key === 'Enter' && pokeToSearch !== '') createCustomPokeList(helpersDependencies);
        if (key === 'Enter' && pokeToSearch === '') getDefaultPokeList(helpersDependencies);
      }}
      ref={searchInput}
      type="text"
      value={pokeToSearch}
    />
  );
}
