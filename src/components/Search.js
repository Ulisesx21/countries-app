
import "../css/Search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default function Search({ mode, change, search }){

    const element = <FontAwesomeIcon icon={faSearch} className={`${mode ? "element-D" : "element" }`}/>

    return(
        <div className="search-container">
            <div className={`${mode ? "search-div1-D" : "search-div1" }`}>
                <form onSubmit={(e)=>{
                    search(e)
                    e.currentTarget.input.value = ""
                }}>
                    <label>
                        {element}
                        <input name="input" placeholder="Search for a country..."></input> 
                    </label>
                </form>
            </div>
            <div className={`${mode ? "search-div2-D" : "search-div2" }`}>
                <select onChange={change}>
                    <option disabled selected>Filter by Region</option>
                    <option>All</option>
                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                </select>
            </div>
        </div>
    )
}