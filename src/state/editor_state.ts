import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import RawNode from '../node/raw_node'

// Lets assume we're pass by ref
export interface EditorState {
  // Store the whole parsed data? Maybe not, maybe we don't want to have to reconstitute this
  // OTOH it makes a nice interface with the current structure
  root: RawNode

  // ID of the currently targeted node
  active: RawNode
  target: string

  // Node IDS to nodes, possibly without children
  nodes: Map<string, RawNode>

  // node ids to parents
  parents: Map<string, RawNode | null>

  // Node to index in parents children
  // siblingIndex: Map<string, number>

  focus: string | null
}

/**
 * Construct editor state from loaded content. TODO-- does not take target into account!
 */
export function loadEditorState(source: string, target: string): EditorState {
  const json = JSON.parse(source) as RawNode
  const node = plainToClass(RawNode, json)

  let nodes = new Map<string, RawNode>()
  let parents = new Map<string, RawNode | null>()
  let siblingIndex = new Map<string, number>()

  function recursiveBuilder(root: RawNode, parent: RawNode | null) {
    nodes.set(root.id, root)
    parents.set(root.id, parent)

    if (root.children !== undefined) {
      root.children.forEach((node: RawNode, index: number) => {
        siblingIndex.set(node.id, index)
        // let parents = new Map<string, RawNode | null>().set(node.id, root)
        // console.log(`Setting ${node.id} ${JSON.stringify(ancestors)} ${ancestors.entries.length}`)
        recursiveBuilder(node, root)
      })
    }
  }

  recursiveBuilder(node, null)
  // NOTE: root doesn't have an entry in sibling index currently
  // Debugging
  //   newState.nodes.forEach((v, k) => { console.log(`Node ${k}: to ${v.id} ${v.text}`)})
  //   newState.parents.forEach((v, k) => {console.log(`parent ${k}: ${v !== null ? v!.id : 'none'}`)})
  //   newState.siblingIndex.forEach((v, k) => {console.log(`sibInd ${k}: ${v}`)})

  let active = node

  if (target !== '' && nodes.get(target) !== undefined) {
    active = nodes.get(target)!
  }

  return {
    root: node,
    // TODO: validate that the node exists!
    active: active,
    target: target,
    nodes: nodes,
    parents: parents,
    // siblingIndex: siblingIndex,
    focus: null
  }
}

/**
 * Set the node identified by the given target string as active, if it exists.
 */
export function setActive(state: EditorState, target: string): EditorState {
  let active = state.active

  if (target != state.target && state.nodes.get(target) !== undefined) {
    active = state.nodes.get(target)!
  }

  console.log(`Target ${target} current ${state.target} `)

  return {
    ...state,
    active: active,
    target: target
  }
}

/**
 * Increase indentation by 1
 */
export function indent(state: EditorState, node_id: string): EditorState {
  if (state.nodes.get(node_id) === undefined) {
    return state
  }

  const node = state.nodes.get(node_id)!
  const parent = state.parents.get(node_id)!
  const idx = parent?.children.indexOf(node)!

  // Cant indent a node with nothing above it
  if (idx < 1) {
    return state
  }

  const newParent = parent!.children[idx - 1]
  // console.log(`Index ${idx} New Parent ${JSON.stringify(newParent)}`)
  parent?.children.splice(idx, 1)
  newParent.children.push(node)

  state.parents.set(node.id, newParent)

  return {
    ...state,
    active: state.active,
    focus: node.id
  }
}

/**
 * Create a new node relative to the passed node_id. The new node will follow
 * that node in the list
 */
export function createNode(state: EditorState, node_id: string): EditorState {
  // Find parent and sibling index
  const node = state.nodes.get(node_id)!
  const parent = state.parents.get(node_id)
  const idx = parent?.children.indexOf(node)!

  // Create and add new node
  const newNode = new RawNode()
  parent!.children.splice(idx + 1, 0, newNode)
  state.nodes.set(newNode.id, newNode)
  state.parents.set(newNode.id, parent!)

  return {
    ...state,
    active: state.active,
    focus: newNode.id
  }
}

export function deleteNode(state: EditorState, node_id: string): EditorState {
  return state
}

// export function delete(state: EditorState, node_id: string): EditorState
