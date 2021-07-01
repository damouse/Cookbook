import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Editor from '../editor/editor'
import { GlobalStyles } from '../theme/global_styles'
import { useTheme } from '../theme/theme'

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
      "id": "d",
      "text": "My Code Block",
      "isCode": true
    },
    {
      "id": "e",
      "text": "2"
    }
  ]
}`

const App = () => {
  const { theme, themeLoaded, setMode } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(theme)

  useEffect(() => {
    setSelectedTheme(theme)
  }, [themeLoaded])

  function onThemeChange() {
    if (theme.name == 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  console.log(`Theme changed: ${theme}`)

  return (
    <>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <Router>
            <Route
              exact
              path="/"
              render={(_: any) => (
                <Editor onThemeChange={onThemeChange} source={rawJson} hash={undefined} />
              )}
            />
            <Route
              path="/:hash"
              render={props => (
                <Editor
                  onThemeChange={onThemeChange}
                  source={rawJson}
                  hash={props.match.params.hash}
                />
              )}
            />
          </Router>
        </ThemeProvider>
      )}
    </>
  )

  // return (
  //   <>
  //     <Router>
  //       <Route exact path="/" render={(_: any) => <Editor source={rawJson} hash={undefined} />} />
  //       <Route
  //         path="/:hash"
  //         render={props => <Editor source={rawJson} hash={props.match.params.hash} />}
  //       />
  //     </Router>
  //   </>
  // )
}

export default App
