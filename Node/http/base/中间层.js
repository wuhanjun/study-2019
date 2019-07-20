const http = require('http')
const req = http.request({
  port: 3000,
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  }

}, (res) => {
  res.on('data', (chunk) => {
    console.log(chunk)
  })
  res.on('end', () => {
    console.log('end')
  })
})

req.end(JSON.stringify({
  'msg': '你好世界',
  b: 2
}))

// const querystring = require('querystring')
// const postData = JSON.stringify({
//   'msg': '你好世界',
//   b:2
// });
// console.log(postData)