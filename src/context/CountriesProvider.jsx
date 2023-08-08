import { useEffect, useState } from "react";
import { CountriesContext } from "./CountriesContext";
import swal from "sweetalert";
import {
  getAll,
  getCountriesByRegion,
  getCountryByName,
} from "../services/countries";

export const CountriesContextProvider = ({ children }) => {
  
  const [countries, setCountries] = useState([]);

  const getAllCountries = async () => {
    try {
      const data = await getAll();
      setCountries(data);
    } catch (error) {
      swal("Error", "Something has wrong...");
    }
  };

  const changeRegion = async (value) => {
    try {
      if (value === "All") {
        getAllCountries();
      } else {
        const data = await getCountriesByRegion(value);
        setCountries(data);
      }
    } catch (error) {
      swal("Error", "Something has wrong...");
    }
  };

  const searchCountry = async (value) => {
    try {
      const data = await getCountryByName(value);
      setCountries(data);
    } catch (error) {
      swal("Error", "Country not found...");
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <CountriesContext.Provider
      value={{
        countries,
        changeRegion,
        searchCountry,
        getAllCountries,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
