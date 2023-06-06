import { Link } from "react-router-dom";
import { ThemeContext } from "../context/Context";
import { useContext } from "react";
import "../styles/Country.css";

export const CountryItem = ({ country }) => {
  const { themeState } = useContext(ThemeContext);

  return (
    <div
      className={`countrie-container ${themeState && "countrie-container-D"}`}
    >
      <div className="img-container">
        <img src={country.flags.png} alt={country.name.common} />
      </div>
      <div
        className={`information-container ${
          themeState && "information-container-D"
        }`}
      >
        <h3>
          <Link
            to={`/detalle?name=${country.name.common}`}
            className={`a-titulo ${themeState && "a-titulo-D"}`}
          >
            {country.name.common}
          </Link>
        </h3>
        <p>
          <span>Population: </span>
          {`${country.population.toLocaleString("en-US")}`}
        </p>
        <p>
          <span>Region: </span>
          {`${country.region}`}
        </p>
        <p>
          <span>Capital: </span>
          {`${country.capital}`}
        </p>
      </div>
    </div>
  );
};
