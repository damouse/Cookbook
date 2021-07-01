import React, { useEffect, useReducer } from "react"
import RawNode from "../helpers/raw_node"
import Node from "../node/node"
import { EditorActions, EditorState, LOAD, stateReducer } from "../state/state"
import "./editor.scss"

const initialState: EditorState = {
  rootEditorState: new RawNode("", ""),
  editorState: new RawNode("", ""),
  zoomedInItemId: "",
}

interface EditorProps {
  source: string
}

function Editor(props: EditorProps) {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  // This should only run once, on startup. Its not.
  useEffect(() => {
    dispatch({ type: LOAD, source: props.source })
  }, [props.source])

  return (
    <div id="listContainer">
      <div id="currentFilters"></div>
      <div id="list" className="root-children">
        <Node {...state.editorState}></Node>
        {/* <div className="loader"></div> */}
      </div>
    </div>
  )
}

export default Editor
