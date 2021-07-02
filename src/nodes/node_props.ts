import { INode } from '../models/node_data'
import { EditorActions } from '../state/state_resolver'
import React from 'react'
import './node.scss'
import { ContentEditableEvent } from '../helpers/content_editable'

export interface NodeProps extends INode {
  dispatch: React.Dispatch<EditorActions>
  focus: string | null
  depth: number
}

export interface SpecializedNodeProps extends NodeProps {
  hasChildren: boolean
  onFocus: () => void
  handleChange: (ev: ContentEditableEvent) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
}
