import { CLEAR_FOCUS, CREATE, DEDENT, EDIT, EditorActions, INDENT } from '../state/state_resolver'
import React from 'react'
import { ContentEditableEvent } from '../helpers/content_editable'
import './node.scss'
import TextNode from './text/text_node'
import CodeNode from './code/code_node'
import HeaderNode from './header/header_node'
import { NodeProps } from './node_props'
import { INode } from '../models/node_data'

export interface NodeProps2 {
  data: INode
  dispatch: React.Dispatch<EditorActions>
  focus: string | null
  depth: number
  //   hasChildren?: boolean
}

/**
 * Create appropriate nodes for NodeData
 */
function NodeFactory(props: NodeProps2) {
  // Check out https://highlightjs.org/
  //   const hasChildren = props.data.children !== undefined && props.data.children!!.length > 0

  // Increment Depth
  props = {
    ...props,
    depth: props.depth + 1
  }

  // TODO: Create Subheader Node

  //   return TextNode(props)

  if (props.depth == 1 && !props.data.isCode) {
    return HeaderNode(props)
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
  nodes: INode[]
  dispatch: React.Dispatch<EditorActions>
  focus: string | null
  depth: number
}

export function NodeChildrenFactory(props: NodeChildrenProps) {
  if (props.nodes.length === 0) {
    return <></>
  }

  return (
    <div className="node-children">
      {props.nodes.map(x => (
        <NodeFactory data={x} dispatch={props.dispatch} focus={props.focus} depth={0} />
      ))}
    </div>
  )
}

export default NodeFactory
