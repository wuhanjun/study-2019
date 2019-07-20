const http = require('http')
const querystring = require('querystring')

http.createServer((req, res) => {
  let buffer = []
  console.log(req.method)
  console.log('content-type', req.headers['content-type'])
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  if (req.method === 'OPTIONS') {
    return res.end(JSON.stringify({success: true}))
  }
  req.on('data', (chunk) => {
    console.log('chunk', chunk)
    buffer.push(chunk)
  })
  req.on('end', () => {
    console.log('end')
    let query = Buffer.concat(buffer).toString()
    console.log('query', query) // name=1&age=2
    console.log(JSON.parse(query)) // 如果请求参数格式为application/json，那么用JSON.parse解析
    console.log(querystring.parse(query))// 如果用application/x-www-form-url-encoded用querystring.parse解析。注意，解析出来后都是字符串 {a: '1', b: '2'}
    res.end(JSON.stringify({success: true}))
  })
}).listen(3000)
