class AsyncWaterfallHook {
  constructor () {
    this.hooks = []
  }
  tapAsync (name, fn) {
    this.hooks.push(fn)
  }
  callAsync (...args) {
    let index = 0
    let finalFn = args.pop()
    const next = (err, data) => {
      if (err || ++index === this.hooks.length) return finalFn(err, data)
      this.hooks[index](data, next)
    }

    this.hooks[index](...args, next)
  }
}

const hook = new AsyncWaterfallHook(['一'])

hook.tapAsync('第一个事件', (data, next) => {
  setTimeout(() => {
    console.log(1111111)
    console.log(data)
    next('error1111', '1111的数据')
  }, 1000)
})

hook.tapAsync('第二个事件', (data, next) => {
  setTimeout(() => {
    console.log(2222222)
    console.log(data)
    next('error', '2222的数据')
  }, 1000)
})

hook.callAsync('第一个事件的参数', (err, data) => {
  console.log(err, data)
})
