const Server = require('./cache')
const path = require('path')
let server = new Server({
  dir: __dirname,
  port: 3000,
  host: 'localhost'
})
server.start()
