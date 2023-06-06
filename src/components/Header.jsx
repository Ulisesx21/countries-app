import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../context/Context";

export default function Header() {
  const { themeState, setThemeState } = useContext(ThemeContext);

  const Moon = (
    <FontAwesomeIcon
      icon={faMoon}
      className={`${themeState ? "i-moon-D" : "i-moon"}`}
    />
  );
  const Sun = (
    <FontAwesomeIcon
      icon={faSun}
      className={`${themeState ? "i-moon-D" : "i-moon"}`}
    />
  );

  return (
    <header className={`${themeState ? "Header-D" : "Header-L"}`}>
      <div>Where in the world?</div>
      <div className="mode">
        <button
          className={`${themeState ? "btn-mode-D" : "btn-mode"}`}
          onClick={() => setThemeState(!themeState)}
        >
          {themeState ? Sun : Moon}
          {themeState ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}
