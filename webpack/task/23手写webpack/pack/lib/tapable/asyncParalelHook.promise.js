class AsyncParallelHook {
  constructor (args) {
    this.hooks = []
  }
  tapPromise (name, fn) {
    this.hooks.push(fn)
  }
  promise (...args) {
    const p = this.hooks.map((hook) => hook(...args))
    return Promise.all(p)
  }
}

const hook = new AsyncParallelHook(['arg1', 'arg2', 'arg3'])

hook.tapPromise('第一个事件', (...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(11111)
      resolve()
    }, 1000)
  })
})

hook.tapPromise('第二个事件', (...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(222222)
      resolve()
    }, 1000)
  })
})

hook.promise('第一个事件参数').then(() => {
  console.log('end')
}).catch(() => {
  console.log('error')
})
