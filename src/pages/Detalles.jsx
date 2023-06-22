import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/themeContext";
import { instance } from "../utils/config/axios.config";
import { Link } from "react-router-dom";
import "../styles/Detalles.css";

export default function Detalles() {
  
  const [country, setCountry] = useState();

  const query = new URLSearchParams(window.location.search);
  const name = query.get("name");

  const { isDark } = useTheme();

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await instance.get(`name/${name}?fullText=true`);
        setCountry(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountry();
  }, [name]);

  const Left = <FontAwesomeIcon icon={faArrowLeft} className="left" />;

  return (
    <div className={`detalle-container ${isDark && "detalle-container-D"}`}>
      <div className={isDark ? "back-btn-D" : "back-btn"}>
        <Link to={`/countries-app`} className="back-btn-link">
          <button>{Left} Back</button>
        </Link>
      </div>
      {country ? (
        country.map((country, i) => (
          <div className="img-detalle" key={i}>
            <div>
              <img src={country?.flags?.png} alt={country?.name?.common} />
            </div>
            <div className="desciption-title-container">
              <div
                className={`description-title ${
                  isDark && "description-title-D"
                }`}
              >
                <h3>{country.name.common || "None"}</h3>
              </div>
              <div className="description">
                <div
                  className={`description-div1 ${
                    isDark && "description-div1-D"
                  }`}
                >
                  <p>
                    <span>Native Name: </span>
                    {country.name.nativeName
                      ? country.name.nativeName[
                          Object.keys(country.name.nativeName)[
                            Object.keys(country.name.nativeName).length - 1
                          ]
                        ].common
                      : country.name.common}
                  </p>
                  <p>
                    <span>Population: </span>
                    {country.population
                      ? country.population.toLocaleString("en-US")
                      : "None"}
                  </p>
                  <p>
                    <span>Region:</span> {country.region || "None"}
                  </p>
                  <p>
                    <span>Sub Region:</span> {country.subregion || "None"}
                  </p>
                  <p>
                    <span>Capital:</span> {country.capital || "None"}
                  </p>
                </div>
                <div
                  className={`description-div2 ${
                    isDark && "description-div2-D"
                  }`}
                >
                  <p>
                    <span>Top Level Domain:</span> {country.tld[0] || "None"}
                  </p>
                  <p>
                    <span>Currencies:</span>{" "}
                    {country.currencies
                      ? country.currencies[Object.keys(country.currencies)[0]]
                          .name
                      : "None"}
                  </p>
                  <p>
                    <span>Languages:</span>{" "}
                    {country.languages
                      ? Object.values(country.languages).join(", ")
                      : "None"}
                  </p>
                </div>
              </div>
              <div className="borders-container">
                <h5 className={`brd ${isDark && "brd-D"}`}>
                  Border Countries:
                </h5>
                <div className="brd-c">
                  <div className="div-brd-container">
                    {country.borders ? (
                      country.borders.map((border, i) => (
                        <div
                          className={isDark ? "borders-D" : "borders"}
                          key={i}
                        >
                          {border}
                        </div>
                      ))
                    ) : (
                      <div className={isDark ? "borders-D" : "borders"}>
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
        <div className={isDark ? "loading-D" : "loading"}>Loading...</div>
      )}
    </div>
  );
}
