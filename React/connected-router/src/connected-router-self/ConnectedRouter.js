import React, { Component } from 'react'
import { Router } from 'react-router'
import { LOCATION_CHANGE } from './constant'
import { ReactReduxContext } from 'react-redux'

export default class ConnectedRouter extends Component {
  static contextType = ReactReduxContext
  componentDidMount() {
    // listen的回调函数会在hash变化的时候执行
    this.unlisten = this.props.history.listen((location, action) => {
      this.context.store.dispatch({
        type: LOCATION_CHANGE,
        payload: {
          location,
          action
        }
      })
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    const { history, children } = this.props
    return (
      <Router history={history}>
        {children}
      </Router>
    )
  }
}