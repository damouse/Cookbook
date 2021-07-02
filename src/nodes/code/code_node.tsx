import Collapse from '../../widgets/collapse/collapse'
import Editable from '../../widgets/editible/editable'
import CommentNode from '../comment/comment_node'
import './code.scss'
import { NodeComponentProps } from '../node_factory'
import { COLLAPSE_ITEM } from '../../state/state_resolver'

/**
 * Editable code block
 */
function CodeNode(props: NodeComponentProps) {
  return (
    <div className="code-flex-wrapper">
      <Collapse
        collapsible={props.data.children.length > 0}
        collapsed={!props.data.isExpanded}
        onClick={_ => props.dispatch({ type: COLLAPSE_ITEM, id: props.data.id })}
      />
      <div className="code-node">
        <div className="node-row">
          <Editable {...props} class={'code-text'} />
        </div>
        {props.data.isExpanded &&
          props.data.children.map(x => <CommentNode {...props} data={x} key={x.id}></CommentNode>)}
      </div>
    </div>
  )
}

export default CodeNode
