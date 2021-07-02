import DotLink from '../../widgets/dot_link/dot_link'
import Collapse from '../../widgets/collapse/collapse'
import { NodeChildrenFactory, NodeComponentProps } from '../node_factory'
import Editable from '../../widgets/editible/editable'
import './text.scss'

/**
 * Simple lines of text, no headers
 */
function TextNode(props: NodeComponentProps) {
  return (
    <div className="node">
      <div className="node-row">
        <Collapse collapsible={props.data.children.length > 0} collapsed={!props.data.isExpanded} />
        <DotLink id={props.data.id} />
        <Editable {...props} />
      </div>
      <NodeChildrenFactory {...props} nodes={props.data.children} />
    </div>
  )
}

export default TextNode
