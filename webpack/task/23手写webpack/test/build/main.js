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
"./src/a.js":
/*! no static exports found */
(function(module, exports) {

eval("module.exports = 'a'\n\n//# sourceURL=webpack:///./src/a.js?");

}),

"./src/b.js":

/*! no static exports found */
(function(module, exports) {

eval("module.exports = 'b'\n\n//# sourceURL=webpack:///./src/b.js?");

}),

"./src/index.js":
/*! no exports provided */
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ \"./src/a.js\");\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_a__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _b__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./b */ \"./src/b.js\");\n/* harmony import */ var _b__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_b__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconsole.log(_a__WEBPACK_IMPORTED_MODULE_0___default.a + _b__WEBPACK_IMPORTED_MODULE_1___default.a)\n\n//# sourceURL=webpack:///./src/index.js?");

})
});