import {LOCATION_CHANGE} from './constant'

// 这个是reducer，用来处理在listen事件触发时dispatch的action
export default function connectRouter (history) {
  let initState = {
    location: history.location,
    action: history.action
  }

  return function (state=initState, action) {
      if (action.type === LOCATION_CHANGE) {
          return {
              location: action.payload.location,
              action: action.payload.action
          }
      }
      return state
  }
}