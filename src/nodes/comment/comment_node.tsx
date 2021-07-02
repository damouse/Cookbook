import { NodeProps2 } from '../node_factory'
import Editable from '../../widgets/editible/editable'
import './comment.scss'

/**
 * A node for comments directly beneath a block of code
 */
function CommentNode(props: NodeProps2) {
  return (
    <div className="node comment-node">
      <div className="node-row">
        <div className="no-node-arrow noselect"></div>
        <Editable {...props} />
      </div>
    </div>
  )
}

export default CommentNode
