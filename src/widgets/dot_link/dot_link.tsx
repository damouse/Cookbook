import { Link } from 'react-router-dom'
import './dot_link.scss'

interface Props {
  id: string
}

function DotLink(props: Props) {
  return (
    <Link to={{ pathname: `/${props.id}` }} className="node-bullet noselect">
      <svg viewBox="0 0 18 18" className="zoomBulletIcon">
        <circle cx="9" cy="9" r="3.5"></circle>
      </svg>
    </Link>
  )
}

export default DotLink
