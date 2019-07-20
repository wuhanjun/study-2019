
import { applyMiddleware, compose, createStore } from 'redux'
// import { routerMiddleware } from 'connected-react-router'
import { routerMiddleware } from '../connected-router-self'
import history from './history'
import reducers from './reducers'
console.log(history) // 一个对象，拥有push、go、back、forward listen等方法
export default function configureStore(preloadedState) {
  const store = createStore(
    reducers, // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware( // appliMiddleware返回一个函数，参数为createStore，返回的函数的作用是将多个中间件串联调用。
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )

  return store
}