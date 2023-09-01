import { useCallback, useEffect, useState } from "react";
import { CountriesContext } from "./CountriesContext";
import { getAll, getByRegion, getByName } from "../services/countries";
import swal from "sweetalert";

export const CountriesContextProvider = ({ children }) => {
  //Countries
  const [countries, setCountries] = useState([]);

  // Sort
  const [sortType, setSortType] = useState("");
  const [isAscendent, setIsDescendent] = useState(true);

  // Api
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
      const data = await getByRegion(value);
      setCountries(data);
    } catch (error) {
      swal("Error", "Something has wrong...");
    }
  };

  const searchCountry = async (value) => {
    try {
      const data = await getByName(value);
      setCountries(data);
    } catch (error) {
      swal("Error", "Country not found...");
    }
  };

  // Sort
  const nameAscendent = useCallback(() => {
    return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  }, [countries]);

  const nameDescendent = useCallback(() => {
    return countries.sort((a, b) => b.name.common.localeCompare(a.name.common));
  }, [countries]);

  const populationAscendent = useCallback(() => {
    return countries.sort((a, b) => a.population - b.population);
  }, [countries]);

  const populationDescendent = useCallback(() => {
    return countries.sort((a, b) => b.population - a.population);
  }, [countries]);

  const sortBy = () => {
    switch (sortType) {
      case "Name":
        return isAscendent ? nameAscendent() : nameDescendent();

      case "Population":
        return isAscendent ? populationAscendent() : populationDescendent();

      default:
        return null;
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <CountriesContext.Provider
      value={{
        countries: sortBy() || countries,
        changeRegion,
        searchCountry,
        getAllCountries,
        isAscendent,
        setIsDescendent,
        setSortType,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
