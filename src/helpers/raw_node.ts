import { Children } from "react";

// TODO: move to own file. State probably also doesn't need sass?
class RawNode {
  public id: string;
  public text: string;
  public children = new Array<RawNode>();

  constructor(
    id: string,
    text: string,
    children: RawNode[] | undefined = undefined
  ) {
    this.id = id;
    this.text = text;

    if (children !== undefined) {
      this.children = children;
    }
  }

  public addChild = (id: string, text: string) => {
    this.children.push(new RawNode(id, text));
  };
}

export default RawNode;
