import DotLink from '../../widgets/dot_link/dot_link'
import Collapse from '../../widgets/collapse/collapse'
import { NodeChildrenFactory, NodeComponentProps } from '../node_factory'
import Editable from '../../widgets/editible/editable'
import './text.scss'
import CodeButton from '../../widgets/code_button/code_button'

/**
 * Simple lines of text, no headers
 */
function TextNode(props: NodeComponentProps) {
  return (
    <div className="node">
      <div className="node-row">
        <CodeButton isCode={props.data.isCode} id={props.data.id}></CodeButton>
        <Collapse
          id={props.data.id}
          collapsible={props.data.children.length > 0}
          collapsed={!props.data.isExpanded}
        />
        <DotLink id={props.data.id} children={props.data.children.length > 0} />
        <Editable {...props} />
      </div>
      <NodeChildrenFactory {...props} />
    </div>
  )
}

export default TextNode
