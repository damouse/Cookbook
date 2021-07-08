import { useState } from 'react'
import NodeData, { deserializeNodes, INode } from '../models/node_data'

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

export interface IEditorController {
  state: EditorState

  loadFromJson(src: string): void

  setActive(target: string): void
  toggleCollapsed(node_id: string): void
  toggleCode(node_id: string): void
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
  // Utility Functions
  //

  /**
   * Utility function to get a node and its parent, else print a warning.
   */
  function getNodeAndParent(node_id: string): [INode | undefined, INode | undefined] {
    const node = state.nodes.get(node_id)
    const parent = state.parents.get(node_id)

    if (node === undefined) {
      console.log(`Cant find node ${node_id}`)
      return [undefined, undefined]
    }

    if (parent === undefined || parent === null) {
      console.log(`Cant find node ${node_id}`)
      return [undefined, undefined]
    }

    return [node, parent]
  }

  //
  // Main State Mutator Methods
  //

  /**
   * Load a tree from JSON string and replace the current data
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

    setState({ ...state, root, active, nodes, parents, focus: null })
  }

  /**
   * Change the toggle state of the passed id
   */
  function toggleCollapsed(id: string): void {
    let target = state.nodes.get(id)

    if (target === undefined) {
      return console.log(`Cant find node ${id}`)
    }

    target.isExpanded = !target.isExpanded
    setState({ ...state })
  }

  /**
   * Update the text for a given node. Does not trigger a rerender because content-editable will display the update
   */
  function editNode(id: string, text: string): void {
    let node = state.nodes.get(id)

    if (node === undefined) {
      return console.log(`Cant find node ${id}`)
    }

    node.text = text
  }

  /**
   * Set the node identified by the given target string as active, if it exists.
   */
  function setActive(target: string) {
    if (target === state.target) {
      return
    }

    let active = state.nodes.get(target)

    if (active === undefined) {
      return console.log(`Cant find node ${target}`)
    }

    setState({ ...state, active, target })
  }

  /**
   * Remove the active focus. This is called when any Editable field is changed to signify that the
   * user has taken logical ownership over the focus.
   */
  function clearFocus(): void {
    setState({ ...state, focus: null })
  }

  /**
   * Increase indentation by 1
   */
  function indent(node_id: string) {
    const [node, parent] = getNodeAndParent(node_id)
    if (node === undefined || parent === undefined) return
    const idx = parent.children.indexOf(node)

    // Cant indent a node with nothing above it
    if (idx < 1) {
      return state
    }

    // Don't allow indenting of a node beneath a code block
    // TODO: converting a block TO code should undo this!
    if (parent.isCode) {
      return state
    }

    const newParent = parent.children[idx - 1]

    // Don't allow nodes to be descendants of emtpy nodes
    if (newParent.text === '') {
      return state
    }

    console.log(`Index ${idx} New Parent ${JSON.stringify(newParent)} Node text ${node.text}`)
    parent.children.splice(idx, 1)
    newParent.children.push(node)
    state.parents.set(node.id, newParent)
    setState({ ...state, focus: node.id })
  }

  /**
   * Decrease indentation by 1
   */
  function dedent(node_id: string) {
    const [node, parent] = getNodeAndParent(node_id)
    if (node === undefined || parent === undefined) return

    // New Parent
    const newParent = state.parents.get(parent.id)

    // Nothing to move to
    if (newParent === undefined || newParent === null) {
      return console.log(`No parent to move to`)
    }

    const parentIndex = newParent.children.indexOf(parent)
    const idx = parent?.children.indexOf(node)

    // Move the node to parent, update the parent mapping
    parent.children.splice(idx, 1)
    newParent.children.splice(parentIndex + 1, 0, node)
    state.parents.set(node.id, newParent)
    setState({ ...state, focus: node.id })
  }

  /**
   * Create a new node relative to the passed node_id. The new node will follow
   * that node in the list
   */
  function createNode(node_id: string) {
    const [node, parent] = getNodeAndParent(node_id)
    if (node === undefined || parent === undefined) return

    const idx = parent.children.indexOf(node)
    // console.log(`Id: ${node_id}, index: ${idx}`)

    // Create and add new node
    const newNode = new NodeData()
    parent.children.splice(idx + 1, 0, newNode)
    state.nodes.set(newNode.id, newNode)
    state.parents.set(newNode.id, parent)
    setState({ ...state, focus: newNode.id })
  }

  /**
   * Remove the node from the tree, including its descendants.
   */
  function deleteNode(node_id: string) { }

  /**
   * Move focus up the tree. Called by arrow up/down keyboard presses.
   */
  function moveUp(node_id: string): void {
    // Current header element. TODO: should this decrease the zoom level?
    if (node_id === state.active.id) {
      return
    }

    const [node, parent] = getNodeAndParent(node_id)
    if (node === undefined || parent === undefined) return
    const idx = parent.children.indexOf(node)

    // Move to the parent
    if (idx === 0) {
      setState({ ...state, focus: parent.id })
      return
    }

    // TODO: sibling with nested, uncollapsed children

    setState({ ...state, focus: parent.children[idx - 1].id })
  }

  /**
   * Move focus down the tree. Called by arrow up/down keyboard presses.
   *
   * If the current node has a next sibling, change focus to that node
   * Else If the current node has a descendant, focus on their first descendant
   * If the current node is at the end of its list, change focus to the parent's next sibling
   */
  function moveDown(node_id: string): void {
    let [node, parent] = getNodeAndParent(node_id)
    if (node === undefined || parent === undefined) return
    const idx = parent.children.indexOf(node)

    // This node has a descendant that is not collapsed 
    // NOTE: this breaks with parents!
    if (node.children.length > 0 && node.isExpanded) {
      setState({ ...state, focus: node.children[0].id })
      return
    }

    // This node has a sibling in its parents
    if (idx < parent.children.length - 1) {
      setState({ ...state, focus: parent.children[idx + 1].id })
      return
    }

    node_id = parent.id

    // Otherwise keep looping on the parent until we find the next sibling
    while (true) {
      const [node, parent] = getNodeAndParent(node_id)
      if (node === undefined || parent === undefined) return
      const idx = parent.children.indexOf(node)

      // This node has a sibling in its parents
      if (idx < parent.children.length - 1) {
        setState({ ...state, focus: parent.children[idx + 1].id })
        return
      }
    }
  }

  function toggleCode(node_id: string): void {
    const node = state.nodes.get(node_id)

    if (node === undefined) {
      console.log(`Cant find node ${node_id}`)
      return
    }

    node.isCode = !node.isCode
    setState({ ...state })
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
    editNode,
    toggleCode
  }
}

export default EditorController
