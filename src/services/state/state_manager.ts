import { useReducer } from 'react'
import NodeData from '../../models/node_data'
import { EditorState } from './editor_state'
import { stateReducer } from './state_resolver'

const initialState: EditorState = {
  root: new NodeData(),
  active: new NodeData(),
  target: '',
  nodes: new Map<string, NodeData>(),
  parents: new Map<string, NodeData | null>(),
  focus: null
}

/**
 * A global provider of editor state, tucked into a context.
 * NOTE: not currently in use. I'm not sure this works super well for what I'm trying to do here.
 */
function StateService() {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  return { state, dispatch }
}

export default StateService
