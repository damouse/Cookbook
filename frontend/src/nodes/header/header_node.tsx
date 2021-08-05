import Editable from '../../widgets/editible/editable'
import NodeFactory, { NodeComponentProps } from '../node_factory'
import './header.scss'

/**
 * Top level headers on a page
 */
function HeaderNode(props: NodeComponentProps) {
  let children =
    props.data.children.length > 0 ? (
      props.data.children.map(x => (
        <NodeFactory data={x} focus={props.focus} depth={props.depth + 1} />
      ))
    ) : (
      <></>
    )

  return (
    <div className="node">
      <div className="node-row" style={{ marginBottom: 20 }}>
        <Editable {...props} class={'text-header'} />
      </div>
      {children}
    </div>
  )
}

export default HeaderNode
