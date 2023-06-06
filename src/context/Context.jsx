import { createContext, useEffect, useState } from "react"
import { instance } from "../api/base.api";
import swal from "sweetalert";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {

  const [countries, setCountries] = useState([]);

  const [themeState, setThemeState] = useState(false);

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
    console.log(value);
    if (value === "All") {
      getAllCountries();
    } else {
      try {
        const response = await instance.get(`/region/${value}`);
        console.log(response.data);
        setCountries(response.data);
        console.log(countries)
      } catch (error) {
        swal("Error", "Something has wrong...");
      }
    }
  };

  const searchCountry = async (e) => {
    e.preventDefault();
    const value = e.currentTarget.input.value;
    console.log(value);
    try {
      const response = await instance.get(`/name/${value}`);
      console.log(response.data);
      setCountries(response.data);
    } catch (error) {
      swal("Error", "Country not found...");
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeState, setThemeState, changeRegion, searchCountry, countries, getAllCountries }}>
      {children}
    </ThemeContext.Provider>
  )
}
