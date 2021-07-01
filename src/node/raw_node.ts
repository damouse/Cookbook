export interface NodeInterface {
  text: string
  id: string
  isExpanded: boolean
  isCode: boolean
  children: NodeInterface[]
}

class RawNode implements NodeInterface {
  public id: string
  public text: string
  public isExpanded: boolean = false
  public isCode: boolean = false
  public children = new Array<NodeInterface>()

  constructor(id: string, text: string, children: NodeInterface[] | undefined = undefined) {
    this.id = id
    this.text = text

    if (children !== undefined) {
      this.children = children
    }
  }

  public addChild = (id: string, text: string) => {
    this.children.push(new RawNode(id, text))
  }
}

// export default RawNode
export default RawNode
