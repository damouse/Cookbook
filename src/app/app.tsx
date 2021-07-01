import { BrowserRouter as Router, Route } from 'react-router-dom'
import Editor from '../editor/editor'
import { useTheme } from '../helpers/theme'

const rawJson = `{
  "id": "a",
  "text": "a",
  "children": [{
      "id": "b",
      "text": "b"
    },
    {
      "id": "c",
      "text": "c"
    },
    {
      "id": "d",
      "text": "My Code Block",
      "isCode": true
    },
    {
      "id": "e",
      "text": "e",
      "children": [
        {
          "id": "f",
          "text": "f"
        },
        {
          "id": "g",
          "text": "g"
        }
      ]
    }
  ]
}`

const App = () => {
  const { theme, themeLoaded, setMode, toggleTheme } = useTheme()
  // const [selectedTheme, setSelectedTheme] = useState(theme)

  return (
    <>
      {themeLoaded && (
        <Router>
          <Route
            exact
            path="/"
            render={(_: any) => (
              <Editor onThemeChange={toggleTheme} source={rawJson} hash={undefined} />
            )}
          />
          <Route
            path="/:hash"
            render={props => (
              <Editor onThemeChange={toggleTheme} source={rawJson} hash={props.match.params.hash} />
            )}
          />
        </Router>
      )}
    </>
  )
}

export default App
