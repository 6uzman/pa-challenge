import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from './router/Router'
import store from './redux/store'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
          <Router />
        </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
