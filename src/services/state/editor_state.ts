import _ from 'lodash'
import NodeData, { deserializeNodes, INode } from '../../models/node_data'

export interface EditorState {
  // Store the whole parsed data? Maybe not, maybe we don't want to have to reconstitute this
  // OTOH it makes a nice interface with the current structure
  root: NodeData

  // ID of the currently targeted node
  active: NodeData
  target: string

  // Node IDS to nodes, possibly without children
  nodes: Map<string, NodeData>

  // node ids to parents
  parents: Map<string, NodeData | null>
  focus: string | null
}

/**
 * Construct editor state from JSON
 */
export function loadEditorState(source: string, target: string): EditorState {
  const json = JSON.parse(source) as INode
  const node = deserializeNodes(json)

  let nodes = new Map<string, NodeData>()
  let parents = new Map<string, NodeData | null>()
  let siblingIndex = new Map<string, number>()

  function recursiveBuilder(root: NodeData, parent: NodeData | null) {
    nodes.set(root.id, root)
    parents.set(root.id, parent)

    if (root.children !== undefined) {
      root.children.forEach((node: NodeData, index: number) => {
        siblingIndex.set(node.id, index)
        recursiveBuilder(node, root)
      })
    }
  }

  // NOTE: root doesn't have an entry in sibling index currently
  // Nodes aren't able to get to the top level as written, this may be why
  recursiveBuilder(node, null)

  let active = node

  if (target !== '' && nodes.get(target) !== undefined) {
    active = nodes.get(target)!
  }

  // TODO: validate that target and active exist
  return {
    root: node,
    active: active,
    target: target,
    nodes: nodes,
    parents: parents,
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

  // TODO: validation
  const node = state.nodes.get(node_id)!
  const parent = state.parents.get(node_id)!
  const idx = parent?.children.indexOf(node)!

  // Cant indent a node with nothing above it
  if (idx < 1) {
    return state
  }

  // Don't allow indenting of a node beneath a code block
  // TODO: converting a block TO code should undo this!
  if (parent.isCode) {
    return state
  }

  const newParent = parent!.children[idx - 1]

  // Don't allow nodes to be descendants of emtpy nodes
  if (newParent.text === '') {
    return state
  }

  console.log(`Index ${idx} New Parent ${JSON.stringify(newParent)} Node text ${node.text}`)
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
 * Decrease indentation by 1
 */
export function dedent(state: EditorState, node_id: string): EditorState {
  if (state.nodes.get(node_id) === undefined) {
    return state
  }

  const parent = state.parents.get(node_id)

  // Top level node
  if (parent === undefined || parent === null) {
    return state
  }

  // New Parent
  const newParent = state.parents.get(parent!!.id)

  // Nothing to move to
  if (newParent === undefined || newParent === null) {
    return state
  }

  const parentIndex = newParent!.children.indexOf(parent!)
  const node = state.nodes.get(node_id)!
  const idx = parent?.children.indexOf(node)!

  // Move the node to parent
  parent?.children.splice(idx, 1)
  newParent!.children.splice(parentIndex + 1, 0, node)

  // Update the parent mapping
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

  console.log(`Id: ${node_id}, index: ${idx}`)

  // Create and add new node
  const newNode = new NodeData()
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

export function moveUp(state: EditorState, node_id: string): EditorState {
  const node = state.nodes.get(node_id)!
  const parent = state.parents.get(node_id)
  const idx = parent?.children.indexOf(node)!

  // Root element
  if (node.id == state.active.id) {
    return state
  }

  // TODO: root element
  if (idx == 0) {
    return {
      ...state,
      focus: parent!.id
    }
  }
  return {
    ...state,
    focus: parent!.children[idx - 1].id
  }
}

export function moveDown(state: EditorState, node_id: string): EditorState {
  const node = state.nodes.get(node_id)!
  const parent = state.parents.get(node_id)
  const idx = parent?.children.indexOf(node)!

  // // Root element
  // if (node.id == state.active.id) {
  //   return state
  // }

  // TODO: get index of parent!
  if (idx == parent!.children!.length - 1) {
    return {
      ...state,
      focus: parent!.id
    }
  }

  return {
    ...state,
    focus: parent!.children[idx - 1].id
  }
}
