import { BrowserRouter as Router, Route } from 'react-router-dom'
import Editor from '../editor/editor'
import { useTheme } from '../helpers/theme'
import { DepsProvider } from '../services/context'

const rawJson = `{
  "id": "a",
  "text": "a",
  "children": [{
      "id": "b",
      "text": "b",
      "children": [
          {
            "id": "j",
            "text": "aaasdfasdf"
          },
          {
            "id": "k",
            "text": "bbsdfasdf"
          },
          {
              "id": "l",
              "text": "aasdfl"
            },
            {
              "id": "m",
              "text": "basdfasdf"
            },
            {
              "id": "n",
              "text": "casdfasdf"
            },
            {
              "id": "p",
              "text": "dasdfasdf"
            },
            {
              "id": "t",
              "text": "easdfasdf"
            },
            {
              "id": "u",
              "text": "kasdfasdf"
            },
            {
                "id": "q",
                "text": "aasdfl"
              },
              {
                "id": "r",
                "text": "masdfasdf"
              },
              {
                "id": "s",
                "text": "nasdfasdf"
              },
              {
                "id": "w",
                "text": "pasdfasdf"
              }
        ]
    },
    {
      "id": "c",
      "text": "c"
    },
    {
      "id": "d",
      "text": "My Code Block\\nNow with newlines!",
      "isCode": true,
      "children": [
        {
          "id": "h",
          "text": "Some insightful comment"
        },
        {
          "id": "i",
          "text": "Another Insightful Comment"
        }
      ]
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
  const { themeLoaded, toggleTheme } = useTheme()
  // const [selectedTheme, setSelectedTheme] = useState(theme)

  return (
    // <>
    // TODO: can the controller for this be attached to the editor directly?
    // I'm not sure I love the use of context here for DI. It seems like overkill.
    <DepsProvider>
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
    </DepsProvider>
  )
}

export default App
