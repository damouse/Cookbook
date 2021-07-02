import Collapse from '../../widgets/collapse/collapse'
import DotLink from '../../widgets/dot_link/dot_link'
import Editable from '../../widgets/editible/editable'
import { NodeChildrenFactory, NodeComponentProps } from '../node_factory'
import './header.scss'

/**
 * Top level headers on a page
 */
function HeaderNode(props: NodeComponentProps) {
  return (
    <div className="node">
      <div className="node-row">
        <Collapse collapsible={props.data.children.length > 0} collapsed={!props.data.isExpanded} />
        <DotLink id={props.data.id} />
        <Editable {...props} class={'text-header'} />
      </div>
      <NodeChildrenFactory {...props} nodes={props.data.children} />
    </div>
  )
}

export default HeaderNode
