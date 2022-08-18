
import "../css/Search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default function Search(props){

    const element = <FontAwesomeIcon icon={faSearch} className={`${props.mode ? "element-D" : "element" }`}/>

    return(
        <div className="search-container">
            <div className={`${props.mode ? "search-div1-D" : "search-div1" }`}>
                <form onSubmit={(e)=>{
                    props.search(e)
                    e.currentTarget.input.value = ""
                }}>
                    <label>
                        {element}
                        <input name="input" placeholder="Search for a country..."></input> 
                    </label>
                </form>
            </div>
            <div className={`${props.mode ? "search-div2-D" : "search-div2" }`}>
                <select onChange={props.change}>
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