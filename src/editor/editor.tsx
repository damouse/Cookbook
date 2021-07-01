import { useEffect, useReducer } from 'react'
import RawNode, { NodeInterface } from '../node/raw_node'
import Node from '../node/node'
import { CHANGE, LOAD, stateReducer } from '../state/state_resolver'
import './editor.scss'
import Menu from '../menu/menu'
import { EditorState } from '../state/editor_state'

// A little chunky. Why does the editor class have to have all these details?
// maybe sink this into state somehow?
const initialState: EditorState = {
  root: new RawNode(),
  active: new RawNode(),
  target: '',
  nodes: new Map<string, RawNode>(),
  parents: new Map<string, RawNode | null>(),
  // siblingIndex: new Map<string, number>(),
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

  // Detect the currently loading page. TODO: forward to State and activate the correct
  // node for this path. TODO: this should probably be done lazily.

  // This should only run once, on startup. Its not.
  useEffect(() => {
    dispatch({ type: LOAD, source: props.source })

    const { hash } = props

    if (hash !== undefined && hash !== state.target) {
      // console.log(`Hash: ${hash}, state target: ${state.target}`)
      dispatch({ type: CHANGE, target: hash })
    }
  }, [props.source])

  useEffect(() => {
    const { hash } = props

    if (hash !== undefined && hash !== state.target) {
      console.log(`Hash: ${hash}, state target: ${state.target}`)
      dispatch({ type: CHANGE, target: hash })
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
          <Node {...state.active} dispatch={dispatch} focus={state.focus}></Node>
          {/* <div className="loader"></div> */}
        </div>
      </div>
    </div>
  )
}

export default Editor
