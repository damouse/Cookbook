import _ from 'lodash'

export interface INode {
  id: string
  text: string
  isCode: boolean
  isExpanded: boolean
  children: INode[]
}

// The only thing this class really adds is safe .children access
class NodeModel implements INode {
  public id: string = randomId(6)
  public text: string = ''
  public isExpanded: boolean = false
  public isCode: boolean = false
  public children = new Array<NodeModel>()

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

export function deserializeNodes(node: INode): NodeModel {
  let root = new NodeModel(node.id, node.text, node.isCode)

  if (node.children !== undefined && node.children.length > 0) {
    root.children = node.children.map(x => deserializeNodes(x))
  }

  return root
}

// export default RawNode
export default NodeModel
