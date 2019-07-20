const STATUS_PENDING = 'pending'
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'

class Promise {
  constructor (executer) {
    // const that = this
    const reject = (reason) => {
      if (this.status !== STATUS_PENDING) return

      this.reason = reason
      this.status = STATUS_REJECTED
      this.rejectedCallbacks.forEach((rejectedCallback) => rejectedCallback())
    }
    const resolve = (value) => {
      if (this.status !== STATUS_PENDING) return

      // if ((typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function') {
      //   return resolve(value)
      // }
      // 这里是用于在new Promise中resolve一个promise实例，进行递归等待内部所有promise实例状态转为fulfilled或者rejected
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      this.value = value
      this.status = STATUS_FULFILLED
      this.resolvedCallbacks.forEach((resolvedCallback) => resolvedCallback())
    }

    this.status = STATUS_PENDING
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    try {
      executer(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value // p.then().then().then()
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err }

    // const that = this // 因为下面用了箭头函数，自动找作用域链上一层，所以不用这个that。
    // 将所有then中的方法放到setTimeout的原因是：这些方法默认要异步执行。例子见./cases/async-then-fn.html

    const promise2 = new Promise((resolve, reject) => {
      if (this.status === STATUS_PENDING) {
        this.resolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              // 这里拿到返回值，是为了then的链式调用。之前then中的return值作为下一个then的入参
              const x = onFulfilled(this.value)
              // resolve(x) 不能简单用resolve，是因为有可能返回的是一个promise实例，所以我们需要判定。
              // 按规范需要等该promise实例的状态转为fulfilled或者rejected，才能进入下一个then
              // 有人会问，我不能直接返回一个promise值吗？
              // 可以呀，没人拦着你，但是规范中要求的是刚刚描述的，在实际生产中确实也好用。
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
      if (this.status === STATUS_FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === STATUS_REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            // 这里的resolv统一翻译为解析
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2
  }

  // x是调用方resolve传进来的，需要考虑到别人的promise可能即可以调用成功也可以调用失败，
  // 也就是在构造函数那里不判断状态是否为pending.
  // 所以，我们需要在这里面加一个判断条件，来判断是否已经执行过resolve(也就是调用过resolvedCallbacks)或者resolve(也就是rejectedCallbacks)
  // 如果执行过，我这边就不再执行订阅(也就是存在callBacks中的那些函数)
  resolvePromise (promise2, x, resolve, reject) {
    // 不论是onFullilled或者onRejected返回的，都是x。
    if (x === promise2) {
      reject(new TypeError('返回的promise2在等待自己的状态从pending转为其他，做不到呀~')) // 规定这里必须是TypeError，typeerror表示非预期类型错误
    }
    // 是一个promise实例
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      // 这个y也就是then方法中创造的promise实例resolve的值。
      // 在这里可以递归调用，因为如果每次resolve的值都是一个promise对象，每次调用then都会创造一个promise2，来等待resolve的值从pending转到其他状态。
      // 将最外层的promise2及他的resolve和reject传进去，造成的结果就是一层等待完了，继续等待下一层。我在等待的时候并不知道下一层resolve的值会是什么。

      // 举个例子：当第一个promise实例的状态从pending转为其他状态，那就会执行下面这个resolvePromise。
      // 现在我又拿到了y，还是一个promise实例。那最外层的promise2就会转为等待这个promise实例的状态从pending转为其他。
      let isCalled = false
      try {
        // x是调用方resolve传进来的，所以需要考虑到调用报错的情况。比如
        /* Object.defineProperty(x, 'then', {
          get : function(){
            throw new Error('错误')
          },
          set : function(newValue){
            bValue = newValue;
          },
        }) */
        let then = x.then // 为什么必须把x.then的引用存储到变量上？
        // 按文档中说的，如果下面也是用x.then的方式引用的话，其值容易改变。但是这代码是同步的，怎么会被改变呢？
        if (typeof then === 'function') {
          then.call(x,
            (y) => {
              if (isCalled) return
              isCalled = true
              this.resolvePromise(promise2, y, resolve, reject)
            },
            (reason) => {
              if (isCalled) return
              isCalled = true
              reject(reason)
            }
          )
        } else {
          resolve(x)
        }
      } catch (err) {
        if (isCalled) return
        isCalled = true
        reject(err)
      }
    } else {
      resolve(x)
    }
  }

  catch (onRejected) {
    return this.then(null, onRejected)
  }

  finally (callback) {
    // 将
    let P = this.constructor
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    )
  }

  static deferred () {
    const deferred = {}
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve
      deferred.reject = reject
    })
    return deferred
  }

  static resolve (value) {
    return new Promise((resolve) => resolve(value))
  }

  static reject (reason) {
    return new Promise((resolve, reject) => reject(reason))
  }

  static all (promises) {
    return new Promise((resolve, reject) => {
      // 注意这里用计数器，而不是在下面判断result数组的长度是否和promises相等
      // 是因为var a = []; a[5] = 1 // a.length === 6
      let counter = 0
      let result = []
      let len = promises.length

      function processData (data, i) {
        result[i] = data
        if (++counter === len) {
          resolve(result)
        }
      }

      for (let i = 0; i < len; ++i) {
        const currentP = promises[i]
        if (currentP !== null && (typeof currentP === 'object' || typeof currentP === 'function') && typeof currentP.then === 'function') {
          promises[i].then((data) => {
            processData(data, i)
          }, reject) // 这里简写为reject，不用一个函数内部调用reject了。
        } else {
          processData(currentP, i)
        }
      }
    })
  }

  static race (promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0, len = promises.length; i < len; ++i) {
        const p = promises[i]
        if (p !== null && (typeof p === 'object' || typeof p === 'function') && typeof p.then === 'function') {
          promises[i].then((data) => {
            resolve(data)
          }, reject)
        } else {
          resolve(p)
        }
      }
    })
  }
}

module.exports = Promise
