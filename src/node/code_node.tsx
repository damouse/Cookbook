import { Link } from 'react-router-dom'
import ContentEditable from '../helpers/content_editable'
import CommentNode from './comment_node'
import './node.scss'
import { SpecializedNodeProps } from './node_props'

function CodeNode(props: SpecializedNodeProps) {
  //   const children = props.hasChildren ? (
  //     <div className="node-children">
  //       {props.children.map(x => (
  //         <CommentNode {...props} {...x} key={x.id}></CommentNode>
  //       ))}
  //     </div>
  //   ) : (
  //     <></>
  //   )

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
        <div className="code-comment-wrapper">
          <ContentEditable
            className="node-text"
            key={`node-body-${props.id}`}
            // html={`<code class='code-node'>${props.text}</code>`}
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
          {props.children.map(x => (
            <CommentNode {...props} {...x} key={x.id}></CommentNode>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CodeNode
