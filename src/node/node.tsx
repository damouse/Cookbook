import { NodeInterface } from './raw_node'
import { Link } from 'react-router-dom'
import { ContentEditableEvent } from 'react-contenteditable'
import './node.scss'
import { CLEAR_FOCUS, CREATE, DEDENT, EditorActions, INDENT } from '../state/state_resolver'
import { useEffect, useRef } from 'react'

interface NodeProps extends NodeInterface {
  dispatch: React.Dispatch<EditorActions>
  focus: string | null
}

function Node(props: NodeProps) {
  const hasChildren = props.children !== undefined && props.children!!.length > 0
  const body = props.isCode ? <code>{props.text}</code> : <>{props.text}</>

  const children = hasChildren ? (
    <div className="node-children">
      {props.children.map(x => {
        return <Node {...x} dispatch={props.dispatch} key={x.id} focus={props.focus}></Node>
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

  function onFocus() {
    console.log(`Focus on ${props.id}`)
    return props.dispatch({ type: CLEAR_FOCUS })
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    console.log(`Keypress: ${event.key}`)

    switch (event.key) {
      case 'Enter':
        event.preventDefault()
        return props.dispatch({ type: CREATE, id: props.id })
      case 'Tab':
        event.preventDefault()
        // return props.dispatch({ type: INDENT, id: props.id })
        return props.dispatch({ type: DEDENT, id: props.id })
      default:
        console.log(`Some other key: ${event.key}`)
    }
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
          key={`node-body-${props.id}`}
          contentEditable="true"
          tabIndex={-1}
          suppressContentEditableWarning={true}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          ref={input => {
            // Focus on this node if state indicates
            if (props.id === props.focus) {
              input?.focus()
            }
          }}
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
