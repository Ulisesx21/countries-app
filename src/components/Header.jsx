import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/themeContext";
import "../styles/Header.css";

export default function Header() {

  const { isDark, setIsDark } = useTheme();

  const Moon = (
    <FontAwesomeIcon
      icon={faMoon}
      className={`${isDark ? "i-moon-D" : "i-moon"}`}
    />
  );
  const Sun = (
    <FontAwesomeIcon
      icon={faSun}
      className={`${isDark ? "i-moon-D" : "i-moon"}`}
    />
  );

  return (
    <header className={`${isDark ? "Header-D" : "Header-L"}`}>
      <div>Where in the world?</div>
      <div className="mode">
        <button
          className={`${isDark ? "btn-mode-D" : "btn-mode"}`}
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? Sun : Moon}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}
