import {
  createRef, useContext, useEffect,
} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import PokeCard from '../components/home_page/PokeCard';
import getDefaultPokeList from '../helpers/getDefaultPokeList';
import getNextOrPrevPokeList from '../helpers/getNextOrPrevPokeList';
import toggleSuggestions from '../helpers/toggleSuggestions';
import getAllPokeNamesAndUrl from '../helpers/getAllPokeNamesAndUrl';
import nextPokemons from '../assets/images/next.svg';
import style from '../styles/home.module.css';
import AppContext from '../context/AppContext';
import Header from '../components/home_page/Header';
import SearchInput from '../components/home_page/SearchInput';
import Suggestions from '../components/home_page/Suggestions';
import SearchButton from '../components/home_page/SearchButton';

export default function Home() {
  const searchInput = createRef();
  const helpersDependencies = useContext(AppContext);
  const {
    currentPokeList,
    pokeToSearch,
    setShowSuggestions,
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
        <Header />

        <div className={style.search_container}>
          <div className={style.search_input_and_suggestions}>
            <SearchInput searchInput={searchInput} />

            {showSuggestions && <Suggestions />}
          </div>

          <SearchButton />
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
