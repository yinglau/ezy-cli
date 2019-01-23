// Needed for redux-saga es6 generator support
import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import history from 'utils/history'

import App from 'containers/App'
import configureStore from './configureStore'

import 'statics/normalize.css'

const MOUNT_NODE = document.getElementById('root')

const initialState = {}
const store = configureStore(initialState, history)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
    ,
    MOUNT_NODE
  )
}

render()

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  // module.hot.accept(() => {});
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render()
  })
}
