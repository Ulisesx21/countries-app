import { useState, useEffect, useContext } from "react";
import Search from "./Search";
import axios from "axios";
import swal from "sweetalert";
import "../css/Main.css";
import { CountryItem } from "./CountryItem";
import { ThemeContext } from "../context/ThemeContext";

export default function Main() {
  let [countries, setCountries] = useState([]);

  const { themeState } = useContext(ThemeContext);

  const getAllCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      swal("Error", "Something has wrong...");
    }
  };

  const changeRegion = async (e) => {
    console.log(e.target.value);
    if (e.target.value === "All") {
      getAllCountries();
    } else {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/region/${e.target.value}`
        );
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
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${value}`
      );
      setCountries(response.data);
    } catch (error) {
      swal("Error", "Country not found...");
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className={`main ${themeState && "main-D"}`}>
      <Search changeRegion={changeRegion} searchCountry={searchCountry} />
      <div
        className={`countries-container ${
          themeState && "countries-container-D"
        }`}
      >
        {countries ? (
          countries.map((country, i) => (
            <CountryItem key={i} country={country} />
          ))
        ) : (
          <div className={themeState ? "loading-D" : "loading"}>Loading...</div>
        )}
      </div>
    </div>
  );
}
