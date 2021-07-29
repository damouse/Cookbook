import Collapse from '../../widgets/collapse/collapse'
import Editable from '../../widgets/editible/editable'
import CommentNode from '../comment/comment_node'
import './code.scss'
import { NodeComponentProps } from '../node_factory'
import CodeButton from '../../widgets/code_button/code_button'

/**
 * Editable code block
 */
function CodeNode(props: NodeComponentProps) {
  return (
    <div className="node code-flex-wrapper">
      <CodeButton isCode={props.data.isCode} id={props.data.id}></CodeButton>
      <Collapse
        id={props.data.id}
        collapsible={props.data.children.length > 0}
        collapsed={!props.data.isExpanded}
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
