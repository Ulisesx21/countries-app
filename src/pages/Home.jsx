import Search from "../components/Search";
import { CountryItem } from "../components/Country";
import { useCountries } from "../context/countriesContext";
import { useTheme } from "../context/themeContext";
import "../styles/Main.css";


export default function Home() {

  const { countries } = useCountries();
  const { isDark } = useTheme();

  return (
    <div className={`main ${isDark && "main-D"}`}>
      <Search />
      <div
        className={`countries-container ${
          isDark && "countries-container-D"
        }`}
      >
        {countries ? (
          countries.map((country, i) => (
            <CountryItem key={i} country={country} />
          ))
        ) : (
          <div className={isDark ? "loading-D" : "loading"}>Loading...</div>
        )}
      </div>
    </div>
  );
}
