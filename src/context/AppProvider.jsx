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
    currentPokeList,
    setCurrentPokeList,
    nextPokeList,
    setNextPokeList,
    prevPokeList,
    setPrevPokeList,
    totalAmountPokes,
    setTotalAmountPokes,
    allPokes,
    setAllPokes,
    showSuggestions,
    setShowSuggestions,
    wasSuggested,
    setWasSuggested,
    pokeToSearch,
    setPokeToSearch,
  }));

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}
