import { useEffect, useReducer } from 'react'
import NodeData from '../models/node_data'
import Node from '../nodes/node'
import { CHANGE, LOAD, stateReducer } from '../state/state_resolver'
import './editor.scss'
import Menu from '../menu/menu'
import { EditorState } from '../state/editor_state'
import NodeFactory from '../nodes/node_factory'

// A little chunky. Why does the editor class have to have all these details?
// maybe sink this into state somehow?
const initialState: EditorState = {
  root: new NodeData(),
  active: new NodeData(),
  target: '',
  nodes: new Map<string, NodeData>(),
  parents: new Map<string, NodeData | null>(),
  focus: null
}

interface EditorProps {
  // TODO: move this somewhere else?
  source: string
  hash: string | undefined
  onThemeChange: () => void
}

function Editor(props: EditorProps) {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  // This should only run once, on startup. Its not.
  useEffect(() => {
    dispatch({ type: LOAD, source: props.source })
  }, [props.source])

  useEffect(() => {
    if (props.hash !== undefined && props.hash !== state.target) {
      dispatch({ type: CHANGE, target: props.hash })
    }
  }, [props.hash])

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
          <NodeFactory data={state.active} dispatch={dispatch} focus={state.focus} depth={0} />
          {/* <Node {...state.active} dispatch={dispatch} focus={state.focus} depth={0}></Node> */}
          {/* <div className="loader"></div> */}
        </div>
      </div>
    </div>
  )
}

export default Editor
