// 第一段代码
const STATUS_PENDING = 'pending'
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'

class Promise {
  constructor (executer) {
    const resolve = (value) => {
      this.value = value
      this.status = STATUS_FULFILLED
    }

    const reject = (reason) => {}

    this.status = STATUS_PENDING
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
  }
}
