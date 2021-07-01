import { Link } from 'react-router-dom'
import ContentEditable from '../helpers/content_editable'
import { SpecializedNodeProps } from './node_props'
import './node.scss'

/**
 * A node for comments directly beneath a block of code
 */
function CommentNode(props: SpecializedNodeProps) {
  return (
    <div className="node comment-node">
      <div className="node-row">
        <div className="no-node-arrow noselect"></div>

        <Link to={{ pathname: `/${props.id}` }} className="node-bullet noselect">
          &#9679;
        </Link>

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
    </div>
  )
}

export default CommentNode
