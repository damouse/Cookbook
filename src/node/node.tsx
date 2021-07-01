import { NodeProps } from "../helpers/raw_node"
import "./node.scss"

function Node(props: NodeProps) {
  console.log(`Given props: ${JSON.stringify(props)}`)

  function toggleCompleted() {
    // return produce(this, draft => {
    // draft.isCompleted = !draft.isCompleted;
    // });
  }

  function expand() {
    // return produce(this, draft => {
    // draft.isExpanded = true;
    // });
  }

  function toggleExpanded() {
    // return produce(this, draft => {
    // draft.isExpanded = !draft.isExpanded;
    // });
  }

  function addTag() {
    // return produce(this, draft => {
    // draft.tags.push(tag);
    // });
  }

  function setTags() {
    // return produce(this, draft => {
    // draft.tags = tags;
    // });
  }

  function arrowDiv(): JSX.Element {
    if (props.children !== undefined && props.children!!.length > 0) {
      return (
        <div className="node-arrow noselect">
          {props.isExpanded ? <>&#9660;</> : <>&#9654;</>}
        </div>
      )
    } else {
      return <div className="no-node-arrow noselect"></div>
    }
  }

  let body = <></>

  if (props.isCode) {
    body = <code>{props.text}</code>
  } else {
    body = <>{props.text}</>
  }

  // If its ugly and it works?
  return (
    <div className="node">
      <div className="node-row">
        {arrowDiv()}
        <div className="no-node-arrow noselect"></div>
        {/* TODO: this linking doesn't work  */}
        <a href="/#/${node.id}" className="node-bullet noselect">
          &#9679;
        </a>
        {/* TODO: content editable doesn't work well here with react. */}
        <div className="node-text" contentEditable="true" tabIndex={-1}>
          {body}
        </div>
      </div>
      {props.children !== undefined && props.children?.length > 0 ? (
        <div className="node-children">
          {props.children.map((x) => {
            return <Node {...x}></Node>
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

Node.defaultProps = {
  isExpanded: true,
  children: [],
  isCode: false,
}

export default Node
