import { NodeComponentProps } from '../node_factory'
import Editable from '../../widgets/editible/editable'
import './comment.scss'

/**
 * A node for comments directly beneath a block of code
 *
 * NOTE: do I want to disallow nested comments on snippets?
 */
function CommentNode(props: NodeComponentProps) {
  return (
    <div className="comment-node">
      <div className="node-row">
        <div className="no-node-arrow noselect"></div>
        <Editable {...props} />
      </div>
    </div>
  )
}

export default CommentNode
