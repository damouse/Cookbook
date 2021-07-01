import { NodeInterface } from './raw_node'
import { Link } from 'react-router-dom'
import { ContentEditableEvent } from 'react-contenteditable'
import './node.scss'
import { EditorActions, INDENT } from '../state/state_resolver'

interface NodeProps extends NodeInterface {
  dispatch: React.Dispatch<EditorActions>
}

const ENTER = 13
const BACKSPACE = 8
const TAB = 9
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const LEFT_ARROW = 37

function Node(props: NodeProps) {
  // console.log(`Given props: ${JSON.stringify(props)}`)
  const hasChildren = props.children !== undefined && props.children!!.length > 0
  const body = props.isCode ? <code>{props.text}</code> : <>{props.text}</>

  const children = hasChildren ? (
    <div className="node-children">
      {props.children.map(x => {
        return <Node {...x} dispatch={props.dispatch} key={x.id}></Node>
      })}
    </div>
  ) : (
    <></>
  )

  // I'm actually not sure this is going to work. Hitting enter will add divs within the
  // editing div, and I probably want newlines?
  const handleChange = (evt: ContentEditableEvent) => {
    console.log(`On change: ${evt.target.value}`)
    // text.current = evt.target.value
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    console.log(`Keypress: ${event.key}`)
    event.preventDefault()

    switch (event.key) {
      case 'Enter':
        // console.log('Enter')
        return props.dispatch({ type: INDENT, id: props.id })
      default:
        console.log(`Some other key: ${event.key}`)
    }
  }

  function onFocus() {
    console.log(`Focus on ${props.id}`)
  }

  // If its ugly and it works?
  // TODO: split out a section and code block portion here
  return (
    <div className="node">
      <div className="node-row">
        {hasChildren ? (
          <div className="node-arrow noselect">
            {props.isExpanded ? <>&#9660;</> : <>&#9654;</>}
          </div>
        ) : (
          <div className="no-node-arrow noselect"></div>
        )}
        <Link to={{ pathname: `/${props.id}` }} className="node-bullet noselect">
          &#9679;
        </Link>

        {/* TODO: content editable doesn't play nicely with react. */}
        <div
          className="node-text"
          contentEditable="true"
          tabIndex={-1}
          suppressContentEditableWarning={true}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
        >
          {body}
        </div>

        {/* <ContentEditable
          className="node-text"
          html={props.text}
          onChange={handleChange} 
          />*/}
      </div>
      {children}
    </div>
  )
}

Node.defaultProps = {
  isExpanded: true,
  children: [],
  isCode: false
}

export default Node
