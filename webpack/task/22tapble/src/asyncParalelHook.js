class AsyncParallelHook {
  constructor (args) {
    this.hooks = []
  }
  tapAsync (name, fn) {
    this.hooks.push(fn)
  }
  callAsync (...args) {
    const finalFn = args.pop()
    let counter = 0

    const cb = () => {
      counter++
      if (counter === this.hooks.length) {
        finalFn()
      }
    }

    this.hooks.forEach((hook) => {
      hook(...args, cb)
    })
  }
}

const hook = new AsyncParallelHook(['arg1', 'arg2', 'arg3'])

hook.tapAsync('第一个事件', (...args) => {
  const cb = args.pop()
  setTimeout(() => {
    console.log(11111)
    cb()
  }, 1000)
})

hook.tapAsync('第二个事件', (...args) => {
  const cb = args.pop()
  setTimeout(() => {
    console.log(222222)
    cb()
  }, 1000)
})

hook.callAsync('第一个事件参数', () => {
  console.log('end')
})
