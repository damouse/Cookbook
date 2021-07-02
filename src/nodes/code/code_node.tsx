import Collapse from '../../widgets/collapse/collapse'
import Editable from '../../widgets/editible/editable'
import CommentNode from '../comment/comment_node'
import './code.scss'
import { NodeProps2 } from '../node_factory'

/**
 * Editable code block
 */
function CodeNode(props: NodeProps2) {
  return (
    <div className="node code-node">
      <div className="node-row">
        <Collapse collapsible={props.data.children.length > 0} collapsed={!props.data.isExpanded} />
        <Editable {...props} class={'code-text'} />
      </div>
      {props.data.children.map(x => (
        <CommentNode {...props} data={x} key={x.id}></CommentNode>
      ))}
    </div>
  )
}

export default CodeNode
