import { BrowserRouter as Router, Route } from "react-router-dom"
import Editor from "../editor/editor"

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

const App = () => {
  return (
    <>
      <Router>
        <Route
          exact
          path="/"
          render={(_: any) => <Editor source={rawJson} hash={undefined} />}
        />
        <Route
          path="/:hash"
          render={(props) => (
            <Editor source={rawJson} hash={props.match.params.hash} />
          )}
        />
      </Router>
    </>
  )
}

export default App
