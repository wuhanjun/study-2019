const express = require('./express/express')

const app = express()

// app.use((req, res) => {
//   console.log('all')
// })

app.get('/get', (req, res) => {
  // res.send({
  //   a: 'get'
  // })
  res.end('get')
})

app.post('/post', (req, res) => {
  // res.send({
  //   a: 'post'
  // })
  res.end('post')
})

app.all('/', (req, res) => {
  // res.send({
  //   a: 'all'
  // })
  res.end('all')
})

app.all('*', (req, res) => {
  // res.send({
  //   a: '*'
  // })
  res.end('*')
})

app.listen(3000, () => {
  console.log('server start 3000')
})