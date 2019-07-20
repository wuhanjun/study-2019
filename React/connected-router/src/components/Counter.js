import React, { Component } from 'react'
import actions from '../store/actions/counterActions'
import {connect} from 'react-redux'

class Counter extends Component {
  render() {
    return (
      <div>
        Counter
        <button onClick={()=>this.props.go('/home')}>go Home</button> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return  state.counter
}

export default connect(mapStateToProps, actions)(Counter)