import Search from "../components/Search";
import { CountryItem } from "../components/Country";
import { useCountries } from "../context/CountriesContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const { countries, getAllCountries } = useCountries();
  const { isDark } = useTheme();

  const getAllRef = useRef(getAllCountries);
  const location = useLocation();

  useEffect(() => {
    getAllRef.current();
  }, [location, getAllRef]);

  return (
    <main className={`main ${isDark && "main-D"}`}>
      <Search />
      <div
        className={`countries-container ${isDark && "countries-container-D"}`}
      >
        {countries ? (
          countries.map((country, i) => (
            <CountryItem key={i} country={country} />
          ))
        ) : (
          <div className={`loading ${isDark && "loading-D"}`}>Loading...</div>
        )}
      </div>
    </main>
  );
}
