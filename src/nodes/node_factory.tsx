import TextNode from './text/text_node'
import CodeNode from './code/code_node'
import HeaderNode from './header/header_node'
import { INode } from '../models/node_data'
import SubheaderNode from './subheader/subheader'
import './node.scss'

export interface NodeComponentProps {
  data: INode
  focus: string | null
  depth: number
}

/**
 * Create appropriate nodes for NodeData
 */
function NodeFactory(props: NodeComponentProps): JSX.Element {
  if (props.depth === 0 && !props.data.isCode) {
    return HeaderNode(props)
  } else if (props.depth === 1 && !props.data.isCode) {
    return SubheaderNode(props)
  } else if (!props.data.isCode) {
    return TextNode(props)
  } else {
    return CodeNode(props)
  }
}

/**
 * Helper function for creating lists of nodes
 */
export interface NodeChildrenProps {
  data: INode
  focus: string | null
  depth: number
}

export function NodeChildrenFactory(props: NodeChildrenProps) {
  if (props.data.children.length === 0 || !props.data.isExpanded) {
    return <></>
  }

  return (
    <div className="node-children">
      {props.data.children.map(x => (
        <NodeFactory data={x} focus={props.focus} depth={props.depth + 1} />
      ))}
    </div>
  )
}

export default NodeFactory
