const express = require('./express/express.1')
// const express = require('./express/express.1.js')

const app = express()

// 必须完全符合/weather/:date/:time这种格式，少一个多一个都不行。
app.get('/weather/:date/:time', (req, res) => {
  res.end(JSON.stringify({
    data: req.params.date,
    time: req.params.time
  }))
})

// app.get('/weather/:date/:time', (req, res) => {
//   res.end(JSON.stringify({
//     data: req.params.date,
//     time: req.params.time
//   }))
// })
// /weather\/([^\/\?#]+)\/([^/?#])\/?$|#|\?/.test('/weather/2/#')
app.listen(3000, () => {
  console.log('server start 3000')
})
