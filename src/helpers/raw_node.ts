export interface NodeProps {
  text: string
  id: string
  isExpanded: boolean
  isCode: boolean
  children: NodeProps[]
}

class RawNode implements NodeProps {
  public id: string
  public text: string
  public isExpanded: boolean = false
  public isCode: boolean = false
  public children = new Array<NodeProps>()

  constructor(
    id: string,
    text: string,
    children: NodeProps[] | undefined = undefined
  ) {
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
