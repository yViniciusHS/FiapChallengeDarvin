// src/contexts/dataHooks.js

import { createContext, useContext } from 'react';

// 1. Criamos e exportamos o objeto do contexto aqui
export const DataContext = createContext();

// 2. Criamos e exportamos nosso hook customizado aqui
export const useData = () => {
  return useContext(DataContext);
};