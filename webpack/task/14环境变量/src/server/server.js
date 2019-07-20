const express = require('express')

const app = express()

// 这里没有/api, 前端请求时有。
app.get('/user', (req, res) => {
  res.json({
    a: 1
  })
})

app.listen(3000)
