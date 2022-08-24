import "../css/Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"


export default function Header({ mode }){

    let [lmode, setLmode] = useState(true)

    const Moon = <FontAwesomeIcon icon={faMoon} className={`${lmode ? "i-moon" : "i-moon-D"}`}/>

    function handleMode(){
        setLmode(!lmode)
        return mode(lmode)
    }

    return(
        <header className={`${lmode ? "Header-L" : "Header-D"}`}>
            <div>
                Where in the world?
            </div>
            <div className="mode">
                <button className={`${lmode ? "btn-mode" : "btn-mode-D"}`} onClick={handleMode}>
                    {Moon}
                    Dark Mode
                </button>
            </div>
        </header>
    )
}