import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../styles/Detalles.css";
import { ThemeContext } from "../context/Context";
import { instance } from "../api/base.api";

export default function Detalles() {
  const [countries, setCountries] = useState();

  let query = new URLSearchParams(window.location.search);
  let name = query.get("name");

  const { themeState } = useContext(ThemeContext);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await instance.get(`name/${name}?fullText=true`);
        setCountries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountry();
  }, [name]);

  const Left = <FontAwesomeIcon icon={faArrowLeft} className="left" />;

  return (
    <div className={`detalle-container ${themeState && "detalle-container-D"}`}>
      <div className={themeState ? "back-btn-D" : "back-btn"}>
        <Link to={`/`} className="back-btn-link">
          <button>{Left} Back</button>
        </Link>
      </div>
      {countries ? (
        countries.map((country, i) => (
          <div className="img-detalle" key={i}>
            <div>
              <img src={country.flags.png} alt={country.name.common} />
            </div>
            <div className="desciption-title-container">
              <div
                className={`description-title ${
                  themeState && "description-title-D"
                }`}
              >
                <h3>{country.name.common}</h3>
              </div>
              <div className="description">
                <div
                  className={`description-div1 ${
                    themeState && "description-div1-D"
                  }`}
                >
                  <p>
                    <span>Native Name: </span>
                    {
                      country.name.nativeName[
                        Object.keys(country.name.nativeName)[
                          Object.keys(country.name.nativeName).length - 1
                        ]
                      ].common
                    }
                  </p>
                  <p>
                    <span>Population: </span>
                    {country.population.toLocaleString("en-US")}
                  </p>
                  <p>
                    <span>Region:</span> {country.region}
                  </p>
                  <p>
                    <span>Sub Region:</span> {country.subregion}
                  </p>
                  <p>
                    <span>Capital:</span> {country.capital}
                  </p>
                </div>
                <div
                  className={`description-div2 ${
                    themeState && "description-div2-D"
                  }`}
                >
                  <p>
                    <span>Top Level Domain:</span>{" "}
                    {country.tld[0] ? country.tld[0] : "none"}
                  </p>
                  <p>
                    <span>Currencies:</span>{" "}
                    {
                      country.currencies[Object.keys(country.currencies)[0]]
                        .name
                    }
                  </p>
                  <p>
                    <span>Languages:</span>{" "}
                    {Object.values(country.languages).join(", ")}
                  </p>
                </div>
              </div>
              <div className="borders-container">
                <h5 className={`brd ${themeState && "brd-D"}`}>
                  Border Countries:
                </h5>
                <div className="brd-c">
                  <div className="div-brd-container">
                    {country.borders ? (
                      country.borders.map((border, i) => (
                        <div
                          className={themeState ? "borders-D" : "borders"}
                          key={i}
                        >
                          {border}
                        </div>
                      ))
                    ) : (
                      <div className={themeState ? "borders-D" : "borders"}>
                        None
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={themeState ? "loading-D" : "loading"}>Loading...</div>
      )}
    </div>
  );
}
