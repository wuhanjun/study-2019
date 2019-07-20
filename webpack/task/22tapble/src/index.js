const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook 
} = require('../source-code/tapable/lib/index')

console.log(SyncWaterfallHook)

// 这里初始化的两个参数只是为了标识，之后的call最多传入两个参数。
// 而且，在监听事件中也肯定会收到这两个参数，
// 如果在call中只传入一个参数，那么第二个参数就是undefined
const hook = new SyncWaterfallHook(['arg1', 'arg2'])

hook.tap('asd', (...args) => {
  console.log(args)
  return 111
})

hook.tap('asd2', (...args) => {
  console.log(args)
  return 222
})

// 这里的call不能选择某个事件，会触发所以事件
hook.call('asd', 2)
