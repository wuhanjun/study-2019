const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  console.log(666)
  req.on('data', (chunk) => {
    data.push(chunk)
    console.log(chunk)
  })
  req.on('end', () => {
    console.log(Buffer.concat(data).toString())
    res.statusCode = 200
    res.end('asdasdasdasdas')
  })
})
const data = []

server.listen(3000)
