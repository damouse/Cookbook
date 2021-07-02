import ContentEditable from '../helpers/content_editable'
import Collapse from './collapse/collapse'
import CommentNode from './comment_node'
import './node.scss'
import { SpecializedNodeProps } from './node_props'

function CodeNode(props: SpecializedNodeProps) {
  return (
    <div className="node code-node">
      <div className="node-row">
        <Collapse collapsible={props.hasChildren} collapsed={!props.isExpanded} />
        <ContentEditable
          className="node-text code-text"
          key={`node-body-${props.id}`}
          html={props.text}
          onChange={props.handleChange}
          onFocus={props.onFocus}
          onKeyDown={props.onKeyDown}
          innerRef={(input: any) => {
            if (input !== null && props.id === props.focus) {
              input.focus()
            }
          }}
        />
      </div>
      {props.children.map(x => (
        <CommentNode {...props} {...x} key={x.id}></CommentNode>
      ))}
    </div>
  )
}

export default CodeNode
