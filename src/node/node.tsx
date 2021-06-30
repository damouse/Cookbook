import { NodeProps } from "../helpers/raw_node"
import "./node.scss"

const RIGHT_ARROW = "&#9654;"
const DOWN_ARROW = "&#9660;"
const DOT = "&#9679;"

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
      return <div className="node-arrow noselect">${nodeArrow()}</div>
    } else {
      return <div className="no-node-arrow noselect"></div>
    }
  }

  function nodeArrow() {
    return props.isExpanded ? DOWN_ARROW : RIGHT_ARROW
  }

  console.log("UH?")
  console.log(`Node children: ${props.children && props.children.length}`)

  return (
    <div className="node-row">
      {arrowDiv()}
      <div className="no-node-arrow noselect"></div>
      {/* TODO: this linking doesn't work  */}
      <a href="/#/${node.id}" className="node-bullet noselect">
        &#9679;
      </a>
      {/* TODO: content editable doesn't work well here with react. */}
      <div className="node-text" contentEditable="true" tabIndex={-1}>
        {props.text}
      </div>
      {props.children !== undefined && props.children?.length > 0 ? (
        <div className="node-children">
          {props.children.map((x) => {
            console.log("NESTED")
            return <Node {...x}></Node>
            // return <div>Nest</div>
          })}
          {/* hello */}
          {/* <Node {...x}></Node */}
          {/* props.children.forEach((x) => <div></div> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Node
// export { NodeProps }
