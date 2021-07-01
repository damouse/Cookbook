import { Link } from "react-router-dom"
import "./menu.scss"

// TODO: actually make a menu list
function Menu() {
  return (
    <div id="nodePath">
      <Link to={{ pathname: "/a" }} className="path-link">
        Page
      </Link>

      {"  >   "}

      <Link to={{ pathname: "/b" }} className="path-link">
        Page
      </Link>
    </div>
    // <div>
    //   <h1>Page Title</h1>
    //   <p>Other STuff</p>
    // </div>
    // <div id="listContainer">
    //   <div id="currentFilters"></div>
    //   <div id="list">
    //     <div className="loader"></div>
    //   </div>
    // </div>
  )
}

export default Menu
