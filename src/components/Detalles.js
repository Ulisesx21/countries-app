import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import "../css/Detalles.css"


export default function Detalles(props){

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
        <div className={`detalle-container ${props.mode ? "detalle-container-D" : ""}`}>
            <div className={props.mode ? "back-btn-D" : "back-btn"}>
                <Link to={`/countries-app`} className="back-btn-link"><button>{Left} Back</button></Link>
            </div>
            {countries ? countries.map((i,o)=> 
            
            <div className="img-detalle" key={o}>
                <div>
                    <img src={i.flags.png} alt={i.name.common}/>
                </div>
                <div className="desciption-title-container">
                    <div className={`description-title ${props.mode ? "description-title-D" : ""}`}>
                        <h3>{i.name.common}</h3>
                    </div>
                    <div className="description">
                        <div className={`description-div1 ${props.mode ? "description-div1-D" : ""}`}>
                            <p><span>Native Name: </span> 
                             {i.name.nativeName[Object.keys(i.name.nativeName)[Object.keys(i.name.nativeName).length-1]].common}
                            </p>
                            <p><span>Population: </span>{i.population.toLocaleString('en-US')}</p>
                            <p><span>Region:</span> {i.region}</p>
                            <p><span>Sub Region:</span> {i.subregion}</p>
                            <p><span>Capital:</span> {i.capital}</p>
                        </div>
                        <div className={`description-div2 ${props.mode ? "description-div2-D" : ""}`}>
                            <p><span>Top Level Domain:</span> {i.tld[0]}</p>
                            <p><span>Currencies:</span> {i.currencies[Object.keys(i.currencies)[0]].name}</p>
                            <p><span>Languages:</span> {Object.values(i.languages).join(", ")}</p>
                        </div>
                    </div>
                    <div className="borders-container">
                        <h5 className={`brd ${props.mode ? "brd-D" : ""}`}>Border Countries:</h5>
                        <div className="brd-c">
                            <div className="div-brd-container">
                                {i.borders ? i.borders.map((i,o)=> <div className={props.mode ? "borders-D" : "borders"} key={o}>{i}</div>) : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            ) 
                : <div className={props.mode ? "loading-D" : "loading"}>Loading...</div>}
        </div>
    )
}