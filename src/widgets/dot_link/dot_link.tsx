import { Link } from 'react-router-dom'
import './dot_link.scss'

interface Props {
  id: string
}

function DotLink(props: Props) {
  return (
    <Link to={{ pathname: `/${props.id}` }} className="node-bullet noselect">
      &#9679;
    </Link>
  )
}

export default DotLink
