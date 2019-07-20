import { combineReducers } from 'redux'
import { connectRouter } from '../../connected-router-self' // 这个是reducer
import {counter} from './counterReducer'
import history from '../history'

export default combineReducers({
  router: connectRouter(history),
  counter
})