import { createContext, useContext } from 'react'
import React from 'react'
import ApiService from './api'

interface ContextState {
  apiService: ApiService
}

const Context = React.createContext({} as ContextState)

export function useDeps() {
  return useContext(Context)
}

interface Props {
  children: any
}

// Well shoot, this works. There are some warning signs about using this for ALL the
// rerendering, but it seems pretty damned useful to get global access to State.
export function DepsProvider(props: Props) {
  return (
    <Context.Provider value={{ apiService: new ApiService() }}>{props.children}</Context.Provider>
  )
}
