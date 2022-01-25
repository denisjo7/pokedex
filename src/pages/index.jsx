import { useEffect, useState } from 'react';
import Image from 'next/image';
import PokeCard from '../components/PokeCard';
import fetchPokemons from '../services/fetchPokemons';
import nextPokemons from '../assets/images/next.svg';
import style from '../styles/home.module.css';

export default function Home() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [nextFetch, setNextFetch] = useState('');
  const [prevFetch, setPrevFetch] = useState('');

  useEffect(() => {
    (async () => {
      const {
        count, next, previous, results,
      } = await fetchPokemons();
      console.log(count);
      setPokemonsList(results);
      setNextFetch(next);
      setPrevFetch(previous);
    })();
  }, []);

  async function handlePokemons(addOrRemove) {
    const action = (addOrRemove === 'add') ? nextFetch : prevFetch;
    const {
      count, next, previous, results,
    } = await fetchPokemons(action);
    console.log(Math.ceil(count / 12));
    setPokemonsList(results);
    setNextFetch(next);
    setPrevFetch(previous);
  }

  return (
    <div className={style.home}>
      <h1 className={style.title}>POKEDEX BY FREEZING</h1>

      <div className={style.pokemons_container}>
        {pokemonsList.length > 0 && pokemonsList.map(({ name, url }) => (
          <PokeCard key={`${name}`} url={url} />
        ))}
      </div>

      <div className={style.pokemons_navigation}>
        <button
          className={style.previousPokemonsBtn}
          onClick={() => handlePokemons('remove')}
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
          onClick={() => handlePokemons('add')}
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
