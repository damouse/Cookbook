import ContentEditable from '../helpers/content_editable'
import { SpecializedNodeProps } from './node_props'
import Node from './node'
import './node.scss'
import DotLink from './dot_link/dot_link'
import Collapse from './collapse/collapse'

function TextNode(props: SpecializedNodeProps) {
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
        <Collapse collapsible={props.hasChildren} collapsed={!props.isExpanded} />
        <DotLink id={props.id} />
        <ContentEditable
          className="node-text"
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

export default TextNode
