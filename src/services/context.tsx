import { useContext } from 'react'
import React from 'react'
import ApiService, { IApiService } from './api'
import EditorController, { IEditorController } from './state_controller'

interface ContextState {
  api: IApiService
  editorCtrl: IEditorController
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

// Not working. Do a little more reading
//  stateService: StateService()
export function DepsProvider(props: Props) {
  return (
    <Context.Provider value={{ api: ApiService(), editorCtrl: EditorController() }}>
      {props.children}
    </Context.Provider>
  )
}
