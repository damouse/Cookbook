import Masonry from 'react-masonry-css'
import { COLLAPSE_ITEM } from '../../services/state/state_resolver'
import Collapse from '../../widgets/collapse/collapse'
import DotLink from '../../widgets/dot_link/dot_link'
import Editable from '../../widgets/editible/editable'
import NodeFactory, { NodeChildrenFactory, NodeComponentProps } from '../node_factory'
import './subheader.scss'

/**
 * Top level headers on a page
 */
function SubheaderNode(props: NodeComponentProps) {
  // console.log(`Subheader: ${props.data.id}`)
  // props.data.children.forEach(x => console.log(`  ${x.id}`))
  return (
    <div className="node">
      <div className="node-row subheader-text-row ">
        <Collapse
          id={props.data.id}
          collapsible={props.data.children.length > 0}
          collapsed={!props.data.isExpanded}
        />
        <DotLink id={props.data.id} />
        <Editable {...props} class={'text-subheader'} />
        <div className={'text-subheader-line'} />
      </div>

      <NodeChildrenFactory {...props} />

      {/* So this does work, but have to be careful of element widths */}
      {/* <div className="node-children">
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {props.data.children.map(x => (
            <NodeFactory
              data={x}
              dispatch={props.dispatch}
              focus={props.focus}
              depth={props.depth + 1}
            />
          ))}
        </Masonry>
      </div> */}
    </div>
  )
}

export default SubheaderNode
