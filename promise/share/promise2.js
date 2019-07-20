const STATUS_PENDING = 'pending'
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'

class Promise {
  constructor (executer) {
    const resolve = (value) => {
      this.value = value
      this.status = STATUS_FULFILLED
      this.onFulfilledCallbacks.forEach((onFulfilled) => {
        onFulfilled()
      })
    }
    const reject = (reason) => {
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
    const status = this.status
    // 状态为fulfilled
    if (status === STATUS_FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.value)
      })
    }
    // 状态为pending
    if (status === STATUS_PENDING) {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          onFulfilled(this.value)
        })
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
    // 状态为rejected
    if (status === STATUS_REJECTED) {
      setTimeout(() => {
        onRejected(this.reason)
      })
    }
  }
}
