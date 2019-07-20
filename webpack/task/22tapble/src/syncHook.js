class SyncHook {
  constructor (args) {
    this.args = args
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    this.hooks.forEach((hook) => hook(...args))
  }
}

const hook = new SyncHook(['arg1', 'arg2', 'arg3'])

hook.tap('第一个事件', (...args) => {
  console.log(args)
})

hook.tap('第二个事件', (...args) => {
  console.log(args)
})

hook.call('xixi', 'haha')
