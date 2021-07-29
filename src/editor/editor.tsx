import { useEffect } from 'react'
import './editor.sass'
import Menu from '../menu/menu'
import NodeFactory from '../nodes/node_factory'
import { useDeps } from '../services/context'

interface EditorProps {
  source: string
  hash: string | undefined
  onThemeChange: () => void
}

function Editor(props: EditorProps) {
  const { editorCtrl } = useDeps()
  const { state, loadFromJson, setActive } = editorCtrl

  useEffect(() => {
    loadFromJson(props.source)
  }, [props.source])

  useEffect(() => {
    // BUG: route changes don't work on the root
    if (props.hash !== undefined && props.hash !== state.target) {
      setActive(props.hash)
    }
  }, [props.hash])

  return (
    <div>
      {/* <div id="pageHeader"> */}
      {/* <h1> */}
      {/* <a href="/">Cookbook</a> */}
      {/* </h1> */}
      {/* </div> */}

      <div id="listHeader">
        <Menu onThemeChange={props.onThemeChange} state={state}></Menu>
      </div>

      <div id="listContainer">
        <div id="currentFilters"></div>
        <div id="list" className="root-children">
          <NodeFactory data={state.active} focus={state.focus} depth={0} />
          {/* <div className="loader"></div> */}
        </div>
      </div>
    </div>
  )
}

export default Editor
