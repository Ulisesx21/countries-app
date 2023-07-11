import { createContext, useContext } from "react";

export const CountriesContext = createContext();

export const useCountries = () => {
  return useContext(CountriesContext);
};
