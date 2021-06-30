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

function Editor() {
  const [state, dispatch] = useReducer<
    React.Reducer<EditorState, EditorActions>
  >(stateReducer, initialState)

  // editorState.loadText();
  // const editorState = State(rawJson)

  // TODO: use this to download/sync state
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked Hello`

    const rawJson = `{
      "id": "asdf",
      "text": "first",
      "children": [{
          "id": "b",
          "text": "1"
        },
        {
          "id": "c",
          "text": "2"
        }
      ]
    }`

    dispatch({ type: LOAD, source: rawJson })
  })

  return (
    <div id="listContainer">
      <div id="currentFilters"></div>
      <div id="list">
        <Node {...state.editorState}></Node>
        {/* <div className="loader"></div> */}
        {/* <Node text="This is my text" isExpanded={true}></Node> */}
      </div>
    </div>
  )
}

export default Editor
