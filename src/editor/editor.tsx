import React, { useEffect } from "react"
import logo from "../assets/logo.svg"
import Node from "../node/node"
import State from "../state/state"
import "./editor.scss"

function Editor() {
  const rawJson = `{
    "id": "asdf",
    "text": "",
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

  // editorState.loadText();

  const editorState = State(rawJson)

  // TODO: use this to download/sync state
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked Hello`
  })

  return (
    <div id="listContainer">
      <div id="currentFilters"></div>
      <div id="list">
        {/* <div className="loader"></div> */}
        {/* <Node text="This is my text" isExpanded={true}></Node> */}
      </div>
    </div>
  )
}

export default Editor
