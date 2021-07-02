import { CLEAR_FOCUS, CREATE, DEDENT, EDIT, INDENT } from '../state/state_resolver'
import React from 'react'
import { ContentEditableEvent } from '../helpers/content_editable'
import './node.scss'
import TextNode from './text/text_node'
import CodeNode from './code/code_node'
import HeaderNode from './header/header_node'
import { NodeProps } from './node_props'

function Node(props: NodeProps) {
  // Check out https://highlightjs.org/
  const hasChildren = props.children !== undefined && props.children!!.length > 0

  function onFocus() {
    return props.dispatch({ type: CLEAR_FOCUS })
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    console.log(`Keypress: ${event.key}`)

    // Deshifft
    if (event.shiftKey && event.key == 'Tab') {
      event.preventDefault()
      return props.dispatch({ type: DEDENT, id: props.id })
    }

    // Soft newlines
    if (event.shiftKey && event.key == 'Enter') {
      return
    }

    // SO it might be possible to get tabs to work without too much trouble
    // If we're editting a code node and we see a tab, then send the thing over.

    switch (event.key) {
      case 'Enter':
        event.preventDefault()
        return props.dispatch({ type: CREATE, id: props.id })
      case 'Tab':
        event.preventDefault()
        return props.dispatch({ type: INDENT, id: props.id })
      default:
        console.log(`Some other key: ${event.key}`)
    }
  }

  props = {
    ...props,
    depth: props.depth + 1
  }

  return null

  // // I'm actually not sure this is going to work. Hitting enter will add divs within the
  // // editing div, and I probably want newlines?
  // const handleChange = (evt: ContentEditableEvent) => {
  //   return props.dispatch({ type: EDIT, id: props.id, text: evt.target.value })
  // }

  // // TODO: Create Subheader Node

  // if (props.depth == 1 && !props.isCode) {
  //   return HeaderNode({ ...props, hasChildren, onFocus, onKeyDown, handleChange })
  //   // } else if (!props.isCode) {
  //   // return TextNode({ ...props, hasChildren, onFocus, onKeyDown, handleChange })
  // } else {
  //   return CodeNode({ ...props, hasChildren, onFocus, onKeyDown, handleChange })
  // }
}

export default Node
