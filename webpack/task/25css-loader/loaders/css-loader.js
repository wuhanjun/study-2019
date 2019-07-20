module.exports = (sourceCode) => {
  // 反斜杠用于转义
  // 中间的圆括号括号是捕获组匹配，调用exec方法时可以得到以下规则的数组：
  // 第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组
  const reg = /url\((.+?)\)/g
  let arr = ['let list = []']
  let pos = 0
  while (true) {
    const match = reg.exec(sourceCode)
    if (!match) break
    const [matchURL, group] = match
    arr.push(`list.push(${JSON.stringify(sourceCode.slice(pos, match.index))}))`)
    pos = reg.lastIndex
    arr.push(`list.push('url:' + require(${group}) + ')'`)
    arr.push(`list.push(${JSON.stringify(sourceCode.slice(pos))})`)
    arr.push(`module.exports = list.join('')`)
  }

  return arr.join('\r\n')
}
