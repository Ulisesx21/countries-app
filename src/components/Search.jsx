import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useCountries } from "../context/CountriesContext";
import { useCallback, useEffect, useState } from "react";
import { get, set } from "../utils/sessionStorage";
import "../styles/Search.css";

export default function Search() {
  const [inputValue, setInputValue] = useState(get("ca-inputValue") || "");

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
    const value = e.target.value;
    onChange(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = useCallback(
    debounce((value) => {
      if (value === "") {
        getAllCountries();
        return;
      }

      searchCountry(value);
    }, 500),
    []
  );

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

  useEffect(() => {
    set("ca-inputValue", inputValue);
  }, [inputValue]);

  return (
    <div className="search-container">
      <div className={`search-div1 ${isDark && "search-div1-D"}`}>
        <div className={`input-container ${isDark && "input-container-D"}`}>
          <label>
            {SearchIcon}
            <input
              name="input"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                handleChange(e);
              }}
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
