import './collapse.scss'

interface Props {
  collapsible: boolean
  collapsed: boolean
}

function Collapse(props: Props) {
  // We don't need to link into code (do we)? and the collapse can be inside the block to make
  return (
    <>
      {props.collapsible ? (
        <div className="node-arrow noselect" style={{ marginLeft: 10 }}>
          {props.collapsed ? <>&#9660;</> : <>&#9654;</>}
        </div>
      ) : (
        <div className="no-node-arrow noselect"></div>
      )}
    </>
  )
}

export default Collapse
