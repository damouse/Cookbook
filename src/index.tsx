import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import reportWebVitals from "./reportWebVitals"

import App from "./app/app"
import Editor from "./editor/editor"

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
    },
    {
      "id": "c",
      "text": "My Code Block",
      "isCode": true
    },
    {
      "id": "c",
      "text": "2"
    }
  ]
}`

ReactDOM.render(<Editor source={rawJson} />, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
