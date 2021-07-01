import { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { NodeInterface } from '../node/raw_node'
import { EditorState } from '../state/editor_state'
import './menu.scss'

interface Props {
  onThemeChange: () => void
  state: EditorState
}

// TODO: actually make a menu list
function Menu(props: Props) {
  let menuList: JSX.Element[] = []

  let curr: NodeInterface | null = props.state.active
  console.log('Menu construction')

  while (curr !== null) {
    console.log(`On ${curr.id}, ${curr.text}`)

    menuList.push(
      <Link to={{ pathname: `/${curr.id}` }} className="path-link">
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
    <Link key={'root'} to={{ pathname: '/' }} className="path-link">
      Home
    </Link>
  )

  menuList.reverse()

  return (
    <div id="listHeader">
      <div id="nodePath">
        {menuList}
        {/* {menu} */}
      </div>
      <label className="switch">
        <input id="showCompletedSwitch" type="checkbox" onChange={_ => props.onThemeChange()} />
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default Menu
