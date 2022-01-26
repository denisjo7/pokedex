import {
  createRef, useEffect, useState,
} from 'react';
import Image from 'next/image';
import PokeCard from '../components/PokeCard';
import fetchPokemons from '../services/fetchPokemons';
import nextPokemons from '../assets/images/next.svg';
import style from '../styles/home.module.css';

export default function Home() {
  const [currentPokeList, setCurrentPokeList] = useState([]);
  const [nextPokeList, setNextPokeList] = useState('');
  const [prevPokeList, setPrevPokeList] = useState('');
  const [totalAmountPokes, setTotalAmountPokes] = useState(0);
  const [allPokes, setAllPokes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pokeToSearch, setPokeToSearch] = useState('');
  const searchInput = createRef();

  useEffect(() => {
    (async () => {
      const URL_ALL_POKES = `https://pokeapi.co/api/v2/pokemon?limit=${totalAmountPokes}&offset=0`;
      const { results } = await fetchPokemons(URL_ALL_POKES);
      const pokeNamesAndIds = results.reduce((acc, poke) => {
        const { name, url } = poke;
        const [, id] = url.split('/').reverse();
        acc.push({ name, id });
        return acc;
      }, []);
      pokeNamesAndIds.sort((a, b) => a.name.localeCompare(b.name));
      setAllPokes([...pokeNamesAndIds]);
    })();
  }, [totalAmountPokes]);

  async function loadDefaultPokeList() {
    const {
      count, next, previous, results,
    } = await fetchPokemons();
    setNextPokeList(next);
    setPrevPokeList(previous);
    setCurrentPokeList(results);
    setTotalAmountPokes(count);
  }

  function loadCustomPokeList(customId) {
    if (pokeToSearch !== '') {
      const filteredPokeNameList = allPokes
        .filter(({ name }) => name.includes(customId || pokeToSearch));
      const customPokeList = filteredPokeNameList.map(({ id, name }) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        return { name, url };
      });
      setCurrentPokeList(customPokeList);
    }
  }

  useEffect(() => {
    loadDefaultPokeList();
  }, []);

  useEffect(() => {
    const checkAllPokes = allPokes.filter(({ name }) => (name.includes(pokeToSearch) && pokeToSearch !== '')).map(({ name }) => name);
    const checkCurrentPokeList = currentPokeList.map(({ name }) => name);
    const compareChecks = JSON.stringify(checkAllPokes) === JSON.stringify(checkCurrentPokeList);

    if (!showSuggestions) setShowSuggestions(true);
    if (pokeToSearch === '' || !allPokes.some(({ name }) => name.includes(pokeToSearch)) || compareChecks) {
      setShowSuggestions(false);
    }
  }, [pokeToSearch]);

  async function nextOrPrevPokes(option) {
    const action = (option === 'next') ? nextPokeList : prevPokeList;
    const { next, previous, results } = await fetchPokemons(action);
    setCurrentPokeList(results);
    setNextPokeList(next);
    setPrevPokeList(previous);
  }

  function searchHandle() {
    setPokeToSearch(searchInput.current.value);
  }

  function handleSearchOnSuggestionClick(id) {
    setPokeToSearch(id);
    loadCustomPokeList(id);
  }

  return (
    <div
      aria-hidden="true"
      className={style.home}
      onClick={({ target }) => {
        if (target !== searchInput.current) setShowSuggestions(false);
      }}
    >
      <h1 className={style.title}>POKEDEX BY FREEZING</h1>

      <div className={style.search_container}>
        <div className={style.search_input_and_suggestions}>
          <input
            autoComplete="off"
            className={style.search_input}
            id="search-pokemon"
            onChange={searchHandle}
            onClick={() => {
              if (!showSuggestions && pokeToSearch !== '') setShowSuggestions(true);
            }}
            onKeyDown={({ key }) => {
              if (key === 'Enter' && pokeToSearch !== '') loadCustomPokeList();
              if (key === 'Enter' && pokeToSearch === '') loadDefaultPokeList();
            }}
            ref={searchInput}
            type="text"
            value={pokeToSearch}
          />

          {showSuggestions && (
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
                      handleSearchOnSuggestionClick(id);
                      setShowSuggestions(false);
                    }}
                  >
                    {name}
                  </span>
                ))}
            </div>
          )}
        </div>
        <button
          className={style.search_btn}
          type="button"
          onClick={() => {
            if (pokeToSearch !== '') loadCustomPokeList();
            if (pokeToSearch === '') loadDefaultPokeList();
          }}
        >
          Search
        </button>
      </div>

      <div className={style.pokemons_container}>
        {currentPokeList.length > 0
          && currentPokeList.map(({ name, url }, index) => (
            <PokeCard key={`card__${name}__${index + 0}`} url={url} />
          ))}
      </div>

      <div className={style.pokemons_navigation}>
        <button
          className={style.previousPokemonsBtn}
          onClick={() => nextOrPrevPokes('previous')}
          type="button"
        >
          <Image
            alt="Previous pokemons button"
            src={nextPokemons}
            height={50}
            width={50}
          />
        </button>

        <button
          className={style.nextPokemonsBtn}
          onClick={() => nextOrPrevPokes('next')}
          type="button"
        >
          <Image
            alt="Next pokemons button"
            src={nextPokemons}
            height={50}
            width={50}
          />
        </button>
      </div>
    </div>
  );
}
