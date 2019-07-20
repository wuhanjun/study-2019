const http = require('http')

http.createServer(async (req, res) => {
  const ua = req.headers['user-agent']
  console.log('asasa', ua)
  if (ua.includes('Mobile')) {
    res.statusCode = 302
    res.setHeader('location', 'http://www.google.com')
    res.end()
  } else {
    res.statusCode = 302
    res.setHeader('location', 'http://www.baidu.com')
    res.end()
  }
}).listen(3000)
