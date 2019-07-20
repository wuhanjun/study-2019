class SyncBailHook {
  constructor () {
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    let ret
    let index = 0
    do {
      ret = this.hooks[index](...args)
      index++
    } while (ret === undefined && index < this.hooks.length)
  }
}

const hook = new SyncBailHook(['一'])

hook.tap('第一个事件', (data) => {
  console.log(data)
  return '不再执行下一个函数'
})

hook.tap('第二个事件', (data) => {
  console.log(data)
  // return '不再执行下一个函数'
})

hook.tap('第三个事件', (data) => {
  console.log(data)
})

hook.call('第一个事件的参数')
