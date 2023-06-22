import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/themeContext";
import { useCountries } from "../context/countriesContext";
import "../styles/Search.css";


export default function Search() {

  const { searchCountry, changeRegion } = useCountries();
  const { isDark } = useTheme();

  const element = (
    <FontAwesomeIcon
      icon={faSearch}
      className={`${isDark ? "element-D" : "element"}`}
    />
  );

  return (
    <div className="search-container">
      <div className={`search-div1 ${isDark && "search-div1-D"}`}>
        <form
          onSubmit={(e) => {
            searchCountry(e);
            e.currentTarget.input.value = "";
          }}
        >
          <label>
            {element}
            <input name="input" placeholder="Search for a country..."></input>
          </label>
        </form>
      </div>
      <div className={`${isDark ? "search-div2-D" : "search-div2"}`}>
        <select onChange={changeRegion}>
          <option disabled selected>
            Filter by Region
          </option>
          <option>All</option>
          <option>Africa</option>
          <option>America</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      </div>
    </div>
  );
}
