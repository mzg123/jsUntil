var jsanim =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js-anim-es6/js-anim-index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js-anim-es6/Tween.js":
/*!******************************!*\
  !*** ./js-anim-es6/Tween.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tween; });
class Tween {
	static linear(t, b, c, d) {
		return c * t / d + b;
	}
	static easeInQuad(t, b, c, d) {
		return c * (t /= d) * t + b;
	}
	static easeOutQuad(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	static easeInOutQuad(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * (--t * (t - 2) - 1) + b;
	}
	static easeInCubic(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	}
	static easeOutCubic(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}
	static easeInOutCubic(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}
	static easeInQuart(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	}
	static easeOutQuart(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}
	static easeInOutQuart(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}
	static easeInQuint(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	}
	static easeOutQuint(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}
	static easeInOutQuint(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}
	static easeInSine(t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	}
	static easeOutSine(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}
	static easeInOutSine(t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}
	static easeInExpo(t, b, c, d) {
		return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	}
	static easeOutExpo(t, b, c, d) {
		return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	}
	static easeInOutExpo(t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
	static easeInCirc(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	}
	static easeOutCirc(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	}
	static easeInOutCirc(t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}
	static easeInElastic(t, b, c, d, a, p) {
		if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	}
	static easeOutElastic(t, b, c, d, a, p) {
		if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	}
	static easeInOutElastic(t, b, c, d, a, p) {
		if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
		if (!a || a < Math.abs(c)) {
			a = c;var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	}
	static easeInBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	}
	static easeOutBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	}
	static easeInOutBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	}
	static easeInBounce(t, b, c, d) {
		return c - Tween.easeOutBounce(d - t, 0, c, d) + b;
	}
	static easeOutBounce(t, b, c, d) {
		if ((t /= d) < 1 / 2.75) {
			return c * (7.5625 * t * t) + b;
		} else if (t < 2 / 2.75) {
			return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
		} else if (t < 2.5 / 2.75) {
			return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
		}
	}
	static easeInOutBounce(t, b, c, d) {
		if (t < d / 2) return Tween.easeInBounce(t * 2, 0, c, d) * .5 + b;else return Tween.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}
}

/***/ }),

/***/ "./js-anim-es6/js-anim-index.js":
/*!**************************************!*\
  !*** ./js-anim-es6/js-anim-index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return JsAnimIndex; });
/* harmony import */ var _js_anim_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js-anim.js */ "./js-anim-es6/js-anim.js");


class JsAnimIndex {
							constructor(opt) {
														this.anim = new _js_anim_js__WEBPACK_IMPORTED_MODULE_0__["default"](opt);
							}

							play() {
														this.anim.play();
							}
							end() {
														this.anim.end();
							}
							stop(t) {
														this.anim.stop(t);
							}
							reset() {
														this.anim.reset();
							}
}

/***/ }),

/***/ "./js-anim-es6/js-anim.js":
/*!********************************!*\
  !*** ./js-anim-es6/js-anim.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tween.js */ "./js-anim-es6/Tween.js");


class JsAnim {
	constructor(opt) {
		this._init(opt);
	}
	_init(opt) {
		this.statue = 'init';
		this.value = this._initV.call(this, opt.value);
		this.duration = opt.duration;
		this.timeFun = opt.timeFun || 'linear';
		this.renderFun = opt.renderFun || (() => {});

		this.onPlay = opt.onPlay;
		this.onEnd = opt.onEnd;
		this.onStop = opt.onStop;
		this.onReset = opt.onReset;
	}
	_initV(value) {
		var result = [];
		value.forEach(item => {
			result.push({
				start: parseFloat(item[0]),
				end: parseFloat(item[1])
			});
		});
		return result;
	}
	play() {
		this._play();
	}
	end() {
		this.state === 'play' ? this.state = 'end' : this._end.bind();
	}
	stop(t) {
		this.state === 'play' ? this.state = 'stop' : this._stop(t);
	}
	reset() {
		this.state === 'play' ? this.state = 'init' : this._reset();
	}
	_renderFun(curT, dT, tF) {
		var tempV = this.value.map(item => {
			return tF(curT, item.start, item.end, dT);
		});
		this.renderFun(tempV);
	}
	_loop() {
		var curT = Date.now() - this.beginTime;
		var dT = this.duration;
		var tF = _Tween_js__WEBPACK_IMPORTED_MODULE_0__["default"][this.timeFun];
		if (this.state === 'end' || curT > dT) {
			this.end();
		} else if (this.state === 'init') {
			this.reset();
		} else if (this.state === 'stop') {
			this.stop(curT);
		} else {
			this._renderFun.call(this, curT, dT, tF);
			window.requestAnimationFrame(this._loop.bind(this));
		}
	}
	_play() {
		this.state = 'play';
		this.onPlay && this.onPlay();
		this.beginTime = Date.now();
		window.requestAnimationFrame(this._loop.bind(this));
	}
	_end() {
		this.state = 'end';
		var dT = this.duration;
		var tF = _Tween_js__WEBPACK_IMPORTED_MODULE_0__["default"][this.timeFun];
		this._renderFun.call(this, dT, dT, tF);
		this.onEnd && this.onEnd();
	}
	_stop(t) {
		this.state = 'stop';
		var dT = this.duration;
		var tF = _Tween_js__WEBPACK_IMPORTED_MODULE_0__["default"][this.timeFun];
		this._renderFun.call(this, t, dT, tF);
		this.onStop && this.onStop();
	}
	_reset() {
		this.state = 'init';
		var dT = this.duration;
		var tF = _Tween_js__WEBPACK_IMPORTED_MODULE_0__["default"][this.timeFun];
		this._renderFun.call(this, 0, dT, tF);
		this.onReset && this.onReset();
	}

}
/* harmony default export */ __webpack_exports__["default"] = (JsAnim);

/***/ })

/******/ });
//# sourceMappingURL=jsanim.js.map