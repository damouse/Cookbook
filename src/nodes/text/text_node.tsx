import DotLink from '../../widgets/dot_link/dot_link'
import Collapse from '../../widgets/collapse/collapse'
import { NodeChildrenFactory, NodeComponentProps } from '../node_factory'
import Editable from '../../widgets/editible/editable'
import './text.scss'
import { COLLAPSE_ITEM } from '../../services/state/state_resolver'

/**
 * Simple lines of text, no headers
 */
function TextNode(props: NodeComponentProps) {
  return (
    <div className="node">
      <div className="node-row">
        <Collapse
          collapsible={props.data.children.length > 0}
          collapsed={!props.data.isExpanded}
          onClick={_ => props.dispatch({ type: COLLAPSE_ITEM, id: props.data.id })}
        />
        <DotLink id={props.data.id} />
        <Editable {...props} />
      </div>
      <NodeChildrenFactory {...props} />
    </div>
  )
}

export default TextNode
