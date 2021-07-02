import { BrowserRouter as Router, Route } from 'react-router-dom'
import Editor from '../editor/editor'
import { useTheme } from '../helpers/theme'

const rawJson = `{
  "id": "a",
  "text": "a",
  "children": [{
      "id": "b",
      "text": "b",
      "children": [
          {
            "id": "j",
            "text": "jasdfasdf"
          },
          {
            "id": "k",
            "text": "kasdfasdf"
          },
          {
              "id": "l",
              "text": "aasdfl"
            },
            {
              "id": "m",
              "text": "masdfasdf"
            },
            {
              "id": "n",
              "text": "nasdfasdf"
            },
            {
              "id": "p",
              "text": "pasdfasdf"
            },
            {
              "id": "j",
              "text": "jasdfasdf"
            },
            {
              "id": "k",
              "text": "kasdfasdf"
            },
            {
                "id": "l",
                "text": "aasdfl"
              },
              {
                "id": "m",
                "text": "masdfasdf"
              },
              {
                "id": "n",
                "text": "nasdfasdf"
              },
              {
                "id": "p",
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
      "text": "My Code Block<br>Now with newlines!",
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
