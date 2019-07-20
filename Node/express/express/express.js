const http = require('http')
const methods = require('methods')
const url = require('url')

const express = function () {
  const app = (req, res) => {
    const method = req.method.toLowerCase()
    const {pathname} = url.parse(req.url)

    for (let i = 0, len = app.routes.length; i < len; ++i) {
      const currentMiddleware = app.routes[i]
      const methodCondition = method === currentMiddleware['method'] || currentMiddleware['method'] === 'all'
      const pathnameCondition = pathname === currentMiddleware['pathname'] || currentMiddleware['pathname'] === '*'
      if (methodCondition && pathnameCondition) {
        return currentMiddleware.callback(req, res)
      }
    }
  }
  app.routes = [];
  [...methods, 'all'].forEach((method) => {
    app[method] = (pathname, callback) => {
      let layer = {
        pathname,
        method,
        callback
      }
      app.routes.push(layer)
    }
  })

  app.listen = (...args) => {
    const server = http.createServer(app)
    server.listen(...args)
  }
  return app
}

module.exports = express
