"use strict";

var _class;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Person =
  log1(
    (_class =
      log2(
        (_class =
          log3(
            (_class =
              /*#__PURE__*/
              (function() {
                function Person() {
                  _classCallCheck(this, Person);
                }

                _createClass(Person, [
                  {
                    key: "kidCount",
                    value: function kidCount() {
                      return this.children.length;
                    }
                  }
                ]);

                return Person;
              })())
          ) || _class)
      ) || _class)
  ) || _class;

function log1(target) {
  console.log(target);
  console.log(1)
  return descriptor;
}

function log2(target) {
  console.log(target);
  console.log(2)
  return descriptor;
}

function log3(target) {
  console.log(target);
  console.log(3)
  return descriptor;
}

var p = new Person();
console.log(Person);
