import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import "../css/Detalles.css"


export default function Detalles({ mode }){

    let [countries, setCountries] = useState()

    let query = new URLSearchParams(window.location.search)

    let name = query.get("name")

    useEffect(()=>{
        fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(res => res.json())
            .then(data => setCountries(data))
            .catch(err => console.log(err))
    },[name])

    const Left = <FontAwesomeIcon icon={faArrowLeft} className="left"/>
    
    return (
        <div className={`detalle-container ${mode && "detalle-container-D"}`}>
            <div className={mode ? "back-btn-D" : "back-btn"}>
                <Link to={`/countries-app`} className="back-btn-link"><button>{Left} Back</button></Link>
            </div>
            {countries ? countries.map((country,i)=> 
            
            <div className="img-detalle" key={i}>
                <div>
                    <img src={country.flags.png} alt={country.name.common}/>
                </div>
                <div className="desciption-title-container">
                    <div className={`description-title ${mode && "description-title-D"}`}>
                        <h3>{country.name.common}</h3>
                    </div>
                    <div className="description">
                        <div className={`description-div1 ${mode && "description-div1-D"}`}>
                            <p><span>Native Name: </span> 
                             {country.name.nativeName[Object.keys(country.name.nativeName)[Object.keys(country.name.nativeName).length-1]].common}
                            </p>
                            <p><span>Population: </span>{country.population.toLocaleString('en-US')}</p>
                            <p><span>Region:</span> {country.region}</p>
                            <p><span>Sub Region:</span> {country.subregion}</p>
                            <p><span>Capital:</span> {country.capital}</p>
                        </div>
                        <div className={`description-div2 ${mode && "description-div2-D"}`}>
                            <p><span>Top Level Domain:</span> {country.tld[0]}</p>
                            <p><span>Currencies:</span> {country.currencies[Object.keys(country.currencies)[0]].name}</p>
                            <p><span>Languages:</span> {Object.values(country.languages).join(", ")}</p>
                        </div>
                    </div>
                    <div className="borders-container">
                        <h5 className={`brd ${mode && "brd-D"}`}>Border Countries:</h5>
                        <div className="brd-c">
                            <div className="div-brd-container">
                                {country.borders ? country.borders.map((border,i)=> <div className={mode ? "borders-D" : "borders"} key={i}>{border}</div>) : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            ) 
                : <div className={mode ? "loading-D" : "loading"}>Loading...</div>}
        </div>
    )
}