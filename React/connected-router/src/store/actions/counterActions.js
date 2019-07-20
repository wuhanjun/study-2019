import  * as types from '../action-types'
import { push } from '../../connected-router-self'

console.log(push('/'))
// {
//    type: "@@router/CALL_HISTORY_METHOD",
//    payload: {
//        args: ['/']
//        method: 'push'
//    }
// }

export default {
  increment(){
      return {type:types.INCREMENT}
  },
  decrement(){
      return {type:types.DECREMENT}
  },
  go(path){
      return push(path)
  }
}