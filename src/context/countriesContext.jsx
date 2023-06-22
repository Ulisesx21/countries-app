import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../utils/config/axios.config";
import swal from "sweetalert";


export const CountriesContext = createContext();

export const useCountries = () => {
  return useContext(CountriesContext)
}

export const CountriesContextProvider = ({ children }) => {

  const [countries, setCountries] = useState([]);

  const getAllCountries = async () => {
    try {
      const response = await instance.get("/all");
      setCountries(response.data);
    } catch (error) {
      swal("Error", "Something has wrong...");
    }
  };

  const changeRegion = async (e) => {
    const { value } = e.target;
    if (value === "All") {
      getAllCountries();
    } else {
      try {
        const response = await instance.get(`/region/${value}`);
        setCountries(response.data);
      } catch (error) {
        swal("Error", "Something has wrong...");
      }
    }
  };

  const searchCountry = async (e) => {
    e.preventDefault();
    const value = e.currentTarget.input.value;
    try {
      const response = await instance.get(`/name/${value}`);
      setCountries(response.data);
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
        searchCountry
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}
