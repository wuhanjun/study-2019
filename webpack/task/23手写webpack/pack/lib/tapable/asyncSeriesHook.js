// 异步串联执行
class AsyncParallelHook {
  constructor (args) {
    this.hooks = []
  }
  tapAsync (name, fn) {
    this.hooks.push(fn)
  }
  callAsync (...args) {
    const finalFn = args.pop()
    let index = 0
    const next = () => { // 看起来是express源码 , 是一样的
      if (++index === this.hooks.length) return finalFn()
      this.hooks[index](...args, next)
    }
    this.hooks[index](...args, next)
  }
}

const hook = new AsyncParallelHook(['arg1', 'arg2', 'arg3'])

hook.tapAsync('第一个事件', (...args) => {
  const next = args.pop()
  setTimeout(() => {
    console.log(11111)
    next()
  }, 1000)
})

hook.tapAsync('第二个事件', (...args) => {
  const next = args.pop()
  setTimeout(() => {
    console.log(222222)
    next()
  }, 1000)
})

hook.callAsync('第一个事件参数', () => {
  console.log('end')
})
