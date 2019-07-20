// const express = require('./express/express.2')
const express = require('express')
const path = require('path')

const app = express()

app.use('/a/b', (req, res, next) => {
  req.a = 1
  console.log(1)
  next()
  console.log(2)
})

app.use((req, res, next) => {
  console.log(3)
  next()
  console.log(4)
})

app.use((req, res, next) => {
  console.log(5)
  next()
})

app.get('/12.png', (req, res) => {
  console.log(90999999)
  res.end('asd')
})
app.use(express.static(path.resolve(__dirname, './static')))

app.get('/b', (req, res) => {
  res.end('b')
})

app.listen(3000, () => {
  console.log('server start 3000')
})
