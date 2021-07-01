import { useEffect, useState } from 'react'
import { storage_put, storage_get } from './local_storage'
import _ from 'lodash'

export const useTheme = () => {
  //   const [mode, setMode] = useState('light')
  const [theme, setTheme] = useState('light')
  const [themeLoaded, setThemeLoaded] = useState(false)

  const toggleTheme = () => {
    if (theme == 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  const setMode = (mode: any) => {
    storage_put('curr_theme', mode)
    console.log('Switchming mode')

    if (mode === 'light') {
      document.documentElement.className = ''
      document.documentElement.classList.add(`theme-dark`)
      setTheme('light')
    } else {
      setTheme('dark')
      document.documentElement.className = ''
      document.documentElement.classList.add(`theme-light`)
    }
  }

  // const getFonts = () => {
  //   const allFonts = _.values(_.mapValues(themes.data, 'font'))
  //   return allFonts
  // }

  useEffect(() => {
    const localTheme = storage_get('curr_theme')
    localTheme ? setMode(localTheme) : setMode('light')
    setThemeLoaded(true)
  }, [])

  return { theme, themeLoaded, setMode, toggleTheme }
}
