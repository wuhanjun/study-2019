import {CALL_HISTORY_METHOD} from './constant'

export default function routerMiddleware (history) {
  return function ({dispatch, getState}) {
    return function (next) { // 可能是dispatch，也可能是其他中间件最内层的函数
      return function (action) { 
        // 如果是第一个中间件的最内层，会被applyMiddleware执行后作为洋葱的最外层(第一个执行)
        // 如果是最后一个中间件的最内层，会调用next(action)相当于store.dispatch(action)
        // 和上面的dispatch不同的是，如果调用上面的dispatch，相当于再次调用了用中间件增强后的dispatch，会重新执行一遍
        // 所有中间件。上面的dispatch常用于redux-thunk和redux-promise对异步action的处理。
        console.log(111111)
        console.log(action)
        console.log(CALL_HISTORY_METHOD)
        if (action.type !== CALL_HISTORY_METHOD) {
          return next(action)
        }
        console.log(22222)
        const {method, path} = action.payload
        console.log('------', path)
        history[method](path)
      }
    }
  }
}