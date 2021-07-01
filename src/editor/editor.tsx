import { useEffect, useReducer } from 'react'
import RawNode, { NodeInterface } from '../node/raw_node'
import Node from '../node/node'
import { EditorState, LOAD, stateReducer } from '../state/state'
import './editor.scss'
import Menu from '../menu/menu'

const initialState: EditorState = {
  root: new RawNode('', ''),
  active: new RawNode('', ''),
  zoomedInItemId: '',
  ancestors: new Map<string, NodeInterface | null>()
}

interface EditorProps {
  // TODO: move this somewhere else?
  source: string
  hash: string | undefined
  onThemeChange: () => void
}

function Editor(props: EditorProps) {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  // Detect the currently loading page. TODO: forward to State and activate the correct
  // node for this path. TODO: this should probably be done lazily.
  // const { hash } = props
  // console.log(`Hash: ${hash}`)

  // This should only run once, on startup. Its not.
  useEffect(() => {
    dispatch({ type: LOAD, source: props.source })
  }, [props.source])

  return (
    <div>
      <div id="pageHeader">
        <h1>
          <a href="/">Cookbook</a>
        </h1>
      </div>

      <div id="listHeader">
        <Menu onThemeChange={props.onThemeChange} state={state}></Menu>
      </div>

      <div id="listContainer">
        <div id="currentFilters"></div>
        <div id="list" className="root-children">
          <Node {...state.active}></Node>
          {/* <div className="loader"></div> */}
        </div>
      </div>
    </div>
  )
}

export default Editor
