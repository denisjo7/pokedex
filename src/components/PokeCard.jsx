import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import fetchSpecificPokemon from '../services/fetchSpecificPokemon';
import pokeball from '../assets/images/pokeball.png';
import style from '../styles/PokeCard.module.css';

export default function PokeCard({ url }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    (async () => {
      const fetchPokemon = await fetchSpecificPokemon(url);
      setPokemon(fetchPokemon);
    })();
  }, []);

  if (pokemon.abilities) {
    const {
      id, name, sprites, types,
    } = pokemon;
    const { other: { 'official-artwork': { front_default: pokemonImg } } } = sprites;
    const typeStyle = types[0].type.name;

    return (
      <div className={classNames(style.poke_card, style[typeStyle])}>
        <div className={style.poke_img_container}>
          <div className={style.poke_img_bg} />
          <Image
            alt={`${name} image`}
            className={style.poke_img}
            height={100}
            src={pokemonImg}
            width={100}
          />
        </div>

        <div className={style.poke_infos}>
          <div className={style.pokeball}>
            <Image
              alt="Pokeball image"
              height={170}
              src={pokeball}
              width={170}
            />
          </div>

          <div className={style.name_and_number}>
            <h1 className={style.name}>{name}</h1>

            <h4>
              {(id < 10) ? `#00${id}` : null}
              {(id >= 10 && id <= 99) ? `#0${id}` : null}
              {(id > 99) ? `#${id}` : null}
            </h4>
          </div>

          <div className={style.types}>
            {types.map(({ type: { name: typeName } }) => (
              <div className={style.type} key={`type__${typeName}`}>
                <span>{typeName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
