import { Type } from 'class-transformer'
import _, { random } from 'lodash'

export interface NodeInterface {
  id: string
  text: string
  isCode: boolean
  isExpanded: boolean
  children: NodeInterface[]
}

// The only thing this class really adds is safe .children access
class RawNode implements NodeInterface {
  public id: string = randomId(6)
  public text: string = ''
  public isExpanded: boolean = false
  public isCode: boolean = false
  public children = new Array<RawNode>()

  constructor(
    id: string | undefined = undefined,
    text: string | undefined = undefined,
    isCode: boolean | undefined = undefined
  ) {
    // this.children = new Array<RawNode>()
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

export function deserializeNodes(node: NodeInterface): RawNode {
  let root = new RawNode(node.id, node.text, node.isCode)

  if (node.children !== undefined && node.children.length > 0) {
    root.children = node.children.map(x => deserializeNodes(x))
  }

  return root
}

// export default RawNode
export default RawNode
