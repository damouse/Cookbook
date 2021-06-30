import React, { useState } from "react"
import RawNode from "../helpers/raw_node"
// import "./Editor2.scss";

function State(source: string): RawNode {
  //   const [nodes, setNodes] = useState<Node[]>(new Array<Node>());

  let root = new RawNode("", "")
  // const [activeNode, setActiveNode] = useState<RawNode>(root)

  let payload = JSON.parse(source) as RawNode
  console.log(`Payload: ${JSON.stringify(payload)}`)
  root = payload

  // setActiveNode(root)

  return root
}

export default State