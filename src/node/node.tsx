import { NodeProps } from "./raw_node"
import { Link } from "react-router-dom"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import "./node.scss"

function Node(props: NodeProps) {
  console.log(`Given props: ${JSON.stringify(props)}`)

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

  // I'm actually not sure this is going to work. Hitting enter will add divs within the
  // editing div, and I probably want newlines?
  const handleChange = (evt: ContentEditableEvent) => {
    console.log(`On change: ${evt.target.value}`)
    // text.current = evt.target.value
  }

  // If its ugly and it works?
  // TODO: split out a section and code block portion here
  return (
    <div className="node">
      <div className="node-row">
        {arrowDiv()}
        <div className="no-node-arrow noselect"></div>
        <Link
          to={{ pathname: `/${props.id}` }}
          className="node-bullet noselect"
        >
          &#9679;
        </Link>

        {/* TODO: content editable doesn't play nicely with react. */}
        {/* <div
          className="node-text"
          contentEditable="true"
          tabIndex={-1}
          onInput={(e) =>
            console.log("Text inside div", e.currentTarget.textContent)
          }
        >
          {body}
        </div> */}

        <ContentEditable
          className="node-text"
          html={props.text}
          onChange={handleChange}
        />
      </div>
      <NodeChildren children={props.children}></NodeChildren>
    </div>
  )
}

Node.defaultProps = {
  isExpanded: true,
  children: [],
  isCode: false,
}

interface NodeChidlrenProps {
  children: NodeProps[] | undefined
}

function NodeChildren(props: NodeChidlrenProps) {
  if (props.children !== undefined && props.children.length > 0) {
    return (
      <div className="node-children">
        {props.children.map((x) => {
          return <Node {...x} key={x.id}></Node>
        })}
      </div>
    )
  } else {
    return <></>
  }
}

export default Node
