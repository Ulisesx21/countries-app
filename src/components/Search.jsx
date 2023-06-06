import "../styles/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../context/Context";

export default function Search() {
  const { themeState, searchCountry, changeRegion } = useContext(ThemeContext);

  const element = (
    <FontAwesomeIcon
      icon={faSearch}
      className={`${themeState ? "element-D" : "element"}`}
    />
  );

  return (
    <div className="search-container">
      <div className={`search-div1 ${themeState && "search-div1-D"}`}>
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
      <div className={`${themeState ? "search-div2-D" : "search-div2"}`}>
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
