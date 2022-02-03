import {
  createRef, useContext, useEffect,
} from 'react';
import Head from 'next/head';
import AppContext from '../context/AppContext';
import PokeCard from '../components/home_page/PokeCard';
import Header from '../components/home_page/Header';
import PaginationBar from '../components/home_page/PaginationBar';
import SearchInput from '../components/home_page/SearchInput';
import Suggestions from '../components/home_page/Suggestions';
import SearchButton from '../components/home_page/SearchButton';
import getDefaultPokeList from '../helpers/getDefaultPokeList';
import toggleSuggestions from '../helpers/toggleSuggestions';
import getAllPokeNamesAndUrl from '../helpers/getAllPokeNamesAndUrl';
import style from '../styles/home.module.css';

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
        onClick={({ target }) => (target !== searchInput.current) && setShowSuggestions(false)}
        onKeyDown={({ key }) => (key === 'Escape') && setShowSuggestions(false)}
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

        <PaginationBar />
      </div>
    </>
  );
}
