import _ from 'lodash'

/**
 * Representation of a serialized node
 */
export interface INode {
  id: string
  text: string
  isCode: boolean
  isExpanded: boolean
  children: INode[]
}

/**
 * Wrapper around node data that provides some utility access like safe .children access
 */
class NodeData implements INode {
  public id: string = randomId(6)
  public text: string = ''
  public isExpanded: boolean = true
  public isCode: boolean = false
  public children = new Array<NodeData>()

  constructor(
    id: string | undefined = undefined,
    text: string | undefined = undefined,
    isCode: boolean | undefined = undefined
  ) {
    if (id !== undefined) {
      this.id = id
    }

    if (text !== undefined) {
      this.text = text
    }

    if (isCode !== undefined) {
      this.isCode = isCode
    }
  }
}

function randomId(len: number = 6) {
  return _.times(len, () => ((Math.random() * 0xf) << 0).toString(16)).join('')
}

export function deserializeNodes(node: INode): NodeData {
  let root = new NodeData(node.id, node.text, node.isCode)

  if (node.children !== undefined && node.children.length > 0) {
    root.children = node.children.map(x => deserializeNodes(x))
  }

  return root
}

// export default RawNode
export default NodeData
