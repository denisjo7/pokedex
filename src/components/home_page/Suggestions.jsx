import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import handleSearchOnSuggestionClick from '../../helpers/handleSearchOnSuggestionClick';
import style from '../../styles/home.module.css';

export default function Suggestions() {
  const helpersDependencies = useContext(AppContext);
  const { allPokes, pokeToSearch } = helpersDependencies;

  return (
    <div className={style.poke_suggestions}>
      {allPokes
        .filter(({ name }) => name.includes(pokeToSearch) && pokeToSearch !== '')
        .map(({ name }, index) => (
          <span
            aria-hidden="true"
            className={style.poke_suggestion}
            key={`suggestion__${name}__${index + 0}`}
            id={name}
            onClick={({ target: { id } }) => {
              handleSearchOnSuggestionClick(helpersDependencies, id);
            }}
          >
            {name}
          </span>
        ))}
    </div>
  );
}
