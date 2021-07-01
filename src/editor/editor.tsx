import { useEffect, useReducer } from 'react'
import RawNode from '../node/raw_node'
import Node from '../node/node'
import { EditorState, LOAD, stateReducer } from '../state/state'
import './editor.scss'
import Menu from '../menu/menu'

const initialState: EditorState = {
  rootEditorState: new RawNode('', ''),
  editorState: new RawNode('', ''),
  zoomedInItemId: ''
}

interface EditorProps {
  source: string
  hash: string | undefined
  onThemeChange: () => void
}

function Editor(props: EditorProps) {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  // Detect the currently loading page
  // const { hash } = props
  //   console.log(`Hash: ${hash}`)

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
        <Menu onThemeChange={props.onThemeChange}></Menu>
      </div>

      <div id="listContainer">
        <div id="currentFilters"></div>
        <div id="list" className="root-children">
          <Node {...state.editorState}></Node>
          {/* <div className="loader"></div> */}
        </div>
      </div>
    </div>
  )
}

export default Editor
