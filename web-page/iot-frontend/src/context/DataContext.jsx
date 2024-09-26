import { createContext, useState, useContext, useEffect } from "react";
import { UseWs } from '../utils/UseWs';

export const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("El useData deberia estar dentro de un contexto");
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [isWsReady, wsValue, sendWsData] = UseWs("http://localhost:8080");
  return <DataContext.Provider value={{isWsReady,wsValue}}>{children}</DataContext.Provider>;
};
