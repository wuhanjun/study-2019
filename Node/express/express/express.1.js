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
      const paramNames = currentMiddleware['pathname'].paramNames
      if (paramNames) {
        // console.log(currentMiddleware['pathname'])
        // console.log(pathname)
        const [, ...match] = pathname.match(currentMiddleware['pathname'])
        req.params = paramNames.reduce((obj, key, idx) => {
          obj[key] = match[idx]
          return obj
        }, {})
        return currentMiddleware.callback(req, res)
      }
      if (methodCondition && pathnameCondition) {
        return currentMiddleware.callback(req, res)
      }
    }
  }

  app.routes = [];
  [...methods, 'all'].forEach((method) => {
    app[method] = (pathname, callback) => {
      // /weather/:date/:time
      let paramNames = []
      if (pathname.includes(':')) {
        pathname = pathname.replace(/:([^\/]+)/g, (...args) => {
          paramNames.push(args[1])
          return '([^/]+)'
        })
        // pathname += pathname[pathname.length - 1] === '/' ? '?\\??' : '/?\\??'
        pathname = new RegExp(pathname)
        pathname.paramNames = paramNames
      }
      const layer = {
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

  app.use = (pathname, callback) => {
    if (typeof callback !== 'function' && pathname === undefined) {
      callback = pathname
      pathname = '/'
    }
    const layer = {
      callback,
      pathname,
      method: 'middleware'
    }
    app.routes.push(layer)
  }

  return app
}

module.exports = express
