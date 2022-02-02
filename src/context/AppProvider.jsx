import React, { useMemo, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [currentPokeList, setCurrentPokeList] = useState([]);
  const [nextPokeList, setNextPokeList] = useState('');
  const [prevPokeList, setPrevPokeList] = useState('');
  const [totalAmountPokes, setTotalAmountPokes] = useState(0);
  const [allPokes, setAllPokes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wasSuggested, setWasSuggested] = useState(false);
  const [pokeToSearch, setPokeToSearch] = useState('');

  const context = useMemo(() => ({
    allPokes,
    currentPokeList,
    nextPokeList,
    pokeToSearch,
    prevPokeList,
    setAllPokes,
    setCurrentPokeList,
    setNextPokeList,
    setPokeToSearch,
    setPrevPokeList,
    setShowSuggestions,
    setTotalAmountPokes,
    setWasSuggested,
    showSuggestions,
    totalAmountPokes,
    wasSuggested,
  }));

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}
