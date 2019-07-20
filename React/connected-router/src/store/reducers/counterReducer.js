import {DECREMENT, INCREMENT} from '../action-types'

export function counter (state = {num:0}, action) {
  const {payload} = action
  switch (action.type) {
    case INCREMENT:
      return {num: state.num + (payload ? payload.num : 1)}
    case DECREMENT:
      return {num: state.num - (payload ? payload.num : 1)}
    default:
      return state
  }
}