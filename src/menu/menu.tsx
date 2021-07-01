import { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import './menu.scss'

interface Props {
  onThemeChange: () => void
}

// TODO: actually make a menu list
function Menu(props: Props) {
  return (
    <div id="listHeader">
      <div id="nodePath">
        <Link to={{ pathname: '/a' }} className="path-link">
          Page
        </Link>

        {'  >   '}

        <Link to={{ pathname: '/b' }} className="path-link">
          Page
        </Link>
      </div>
      <label className="switch">
        <input id="showCompletedSwitch" type="checkbox" onChange={_ => props.onThemeChange()} />
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default Menu
