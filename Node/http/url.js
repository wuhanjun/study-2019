let url = require('url')

let result = url.parse('http://wuhanjun:1q1q1q@www.baidu.com:456/index.js?a=1&b=3#q')
console.log(result)
/*
Url {
  protocol: 'http:', // 协议
  slashes: true, // 
  auth: null, // 用户名与密码部分  protocol//用户名:密码@host
  host: 'www.baidu.com:456', // 完整的小写的主机部分
  port: '456', // 端口号
  hostname: 'www.baidu.com', // 主机名，去掉端口号
  hash: #q, // fragment以#为开始，行尾为结束，也就是说hash在query组件后面
  search: '?a=1&b=3', 查询参数，带?
  query: 'a=1&b=3',查询参数，不带?
  pathname: '/index.js', // 路径名称
  path: '/index.js?a=1&b=3', // pathname + search
  href: 'http://www.baidu.com:456/index.js?a=1&b=3' 全路径
}
*/