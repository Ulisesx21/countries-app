import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useCountries } from "../context/CountriesContext";
import { useCallback, useEffect, useState } from "react";
import { get, set } from "../utils/sessionStorage";
import { debounce } from "../utils/debounce";
import "../styles/Search.css";

export default function Search() {
  const [inputValue, setInputValue] = useState(get("caInputValue") || "");
  const [filterValue, setFilterValue] = useState(get("caFilterValue") || "Filter by Region");
  const [sortedValue, setSortedValue] = useState(get("caSortValue") || "Sort by");

  const {
    searchCountry,
    changeRegion,
    getAllCountries,
    setIsDescendent,
    setSortType,
    isAscendent,
  } = useCountries();

  const { isDark } = useTheme();

  const handleChange = (e) => {
    const { value } = e.target;

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

  const handleSelectFilter = (e) => {
    const { value } = e.target; 
    
    changeRegion(value);
    setFilterValue(value);

    set("caFilterValue", value)
  };

  const handleSelectSort = (e) => {
    const { value } = e.target; 
    
    setSortedValue(value);
    setSortType(value);

    set("caSortValue", value)
  };

  const SearchIcon = (
    <FontAwesomeIcon
      icon={faSearch}
      className={`element ${isDark && "element-D"}`}
    />
  );

  useEffect(() => {
    set("caInputValue", inputValue);
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
                if (filterValue !== "Filter by Region") {
                  setFilterValue("Filter by Region");
                }
                if (sortedValue !== "Sort by") {
                  setSortedValue("Sort by");
                  setSortType("");
                }
              }}
              placeholder="Search for a country..."
              autoFocus
            />
          </label>
        </div>
      </div>
      <div className="sort-filter-container">
        <div className={`select-sort ${isDark && "select-sort-D"}`}>
          <select onChange={(e) => handleSelectSort(e)} value={sortedValue}>
            <option disabled>Sort by</option>
            <option>Name</option>
            <option>Population</option>
          </select>
          <div
            className={`sort-button ${isDark && "sort-button-D"}`}
            onClick={() => {
              if (sortedValue !== "Sort by") {
                setIsDescendent((oldValue) => !oldValue);
              }
            }}
          >
            <FontAwesomeIcon
              icon={isAscendent ? faArrowDown : faArrowUp}
              color={`${isDark ? "white" : "black"}`}
            />
          </div>
        </div>
        <div className={`search-div2 ${isDark && "search-div2-D"}`}>
          <select onChange={(e) => handleSelectFilter(e)} value={filterValue}>
            <option disabled>Filter by Region</option>
            <option>Africa</option>
            <option>America</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Oceania</option>
          </select>
        </div>
      </div>
    </div>
  );
}
