(function(modules) { // webpackBootstrap
  // The module cache
  var installedModules = {};
  
  // The require function
  function __webpack_require__(moduleId) {
  
    // Check if module is in cache
    if(installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
  
    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  
    // Flag the module as loaded
    module.l = true;
  
    // Return the exports of the module
    return module.exports;
  }
  
  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;
  
  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
  })
  /************************************************************************/
  ({
  
    "./src/index.js":
    (function(module, exports, __webpack_require__) {
      eval(`const a = __webpack_require__("./src/a.js");

const b = __webpack_require__("./src/b.js");

__webpack_require__("./src/index.less");

console.log(a + b);`);
    }),
  
    "./src/a.js":
    (function(module, exports, __webpack_require__) {
      eval(`const b = __webpack_require__("./src/b.js");

console.log(b);
module.exports = 'a';`);
    }),
  
    "./src/b.js":
    (function(module, exports, __webpack_require__) {
      eval(`module.exports = 'b';`);
    }),
  
    "./src/index.less":
    (function(module, exports, __webpack_require__) {
      eval(`const styles = document.head.getElementsByTagName('style');

if (styles && styles.length) {
  styles.innerHTML += JSON.stringify(sourceCode);
} else {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = "html body {\\n  background: pink;\\n}\\n";
  document.head.appendChild(styleEl);
}`);
    }),
  
  })