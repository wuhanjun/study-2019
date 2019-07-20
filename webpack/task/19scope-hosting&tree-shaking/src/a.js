// function sayHello(person: string) {
//   return 'Hello, ' + person;
// }
// let user = [0, 1, 2];
// console.log(sayHello(user));
// let anyThing: any = 'hello';
// console.log(anyThing.myName);
// console.log(anyThing.myName.firstName);
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom 
console.log(Animal.name); // Tom 
