import { Link } from 'react-router-dom'
import NodeData from '../models/node_data'
import { EditorState } from '../services/state_controller'

import './menu.scss'

interface Props {
  onThemeChange: () => void
  state: EditorState
}

// TODO: actually make a menu list
function Menu(props: Props) {
  let menuList: JSX.Element[] = []
  let curr: NodeData | null = props.state.active

  while (curr !== null) {
    menuList.push(
      <Link to={{ pathname: `/${curr.id}` }} key={'menu-link-' + curr.id} className="path-link">
        {curr.text}
      </Link>
    )

    menuList.push(<>{'  >  '}</>)
    let next = props.state.parents.get(curr.id)

    if (next !== undefined) {
      curr = next
    } else {
      break
    }
  }

  menuList.push(
    <Link to={{ pathname: '/' }} key={'root_menu'} className="path-link">
      Home
    </Link>
  )

  menuList.reverse()

  return (
    <div id="listHeader">
      <div id="nodePath">
        {menuList}
      </div>
      <label className="switch">
        <input id="showCompletedSwitch" type="checkbox" onChange={_ => props.onThemeChange()} />
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default Menu
