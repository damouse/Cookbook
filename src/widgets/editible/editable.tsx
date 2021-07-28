import React from 'react'
import ContentEditable, { ContentEditableEvent } from '../../helpers/content_editable'
import { NodeComponentProps } from '../../nodes/node_factory'
import { useDeps } from '../../services/context'
import './editable.scss'

interface Props extends NodeComponentProps {
  class?: string
}

/**
 * An editable HTML Element
 */
function Editable(props: Props) {
  const { editorCtrl } = useDeps()

  function onFocus() {
    editorCtrl.clearFocus()
    // if (nestedRef !== undefined) {
    //   console.log(`ref: ${nestedRef.offsetHeight} ${nestedRef.offsetLeft} ${nestedRef.offsetRight}`)
    // }

    // return props.dispatch({ type: CLEAR_FOCUS })
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    // console.log(`Keypress: ${event.key}`)

    // Deshifft
    if (event.shiftKey && event.key === 'Tab') {
      event.preventDefault()
      return editorCtrl.dedent(props.data.id)
    }

    // Delete Line
    if (event.shiftKey && event.key === 'Delete') {
      event.preventDefault()
      return editorCtrl.deleteNode(props.data.id)
    }

    // Soft newlines
    if (event.shiftKey && event.key === 'Enter') {
      return
    }

    // SO it might be possible to get tabs to work without too much trouble
    // If we're editting a code node and we see a tab, then send the thing over.

    switch (event.key) {
      case 'Enter':
        event.preventDefault()
        return editorCtrl.createNode(props.data.id)
      case 'Tab':
        event.preventDefault()
        return editorCtrl.indent(props.data.id)
      case 'ArrowUp':
        event.preventDefault()
        return editorCtrl.moveUp(props.data.id)
      case 'ArrowDown':
        event.preventDefault()
        return editorCtrl.moveDown(props.data.id)
      default:
      // console.log(`Some other key: ${event.key}`)
    }
  }

  // I'm actually not sure this is going to work. Hitting enter will add divs within the
  // editing div, and I probably want newlines?
  const handleChange = (evt: ContentEditableEvent) => {
    // var myElement: any = document.getElementById(`node-body-${props.data.id}`)
    // var startPosition = myElement.selectionStart
    // var endPosition = myElement.selectionEnd
    // console.log(`Positions: ${startPosition} ${endPosition} id ${`node-body-${props.data.id}`}`)

    // // Check if you've selected text
    // if (startPosition === endPosition) {
    //   alert('The position of the cursor is (' + startPosition + '/' + myElement.value.length + ')')
    // } else {
    //   alert(
    //     'Selected text from (' +
    //       startPosition +
    //       ' to ' +
    //       endPosition +
    //       ' of ' +
    //       myElement.value.length +
    //       ')'
    //   )
    // }

    return editorCtrl.editNode(props.data.id, evt.target.value)
    // return props.dispatch({ type: EDIT, id: props.data.id, text: evt.target.value })
  }

  const className = `node-text ${props.class !== undefined ? props.class : ''}`

  return (
    <ContentEditable
      className={className}
      id={`node-body-${props.data.id}`}
      key={`node-body-${props.data.id}`}
      html={props.data.text}
      onChange={handleChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      innerRef={(input: HTMLDivElement | null) => {
        if (input == null) {
          return
        }

        // console.log(`Have ref: ${input}`)
        // TEMP
        // nestedRef = input
        // refUpdated(input)

        if (props.data.id === props.focus) {
          input.focus()
          // console.log(`Input: ${input.selectionStart}`)
        }
      }}
    />
  )
}

export default Editable
