const EventEmitter = require('./eventEmitter')
// const EventEmitter = require('events')

let child = new EventEmitter()
child.on('newListener', (eventName) => {
  console.log(eventName)
}) 

child.on('q', () => {
  console.log(11)
})

child.once('w', () => {
  console.log(22)
})

child.emit('q')
child.emit('q')
child.emit('w')
child.emit('w')
