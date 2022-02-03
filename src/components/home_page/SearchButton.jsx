import React from 'react';
import { useContext } from 'react/cjs/react.development';
import AppContext from '../../context/AppContext';
import createCustomPokeList from '../../helpers/createCustomPokeList';
import getDefaultPokeList from '../../helpers/getDefaultPokeList';
import style from '../../styles/home.module.css';

export default function SearchButton() {
  const helpersDependencies = useContext(AppContext);
  const { pokeToSearch } = helpersDependencies;

  return (
    <button
      className={style.search_btn}
      type="button"
      onClick={() => {
        if (pokeToSearch !== '') createCustomPokeList(helpersDependencies);
        if (pokeToSearch === '') getDefaultPokeList(helpersDependencies);
      }}
    >
      Search
    </button>
  );
}
