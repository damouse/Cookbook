import ArrowRight from '../../assets/ArrowRight'
import DownArrow from './DownArrow'
import './collapse.scss'
import { useDeps } from '../../services/context'

interface Props {
  id: string
  collapsible: boolean
  collapsed: boolean
}

function Collapse(props: Props) {
  const {
    editorCtrl: { toggleCollapsed }
  } = useDeps()

  // We don't need to link into code (do we)? and the collapse can be inside the block to make
  return (
    <>
      {props.collapsible ? (
        <div className="node-arrow noselect" onClick={_ => toggleCollapsed(props.id)}>
          {props.collapsed ? (
            <DownArrow />
          ) : (
            <DownArrow className="right-arrow-rotation collapse-arrow" />
          )}
        </div>
      ) : (
        <div className="no-node-arrow noselect"></div>
      )}
    </>
  )
}

export default Collapse
