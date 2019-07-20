// const Koa = require('koa')
const Koa = require('./lib/application')
let app = new Koa()

function logger () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('logger')
      resolve()
    }, 1500)
  })
}

app.use(async (ctx, next) => {
  ctx.body = 'Hello World1'
  console.log(1)
  // await logger()
  await next()
  console.log(2)
  ctx.body = null
  ctx.res.statusCode = 204
})

app.use(async (ctx, next) => {
  ctx.body = 'Hello World3'
  console.log(3)
  await next()
  console.log(4)
  ctx.body = 'Hello World4'
})

app.use(async (ctx, next) => {
  ctx.body = 'Hello World5'
  console.log(5)
  await next()
  console.log(6)
  ctx.body = 'Hello World6'
})

app.listen(3000)
