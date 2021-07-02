import ArrowRight from '../../assets/ArrowRight'
import DownArrow from './DownArrow'
import './collapse.scss'

interface Props {
  collapsible: boolean
  collapsed: boolean
  onClick: (collapsed: boolean) => void
}

function Collapse(props: Props) {
  // We don't need to link into code (do we)? and the collapse can be inside the block to make
  return (
    <>
      {props.collapsible ? (
        <div
          className="node-arrow noselect"
          onClick={_ => {
            props.onClick(!props.collapsed)
          }}
        >
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
