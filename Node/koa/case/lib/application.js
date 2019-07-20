const context = require('./context')
const request = require('./request')
const response = require('./response')
const http = require('http')
const EventEmitter = require('events')

class Koa extends EventEmitter {
  constructor () {
    super()
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middleware = []
  }
  use (fn) {
    this.middleware.push(fn)
  }
  createContext (req, res) {
    const ctx = this.context
    ctx.request = this.request
    ctx.request.req = ctx.req = req
    ctx.request.res = ctx.res = res

    ctx.response = this.response
    ctx.response.req = req
    ctx.response.res = res
    return ctx
  }
  compose (ctx) {
    const middleware = this.middleware
    async function dispatch (idx) {
      if (idx === middleware.length) {
        return Promise.resolve()
      }
      const current = middleware[idx]
      await current(ctx, () => dispatch(++idx))
    }
    return dispatch(0)
  }
  handleRequest (req, res) {
    const ctx = this.createContext(req, res)
    res.statusCode = 404
    this.compose(ctx)
      .then(() => {
        if ((res.statusCode === 204 || res.statusCode === 304 || res.statusCode === 205) && !ctx.body) {
          return res.end()
        }
        res.end(ctx.body)
      })
      .catch((e) => {
        this.emit('error', e)
      })
  }
  listen (...args) {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}

module.exports = Koa
