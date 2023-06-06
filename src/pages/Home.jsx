import { useContext } from "react";
import Search from "../components/Search";
import "../styles/Main.css";
import { CountryItem } from "../components/Country";
import { ThemeContext } from "../context/Context";

export default function Home() {
  const { themeState, countries } = useContext(ThemeContext);

  return (
    <div className={`main ${themeState && "main-D"}`}>
      <Search />
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
