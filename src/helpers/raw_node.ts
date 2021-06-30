export interface NodeProps {
  text: string
  id: string
  isExpanded: boolean | undefined
  children: NodeProps[] | undefined
}

class RawNode implements NodeProps {
  public id: string
  public text: string
  public isExpanded: boolean | undefined
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
