import {
  createRef, useEffect, useState,
} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import PokeCard from '../components/PokeCard';
import fetchPokeList from '../services/fetchPokeList';
import getDefaultPokeList from '../helpers/getDefaultPokeList';
import getCustomPokeList from '../helpers/getCustomPokeList';
import getNextOrPrevPokeList from '../helpers/getNextOrPrevPokeList';
import handleSearchOnSuggestionClick from '../helpers/handleSearchOnSuggestionClick';
import handleSearch from '../helpers/handleSearch';
import nextPokemons from '../assets/images/next.svg';
import style from '../styles/home.module.css';

export default function Home() {
  const [currentPokeList, setCurrentPokeList] = useState([]);
  const [nextPokeList, setNextPokeList] = useState('');
  const [prevPokeList, setPrevPokeList] = useState('');
  const [totalAmountPokes, setTotalAmountPokes] = useState(0);
  const [allPokes, setAllPokes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wasSuggested, setWasSuggested] = useState(false);
  const [pokeToSearch, setPokeToSearch] = useState('');
  const searchInput = createRef();
  const helpersDependencies = {
    allPokes,
    fetchPokeList,
    getCustomPokeList,
    nextPokeList,
    pokeToSearch,
    prevPokeList,
    searchInput,
    setCurrentPokeList,
    setNextPokeList,
    setPokeToSearch,
    setPrevPokeList,
    setShowSuggestions,
    setTotalAmountPokes,
    setWasSuggested,
  };

  useEffect(() => {
    (async () => {
      const URL_ALL_POKES = `https://pokeapi.co/api/v2/pokemon?limit=${totalAmountPokes}&offset=0`;
      const { results } = await fetchPokeList(URL_ALL_POKES);
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

  useEffect(() => {
    getDefaultPokeList(helpersDependencies);
  }, []);

  useEffect(() => {
    const checkSearch = allPokes.some(({ name }) => name.includes(pokeToSearch));

    if (!showSuggestions) setShowSuggestions(true);
    if (pokeToSearch === '' || !checkSearch || wasSuggested) {
      setShowSuggestions(false);
    }
  }, [pokeToSearch]);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Uma pokedex, manito" />
        <meta httpEquiv="Content-Language" content="pt-br" />
      </Head>
      <div
        className={style.home}
        onClick={({ target }) => {
          if (target !== searchInput.current) setShowSuggestions(false);
        }}
        onKeyDown={({ key }) => {
          if (key === 'Escape') setShowSuggestions(false);
        }}
        role="button"
        tabIndex={0}
      >
        <header className={style.header}>
          <h1 className={style.page_title}>POKEDEX BY FREEZING</h1>
        </header>

        <div className={style.search_container}>
          <div className={style.search_input_and_suggestions}>
            <input
              autoComplete="off"
              className={style.search_input}
              id="search-pokemon"
              onChange={() => handleSearch(helpersDependencies)}
              onClick={() => {
                if (!showSuggestions && pokeToSearch !== '') setShowSuggestions(true);
                setWasSuggested(false);
              }}
              onKeyDown={({ key }) => {
                if (key === 'Enter' && pokeToSearch !== '') getCustomPokeList(helpersDependencies);
                if (key === 'Enter' && pokeToSearch === '') getDefaultPokeList(helpersDependencies);
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
                      handleSearchOnSuggestionClick(helpersDependencies, id);
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
              if (pokeToSearch !== '') getCustomPokeList(helpersDependencies);
              if (pokeToSearch === '') getDefaultPokeList(helpersDependencies);
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
            onClick={() => getNextOrPrevPokeList(helpersDependencies, 'previous')}
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
            onClick={() => getNextOrPrevPokeList(helpersDependencies, 'next')}
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
    </>
  );
}
