import React, { useReducer, useState } from 'react'
import NodeData, { deserializeNodes, INode } from '../../models/node_data'
import { EditorState } from './editor_state'
import { EditorActions, stateReducer } from './state_resolver'

export interface IEditorController {
  state: EditorState

  loadFromJson(src: string): void

  setActive(target: string): void
  toggleCollapsed(node_id: string): void
  clearFocus(): void

  indent(node_id: string): void
  dedent(node_id: string): void
  moveUp(node_id: string): void
  moveDown(node_id: string): void

  createNode(node_id: string): void
  deleteNode(node_id: string): void
  editNode(node_id: string, text: string): void
}

/**
 * A global provider of editor state, tucked into a context.
 * NOTE: not currently in use. I'm not sure this works super well for what I'm trying to do here.
 */
function EditorController(): IEditorController {
  const [state, setState] = useState<EditorState>({
    root: new NodeData(),
    active: new NodeData(),
    target: '',
    nodes: new Map<string, NodeData>(),
    parents: new Map<string, NodeData | null>(),
    focus: null
  })

  //
  // Main State Mutator Methods
  //

  /**
   *
   */
  function loadFromJson(source: string) {
    const json = JSON.parse(source) as INode
    const root = deserializeNodes(json)
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
    recursiveBuilder(root, null)

    let active = root

    if (state.target !== '' && nodes.get(state.target) !== undefined) {
      active = nodes.get(state.target)!
    }

    // TODO: validate that target and active exist
    setState({ ...state, root, active, nodes, parents, focus: null })
  }

  function toggleCollapsed(id: string): void {
    let target = state.nodes.get(id)
    target!.isExpanded = !target!.isExpanded
    setState(state)
  }

  function editNode(id: string, text: string): void {
    let node = state.nodes.get(id)
    node!.text = text
  }

  /**
   * Set the node identified by the given target string as active, if it exists.
   */
  function setActive(target: string) {
    let active = state.active

    if (target != state.target && state.nodes.get(target) !== undefined) {
      active = state.nodes.get(target)!
    }

    console.log(`Target ${target} current ${state.target} `)

    setState({
      ...state,
      active: active,
      target: target
    })
  }

  function clearFocus(): void {
    setState({ ...state, focus: null })
  }

  /**
   * Increase indentation by 1
   */
  function indent(node_id: string) {
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

    setState({
      ...state,
      active: state.active,
      focus: node.id
    })
  }

  /**
   * Decrease indentation by 1
   */
  function dedent(node_id: string) {
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

    setState({
      ...state,
      active: state.active,
      focus: node.id
    })
  }

  /**
   * Create a new node relative to the passed node_id. The new node will follow
   * that node in the list
   */
  function createNode(node_id: string) {
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

    setState({
      ...state,
      active: state.active,
      focus: newNode.id
    })
  }

  function deleteNode(node_id: string) {}

  function moveUp(node_id: string): void {
    const node = state.nodes.get(node_id)!
    const parent = state.parents.get(node_id)
    const idx = parent?.children.indexOf(node)!

    // Root element
    if (node.id == state.active.id) {
      return
    }

    // TODO: root element
    if (idx == 0) {
      setState({
        ...state,
        focus: parent!.id
      })
    }

    setState({
      ...state,
      focus: parent!.children[idx - 1].id
    })
  }

  function moveDown(node_id: string): void {
    const node = state.nodes.get(node_id)!
    const parent = state.parents.get(node_id)
    const idx = parent?.children.indexOf(node)!

    // // Root element
    // if (node.id == state.active.id) {
    //   return state
    // }

    // TODO: get index of parent!
    if (idx == parent!.children!.length - 1) {
      setState({
        ...state,
        focus: parent!.id
      })
    }

    setState({
      ...state,
      focus: parent!.children[idx - 1].id
    })
  }

  return {
    state,
    loadFromJson,
    setActive,
    indent,
    dedent,
    createNode,
    deleteNode,
    moveUp,
    moveDown,
    toggleCollapsed,
    clearFocus,
    editNode
  }
}

export default EditorController
