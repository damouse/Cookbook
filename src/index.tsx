import ReactDOM from 'react-dom'
import './index.scss'

// import * as themes from './theme/scheme.json'
// import { storage_get, storage_put } from './helpers/local_storage'
import App from './app/app'

// From https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/
// const Index = () => {
//   storage_put('all-themes', themes.default)
//   return <App />
// }

// ReactDOM.render(<Editor source={rawJson} />, document.getElementById("root"))
ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from "./reportWebVitals"
// reportWebVitals()
