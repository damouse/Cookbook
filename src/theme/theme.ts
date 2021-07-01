import { useEffect, useState } from 'react'
import { storage_put, storage_get } from '../helpers/local_storage'
import _ from 'lodash'
import * as themes from './scheme.json'

export const useTheme = () => {
  //   const [mode, setMode] = useState('light')
  const [theme, setTheme] = useState(themes.data.light)
  const [themeLoaded, setThemeLoaded] = useState(false)

  const setMode = (mode: any) => {
    storage_put('curr_theme', mode)

    console.log('Switchming mode')
    if (mode === 'light') {
      setTheme(themes.data.light)
    } else {
      setTheme(themes.data.dark)
    }
  }

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes.data, 'font'))
    return allFonts
  }

  useEffect(() => {
    const localTheme = storage_get('curr_theme')
    localTheme ? setMode(localTheme) : setMode('light')
    setThemeLoaded(true)
  }, [])

  return { theme, themeLoaded, setMode, getFonts }
}
