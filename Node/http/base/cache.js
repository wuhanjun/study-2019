const http = require('http')
const chalk = require('chalk')
const fs = require('mz/fs')
const path = require('path')
const ejs = require('ejs')
const url = require('url')
const log = console.log
const template = fs.readFileSync('./ejs.html').toString()

class Server {
  constructor (options) {
    this.port = options.port
    this.host = options.host
    this.dir = options.dir
  }
  async handleServer (req, res) {
    console.log(req.headers)
    this.req = req
    this.res = res
    const {pathname} = url.parse(req.url)
    const absPath = path.join(this.dir, decodeURIComponent(pathname)) // 防止路径中中文乱码
    const statObj = await fs.stat(absPath)
    try {
      if (statObj.isDirectory()) {
        const files = await fs.readdir(absPath)
        const html = ejs.render(template, {files})
        res.setHeader('Content-Type', 'text/html')
        res.end(html)
      } else {
        this.sendFile(absPath, statObj)
      }
    } catch (e) {
      this.emitError(e)
    }
  }
  sendFile (path, statObj) {
    if (this.setCache(statObj)) {
      this.res.statusCode = 304
      this.res.end()
      return
    }
    fs.createReadStream(path).pipe(this.res)
  }
  /*
  Stats {2
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 30569414,
  size: 1112,
  blocks: 8,
  atimeMs: 1559919637962.9124,
  mtimeMs: 1559910736011.4546,
  ctimeMs: 1559910736011.4546,
  birthtimeMs: 1559877016990.651,
  atime: 2019-06-07T15:00:37.963Z,
  mtime: 2019-06-07T12:32:16.011Z,
  ctime: 2019-06-07T12:32:16.011Z,
  birthtime: 2019-06-07T03:10:16.991Z }
   */
  // if-modified-since ctime last-modified
  // etag if-none-match
  // cache-control 5
  setCache (statObj) {
    console.log(this.req.httpVersion)
    const req = this.req
    const ctime = statObj.ctime.toUTCString() // utc universal time zone 世界时间
    const size = statObj.size + ''
    if (req.headers['if-modified-since'] === ctime) {
      return true
    }
    if (req.headers['if-none-match'] === size) {
      return true
    }
    this.res.setHeader('Last-Modified', ctime)
    this.res.setHeader('Etag', size)
    this.res.setHeader('Cache-Control', 'max-age=5') // 为什么浏览器发出的是max-age=0??????
    this.res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toUTCString())
    return false
  }
  emitError (e) {
    if (!e.toString().includes('favicon')) {
      console.log(e)
    }
    this.res.statusCode = 404
    this.res.end('not found')
  }
  start () {
    http.createServer(this.handleServer.bind(this))
      .listen(this.port, this.host, () => {
        log(chalk.yellow(`static server start on ${this.host}:${this.port}`))
        log(chalk.green(` http://${this.host}:${this.port}`))
      })
  }
}
module.exports = Server
