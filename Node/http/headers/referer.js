const http = require('http')
const fs = require('mz/fs')
const path = require('path')
const url = require('url')

// 可以利用referer判定请求来源，做防盗链。比如请求图片，则返回一张不可用的图片。
http.createServer(async (req, res) => {
  console.log('url', req.url)
  const absPath = path.join(__dirname, url.parse(req.url).pathname)

  try {
    const statObj = await fs.stat(absPath)
    if (!statObj.isDirectory()) {
      const referer = req.headers['referer']
      const host = req.headers['host'].split(':')[0]
      console.log('headers', req.headers)
      console.log('referer', referer)
      console.log('host', host)
      if (req.headers['host'] !== 1) {

      }
    }
  } catch (e) {
    console.log(e)
  }
}).listen(3000)
