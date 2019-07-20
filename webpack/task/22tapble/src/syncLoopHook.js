class SyncHook {
  constructor (args) {
    this.args = args
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    let ret
    this.hooks.forEach((hook) => {
      do {
        ret = hook(...args)
      } while (ret !== undefined)
    })
  }
}

const hook = new SyncHook(['arg1', 'arg2', 'arg3'])

let i = 0
hook.tap('第一个事件', (...args) => {
  console.log(args)
  i++
  return i > 3 ? undefined : '继续执行'
})

hook.tap('第二个事件', (...args) => {
  console.log('第二个事件')
})

hook.call('第一个事件参数')
