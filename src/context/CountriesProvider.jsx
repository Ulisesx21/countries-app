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
      const response = await getAll();
      setCountries(response);
    } catch (error) {
      swal("Error", "Something has wrong...");
    }
  };

  const changeRegion = async (value) => {
    try {
      if (value === "All") {
        getAllCountries();
      } else {
        const response = await getCountriesByRegion(value);
        setCountries(response);
      }
    } catch (error) {
      swal("Error", "Something has wrong...");
    }
  };

  const searchCountry = async (value) => {
    try {
      const response = await getCountryByName(value);
      setCountries(response);
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
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
