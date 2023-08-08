import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useCountries } from "../context/CountriesContext";
import "../styles/Search.css";

export default function Search() {
  const { searchCountry, changeRegion, getAllCountries } = useCountries();
  const { isDark } = useTheme();

  const debounce = (cb, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;

    onChange(inputValue);
  };

  const onChange = debounce((value) => {
    if (value === "") {
      getAllCountries();
      return;
    }

    searchCountry(value);
  }, 500);

  const handleSelectChange = (e) => {
    e.preventDefault();
    changeRegion(e.target.value);
  };

  const SearchIcon = (
    <FontAwesomeIcon
      icon={faSearch}
      className={`element ${isDark && "element-D"}`}
    />
  );

  return (
    <div className="search-container">
      <div className={`search-div1 ${isDark && "search-div1-D"}`}>
        <div className={`input-container ${isDark && "input-container-D"}`}>
          <label>
            {SearchIcon}
            <input
              name="input"
              onChange={(e) => handleChange(e)}
              placeholder="Search for a country..."
            ></input>
          </label>
        </div>
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
