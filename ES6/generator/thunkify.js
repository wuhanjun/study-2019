var fs = require("fs");
var assert = require("assert");

function thunkify(fn) {
  assert("function" === typeof fn, "function required");
  // 引入断言库判断是不是函数
  // 返回一个包含thunk函数的匿名函数
  return function() {
    var args = new Array(arguments.length);
    // 创建一个数组空间
    var ctx = this;
    // 获取上下文环境用于后面绑定上下文

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }
    // 迭代传参，因为有内存泄漏bug
    // 返回真正的thunk函数
    return function(done) {
      // done相当于是执行后的callback
      var called;
      // 声明一个called保证只执行一次这个回调函数
      // 将回调函数放入参数数组中，传到真正的fn中。比如fs.readFile(path, callback)
      // 这里加called的目的是为了防止多次调用done，但是什么情况下会多次调用done呢？
      args.push(function() {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });
      // 用try catch 在执行失败也走一次callback 传入err信息
      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    };
  };
}
var readFile = thunkify(fs.readFile);

var gen = function*() {
  var r1 = yield readFile("./1.txt");
  console.log(r1.toString()); // abc
  var r2 = yield readFile("./2.txt");
  console.log(r2.toString()); // def
};

function run(fn) {
  var gen = fn();
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }
  next();
}
run(gen);
