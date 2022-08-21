
import { useState, useEffect } from "react";
import "../css/Main.css"
import Search from "./Search";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

export default function Main(props) {

    let [countries, setCountries] = useState()
    let [validCountries, setValidCountries] = useState()


    useEffect(() => {

        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(data => {
                let c = ["brasil"]
                data.map(i => c.push(i.name.common.toLowerCase(),i.name.official.toLowerCase()))
                setCountries(data)
                setValidCountries(c)
            })
            .catch(err => console.log(err))

    }, [])


    function changeRegion(e) {
        setCountries("")
        if (e.target.value === "All") {
            fetch(`https://restcountries.com/v3.1/all`)
                .then(res => res.json())
                .then(data => setCountries(data))
                .catch(err => console.log(err))
        } else {
            fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
                .then(res => res.json())
                .then(data => setCountries(data))
                .catch(err => console.log(err))
        }
    }

    function changeCountrie(e) {
        e.preventDefault()
        e = e.currentTarget.input.value

        if (!validCountries.includes(e.toLowerCase())) {
            swal("Error","Country not found...")
        }
        else {
            fetch(`https://restcountries.com/v3.1/name/${e}`)
                    .then(res => res.json())
                    .then(data => setCountries(data))
                    .catch(err => alert(err))
        }
    }


    return (
        <div className={`main ${props.mode ? "main-D" : ""}`}>
            <Search change={changeRegion} search={changeCountrie} mode={props.mode}/>
            <div className={`countries-container ${props.mode ? "countries-container-D" : ""}`}>
                {countries ? countries.map((i, o) =>
                    <div className={`countrie-container ${props.mode ? "countrie-container-D" : ""}`} key={o}>
                        <div className="img-container">
                            <img src={i.flags.png} alt={i.name.common} />
                        </div>
                        <div className={`information-container ${props.mode ? "information-container-D" : ""}`}>
                            <h3>
                                <Link to={`/detalle?name=${i.name.common}`} className={`a-titulo ${props.mode ? "a-titulo-D" : ""}`}>
                                {i.name.common}
                                </Link>
                            </h3>
                            <p><span>Population: </span>{`${i.population.toLocaleString('en-US')}`}</p>
                            <p><span>Region: </span>{`${i.region}`}</p>
                            <p><span>Capital: </span>{`${i.capital}`}</p>
                        </div>
                    </div>
                )
                    : <div className={props.mode ? "loading-D" : "loading"}>Loading...</div>}
            </div>
        </div>
    )
}