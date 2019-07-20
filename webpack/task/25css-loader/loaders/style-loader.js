const loaderUtils = require('loader-utils')

function loader (sourceCode) {
  console.log('111loader')
  let code = `
  const elStyle = document.createElement('style')
  elStyle.innerHTML = ${JSON.stringify(sourceCode)}
  document.head.appendChild(elStyle)
  `
  return code
}

loader.pitch = function (remainingRequest) {
  let code = `
  const elStyle = document.createElement('style')
  elStyle.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
  document.head.appendChild(elStyle)`

  return code
}

module.exports = loader
