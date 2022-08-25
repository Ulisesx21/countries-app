
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
import swal from 'sweetalert';
import "../css/Main.css"

export default function Main({ mode }) {

    let [countries, setCountries] = useState()


    useEffect(() => {

        axios.get("https://restcountries.com/v3.1/all")
            .then(res => {
                let data = res.data;
                setCountries(data)
            }
            )
            .catch(err => swal("Error", "Something has wrong..."))

    }, [])


    function changeRegion(e) {
        setCountries("")
        if (e.target.value === "All") {

            axios.get("https://restcountries.com/v3.1/all")
                .then(res => {
                    let data = res.data;
                    setCountries(data)
                })
                .catch(err => swal("Error", "Something has wrong..."))

        } else {

            axios.get(`https://restcountries.com/v3.1/region/${e.target.value}`)
                .then(res => {
                    let data = res.data;
                    setCountries(data)
                })
                .catch(err => swal("Error", "Something has wrong..."))
        }
    }

    function changeCountrie(e) {
        e.preventDefault()
        e = e.currentTarget.input.value


        axios.get(`https://restcountries.com/v3.1/name/${e}`)
            .then(res => {
                let data = res.data;
                setCountries(data)
            }
            )
            .catch(err => swal("Error", "Country not found..."))

    }


    return (
        <div className={`main ${mode && "main-D"}`}>
            <Search change={changeRegion} search={changeCountrie} mode={mode} />
            <div className={`countries-container ${mode && "countries-container-D"}`}>
                {countries ? countries.map((country, i) =>
                    <div className={`countrie-container ${mode && "countrie-container-D"}`} key={i}>
                        <div className="img-container">
                            <img src={country.flags.png} alt={country.name.common} />
                        </div>
                        <div className={`information-container ${mode && "information-container-D"}`}>
                            <h3>
                                <Link to={`/detalle?name=${country.name.common}`} className={`a-titulo ${mode && "a-titulo-D"}`}>
                                    {country.name.common}
                                </Link>
                            </h3>
                            <p><span>Population: </span>{`${country.population.toLocaleString('en-US')}`}</p>
                            <p><span>Region: </span>{`${country.region}`}</p>
                            <p><span>Capital: </span>{`${country.capital}`}</p>
                        </div>
                    </div>
                )
                    : <div className={mode ? "loading-D" : "loading"}>Loading...</div>}
            </div>
        </div>
    )
}