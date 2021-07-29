
import './code_button.scss'
import { useDeps } from '../../services/context'

interface Props {
    id: string
    isCode: boolean
}

function CodeButton(props: Props) {
    const {
        editorCtrl: { toggleCode }
    } = useDeps()

    return (
        <div className="code-toggle" onClick={_ => toggleCode(props.id)}>
            {props.isCode ? "</>" : "<>"}
        </div >
    )
}

export default CodeButton
