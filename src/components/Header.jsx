import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import "../styles/Header.css";

export default function Header() {
  const { isDark, setIsDark } = useTheme();

  const Moon = (
    <FontAwesomeIcon
      icon={faMoon}
      className={`i-moon ${isDark && "i-moon-D"}`}
    />
  );
  const Sun = (
    <FontAwesomeIcon
      icon={faSun}
      className={`i-moon ${isDark && "i-moon-D"}`}
    />
  );

  return (
    <header className={`Header-L ${isDark && "Header-D"}`}>
      <div>Where in the world?</div>
      <div className="mode">
        <button
          className={`btn-mode ${isDark && "btn-mode-D"}`}
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? Sun : Moon}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}
