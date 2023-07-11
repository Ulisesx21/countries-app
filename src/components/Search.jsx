import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useCountries } from "../context/CountriesContext";
import "../styles/Search.css";

export default function Search() {
  const { searchCountry, changeRegion } = useCountries();
  const { isDark } = useTheme();

  const element = (
    <FontAwesomeIcon
      icon={faSearch}
      className={`element ${isDark && "element-D"}`}
    />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    searchCountry(e.target[0].value);
    e.target[0].value = "";
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    changeRegion(e.target.value);
  };

  return (
    <div className="search-container">
      <div className={`search-div1 ${isDark && "search-div1-D"}`}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            {element}
            <input name="input" placeholder="Search for a country..."></input>
          </label>
        </form>
      </div>
      <div className={`search-div2 ${isDark && "search-div2-D"}`}>
        <select
          onChange={(e) => handleSelectChange(e)}
          defaultValue={"Filter by Region"}
        >
          <option disabled>Filter by Region</option>
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
