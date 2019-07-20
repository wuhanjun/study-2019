@log1
@log2
@log3
class Person {
  kidCount () { return this.children.length; }
}

function log1(target) {
  console.log(target)
  console.log(1)
  return descriptor;
}
function log2(target) {
  console.log(target)
  console.log(2)
  return descriptor;
}
function log3(target) {
  console.log(target)
  console.log(3)
  return descriptor;
}

let p = new Person()
console.log(Person)