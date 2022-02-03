import {
  createRef, useContext, useEffect,
} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import PokeCard from '../components/PokeCard';
import getDefaultPokeList from '../helpers/getDefaultPokeList';
import createCustomPokeList from '../helpers/createCustomPokeList';
import getNextOrPrevPokeList from '../helpers/getNextOrPrevPokeList';
import handleSearchOnSuggestionClick from '../helpers/handleSearchOnSuggestionClick';
import handleSearch from '../helpers/handleSearch';
import toggleSuggestions from '../helpers/toggleSuggestions';
import getAllPokeNamesAndUrl from '../helpers/getAllPokeNamesAndUrl';
import nextPokemons from '../assets/images/next.svg';
import style from '../styles/home.module.css';
import AppContext from '../context/AppContext';

export default function Home() {
  const searchInput = createRef();
  const helpersDependencies = useContext(AppContext);
  const {
    allPokes,
    currentPokeList,
    pokeToSearch,
    setShowSuggestions,
    setWasSuggested,
    showSuggestions,
    totalAmountPokes,
  } = useContext(AppContext);

  useEffect(() => {
    getDefaultPokeList(helpersDependencies);
  }, []);

  useEffect(() => {
    getAllPokeNamesAndUrl(helpersDependencies);
  }, [totalAmountPokes]);

  useEffect(() => {
    toggleSuggestions(helpersDependencies);
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
              onChange={() => handleSearch(helpersDependencies, searchInput)}
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
              if (pokeToSearch !== '') createCustomPokeList(helpersDependencies);
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
