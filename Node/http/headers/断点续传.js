const http = require('http')
const fs = require('mz/fs')
// 客户端那边每次收到接口返回就再次调用接口进行获取
// bilibili用的是header: Range
// youtobe用的是ajax get接口，range为一个字段
// curl http://localhost:3000 -H Range:bytes=1-2
http.createServer(async (req, res) => {
  const range = req.headers['range']
  if (range) {
    try {
      const {size} = await fs.stat('./big.js')
      const reg = /(\d)-(\d)/
      // 匹配返回值：["5-1", "5", "1", index: 12, input: "bytes 1055305-1136276/3883413", groups: undefined]
      const [,start, end = size] = range.match(reg)
      console.log(range.match(reg))
      res.statusCode = 206
      res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
      fs.createReadStream('./big.js', {
        start: Number(start),
        end: Number(end)
      }).pipe(res)
    } catch (e) {
      console.log(e)
      res.statusCode = 404
      res.end('error')
    }
  }
}).listen(3000)
