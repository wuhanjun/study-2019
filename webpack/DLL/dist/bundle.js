 (function(modules) { // webpackBootstrap
 	// The module cache
 	var installedModules = {};

 	// The require function
 	function __webpack_require__(moduleId) {

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


 	// Load entry module and return exports
 	return __webpack_require__("./src/index.js");
 })
/************************************************************************/
 ({

/***/ "./node_modules/sum/index.js":
/*!***********************************************************************!*\
  !*** delegated ./node_modules/sum/index.js from dll-reference vendor ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(\"./node_modules/sum/index.js\");\n\n//# sourceURL=webpack:///delegated_./node_modules/sum/index.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var sum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sum */ \"./node_modules/sum/index.js\");\n/* harmony import */ var sum__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sum__WEBPACK_IMPORTED_MODULE_0__);\n\nconsole.log(sum__WEBPACK_IMPORTED_MODULE_0___default()(1, 2));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "dll-reference vendor":
/*!*************************!*\
  !*** external "vendor" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = vendor;\n\n//# sourceURL=webpack:///external_%22vendor%22?");

/***/ })

 });