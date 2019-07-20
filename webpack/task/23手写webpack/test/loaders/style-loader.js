module.exports = (sourceCode) => {
  let code = `const styles = document.head.getElementsByTagName('style');
  if (styles && styles.length) {
    styles.innerHTML += JSON.stringify(sourceCode)
  } else {
    const styleEl = document.createElement('style')
    styleEl.innerHTML = ${JSON.stringify(sourceCode)}
    document.head.appendChild(styleEl)
  }`
  return code
}
