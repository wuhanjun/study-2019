// @testable
// @testable2
// @testable3
// class MyTestableClass {
//   // ...
// }

// function testable(target) {
//   target.isTestable = true;
// }
// function testable2(target) {
//   target.isTestable2 = true;
//   return 666
// }
// function testable3(target) {
//   target.isTestable3 = true;
// }


// console.log(MyTestableClass.isTestable)

function readonly (target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
class Person {
  name () { return `${this.first} ${this.last}` }
  @readonly
  xxx = 1
  yyy = 2
}

let p = new Person()
console.log(p)