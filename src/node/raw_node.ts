import _ from 'lodash'

export interface NodeInterface {
  text: string
  id: string
  isExpanded: boolean
  isCode: boolean
  children: NodeInterface[]
}

// The only thing this class really adds is safe .children access
class RawNode implements NodeInterface {
  public id: string
  public text: string
  public isExpanded: boolean = false
  public isCode: boolean = false
  public children = new Array<RawNode>()

  constructor(children: RawNode[] | undefined = undefined) {
    this.id = randomId()
    this.text = ''

    if (children !== undefined) {
      this.children = children
    }
  }

  // public addChild = (id: string, text: string) => {
  // this.children.push(new RawNode())
  // }
}

function randomId(len: number = 6) {
  return _.times(len, () => ((Math.random() * 0xf) << 0).toString(16)).join('')
}

// export default RawNode
export default RawNode
