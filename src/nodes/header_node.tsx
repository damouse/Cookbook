import { Link } from 'react-router-dom'
import ContentEditable from '../helpers/content_editable'
import { SpecializedNodeProps } from './node_props'
import Node from './node'
import './node.scss'

function HeaderNode(props: SpecializedNodeProps) {
  const children = props.hasChildren ? (
    <div className="node-children">
      {props.children.map(x => (
        <Node {...props} {...x} key={x.id}></Node>
      ))}
    </div>
  ) : (
    <></>
  )

  return (
    <div className="node">
      <div className="node-row">
        {props.hasChildren ? (
          <div className="node-arrow noselect">
            {props.isExpanded ? <>&#9660;</> : <>&#9654;</>}
          </div>
        ) : (
          <div className="no-node-arrow noselect"></div>
        )}
        <Link to={{ pathname: `/${props.id}` }} className="node-bullet noselect">
          &#9679;
        </Link>

        <ContentEditable
          className="node-text text-header"
          style={{ fontSize: 30 }}
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
      {children}
    </div>
  )
}

export default HeaderNode
