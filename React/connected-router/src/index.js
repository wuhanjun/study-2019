import React from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
// import {ConnectedRouter} from 'connected-react-router'
import {ConnectedRouter} from './connected-router-self'
import {Route, Link} from 'react-router-dom'
import configureStore from './store/configureStore'
import history from './store/history'

import Counter from './components/Counter'
import Home from './components/Home'
import './app.css'
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
      <> { /* your usual react-router v4/v5 routing */ }
          <Link to="/">Home</Link>
          <br></br>
          <Link to="/counter">Counter</Link>

          <Route exact={true} path="/home" component={Home} />
          <Route path="/counter" component={Counter} />
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)