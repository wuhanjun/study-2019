const STATUS_PENDING = 'pending'
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'

class Promise {
  constructor (executer) {
    const resolve = (value) => {
      if (this.status !== STATUS_PENDING) return
      this.value = value
      this.status = STATUS_FULFILLED
      this.onFulfilledCallbacks.forEach((onFulfilled) => {
        onFulfilled()
      })
    }
    const reject = (reason) => {
      if (this.status !== STATUS_PENDING) return
      this.reason = reason
      this.status = STATUS_REJECTED
      this.onRejectedCallbacks.forEach((onFulfilled) => {
        onFulfilled()
      })
    }

    this.status = STATUS_PENDING
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    executer(resolve, reject)
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

    const promise2 = new Promise((resolve, reject) => {
      const status = this.status
      // 状态为fulfilled
      if (status === STATUS_FULFILLED) {
        setTimeout(() => {
          const x = onFulfilled(this.value)
          this.resolvePromise(x, promise2, resolve, reject)
        })
      }
      // 状态为pending
      if (status === STATUS_PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            const x = onFulfilled(this.value)
            this.resolvePromise(x, promise2, resolve, reject)
          })
        })
        this.onRejectedCallbacks.push(() => {
          const x = onRejected(this.reason)
          this.resolvePromise(x, promise2, resolve, reject)
        })
      }
      // 状态为rejected
      if (status === STATUS_REJECTED) {
        setTimeout(() => {
          const x = onRejected(this.reason)
          this.resolvePromise(x, promise2, resolve, reject)
        })
      }
    })
    return promise2
  }

  resolvePromise (x, promise2, resolve, reject) {
    if (x === promise2) {
      reject(new TypeError('返回的promise2在等待自己的状态从pending转为其他，做不到...')) // 规定这里必须是TypeError，typeerror表示非预期类型错误
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        if (typeof x.then === 'function') {
          // 如果是个promise，那么调用x.then，等该promise的状态变为resolve或者reject。
          x.then(
            (y) => {
              resolve(y) // 一个问题：如果resolve的值为一个promise对象呢？
              // this.resolvePromise(y, promise2, resolve, reject)
            },
            (reason) => {
              reject(reason)
            }
          )
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)
      }
    } else {
      resolve(x)
    }
  }

  catch (onReject) {
    return this.then(null, onReject)
  }
  // 静态方法
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
