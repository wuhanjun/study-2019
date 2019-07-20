class SyncWaterfallHook {
  constructor () {
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    const [firstHook, ...otherHooks] = this.hooks
    const ret = firstHook(...args)
    otherHooks.reduce((previewRet, nextHook) => nextHook(previewRet), ret)
  }
}

const hook = new SyncWaterfallHook(['一'])

hook.tap('第一个事件', (data) => {
  console.log(data)
  return '第一个事件返回值'
})

hook.tap('第二个事件', (data) => {
  console.log(data)
  return '第二个事件返回值'
})

hook.tap('第三个事件', (data) => {
  console.log(data)
})

hook.call('第一个事件的参数')
