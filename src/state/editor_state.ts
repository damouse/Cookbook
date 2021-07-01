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
  siblingIndex: Map<string, number>
}

/**
 * Construct editor state from loaded content. TODO-- does not take target into account!
 */
export function loadEditorState(source: string, target: string): EditorState {
  const node = JSON.parse(source) as RawNode
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
    target: '',
    nodes: nodes,
    parents: parents,
    siblingIndex: siblingIndex
  }
}

export function setActive() {}
