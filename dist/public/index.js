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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/dist/cjs.js!./src/public/style.css":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js!./src/public/style.css ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "* {\n  touch-action: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  pointer-events: none;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n  margin: 0;\n  padding: 0;\n  font-family: Roboto, Arial, Helvetica, sans-serif;\n}\n\n#canvasWrapper {\n  position: absolute;\n  width: 100vh;\n  height: 100vh;\n  touch-action: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  pointer-events: none;\n  background-color: #dddddd;\n}\n\n#canvas {\n  position: absolute;\n  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);\n  touch-action: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  pointer-events: auto;\n  cursor: crosshair;\n}\n\ndiv {\n  position: absolute;\n  touch-action: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  pointer-events: none;\n}\n\n*::-webkit-scrollbar {\n  display: none;\n  pointer-events: none;\n}\n\nul {\n  padding: 0;\n  margin: 0;\n}\n\n.toolbar {\n  position: fixed;\n  left: -6px;\n  top: 0px;\n  width: 60px;\n  height: 200vh;\n  background-color: white;\n  border-right: 4px solid #333333;\n  z-index: 3555;\n}\n\nul.buttons {\n  width: 60px;\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n\n.buttons li {\n  width: 60px;\n  height: 60px;\n  margin-top: 0px;\n  pointer-events: initial;\n  background-color: white;\n  text-decoration: none;\n  transition: background-color 0.1s ease-out;\n}\n\n.tools svg {\n  transform: scale(0.7, 0.7);\n  padding-left: 3px;\n}\n\nli:hover {\n  background-color: #ebebeb;\n  transition: background-color 0.1s ease-in-out;\n}\n\n/* li svg{\n  justify-content: center;\n} */\n.active {\n  pointer-events: initial;\n  border-right: 4px solid #FF6009;\n  transition: 0.5s ease-in-out;\n}\n\n.window {\n  position: fixed;\n  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);\n  left: -300px;\n  top: -6px;\n  width: 236px;\n  height: 200vh;\n  z-index: 2999;\n  background-color: white;\n  transition: 0.1s ease-in-out;\n}\n\n.setting-window-header {\n  width: 100%;\n  height: 66px;\n  /* background: #333333; */\n}\n\n.header-title {\n  padding-top: 17px;\n  padding-left: 15px;\n  color: #333333;\n  font-size: 30px;\n}\n\n.header-timer {\n  position: fixed;\n  color: #333333;\n  font-size: 30px;\n  top: 10px;\n  right: 10px;\n}\n\n.chat-window {\n  position: fixed;\n  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);\n  left: -400px;\n  top: -6px;\n  width: 236px;\n  height: 106vh;\n  z-index: 2999;\n  background-color: white;\n}\n\n.chat-window.show {\n  left: 55px;\n}\n\n.chat-window-header {\n  background: #333333;\n  height: 60px;\n  width: 100%;\n}\n\n.signin {\n  margin-left: 120px;\n  margin-top: 20px;\n  width: 98px;\n  height: 19px;\n  /* background-color: #444444; */\n  border: 1px solid #FF6009FF;\n  color: #EFEFEF;\n  pointer-events: initial;\n  text-align: center;\n  padding-top: 9px;\n  font-size: 14px;\n  font: 14px Roboto, Arial, Helvetica, sans-serif;\n}\n\n.signin:hover {\n  background-color: #FF6009FF;\n}\n\n.chat-window-textarea-container {\n  width: 100%;\n  height: 800px;\n  background-color: #dddddd;\n}\n\n.show {\n  left: 54px;\n  transition: 0.2s ease-out;\n}\n\n/* Slider Decoration */\n.middle {\n  width: 100%;\n  pointer-events: initial;\n  display: grid;\n  grid-template-columns: 100%;\n  grid-template-rows: 50px 50px 50px 50px 50px 50px;\n}\n\n.slider-container {\n  position: initial;\n  padding: 15% 0% 0% 4%;\n  grid-row: 50px;\n  pointer-events: initial;\n}\n\n.slider-container .bar {\n  pointer-events: initial;\n}\n\n.slider-container .slider {\n  pointer-events: initial;\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  margin-left: 10px;\n  border-radius: 5px;\n  width: 194px;\n  height: 9px;\n  outline: none;\n  background-color: #FF6009;\n}\n\n.slider-tag {\n  margin-left: 9px;\n}\n\n.value-text {\n  margin-top: -19px;\n  padding-left: 180px;\n}\n\ninput[type=range]::-ms-track {\n  width: 100%;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\n\ninput[type=range]:focus {\n  outline: none;\n}\n\ninput[type=range]::-moz-range-thumb {\n  appearance: none;\n  -moz-appearance: none;\n  background-color: #FFFFFFFF;\n  box-shadow: 0 0 3px 2px #0000000F;\n  border: 3px solid #ddddddFF;\n  width: 17px;\n  height: 17px;\n  border-radius: 50%;\n  cursor: pointer;\n  /* outline: none; */\n  -moz-transition: 0.3s ease-in-out;\n  transition: 0.3s ease-in-out;\n}\n\ninput[type=range]::-webkit-slider-thumb {\n  appearance: none;\n  -webkit-appearance: none;\n  background-color: #FFFFFFFF;\n  box-shadow: 0 0 3px 2px #0000000F;\n  border: 3px solid #ddddddFF;\n  width: 23px;\n  height: 23px;\n  border-radius: 50%;\n  cursor: pointer;\n  /* outline: none; */\n  -webkit-transition: 0.3s ease-in-out;\n  transition: 0.3s ease-in-out;\n}\n\ninput[type=range]::-ms-thumb {\n  appearance: none;\n  -ms-appearance: none;\n  background-color: #FFFFFFFF;\n  box-shadow: 0 0 3px 2px #0000000F;\n  border: 3px solid #ddddddFF;\n  width: 23px;\n  height: 23px;\n  border-radius: 50%;\n  cursor: pointer;\n  /* outline: none; */\n  -ms-transition: 0.3s ease-in-out;\n  transition: 0.3s ease-in-out;\n}\n\ninput[type=range]::-moz-range-thumb:hover {\n  box-shadow: 0 0 0 3px rgba(98, 98, 98, 0.1);\n}\n\ninput[type=range]::-webkit-slider-thumb:hover {\n  box-shadow: 0 0 0 3px rgba(98, 98, 98, 0.1);\n}\n\ninput[type=range]::-ms-thumb:hover {\n  box-shadow: 0 0 0 3px rgba(98, 98, 98, 0.1);\n}\n\n/* *-------sliderconfig---------- */\n.switch {\n  display: grid;\n  padding: 20% 0% 0% 0%;\n  margin-left: 174px;\n  grid-row: 60px;\n  pointer-events: initial;\n  width: 40px;\n}\n\n/* Hide default HTML checkbox */\n.switch input {\n  display: grid;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n/* The slider */\n.checkSlider {\n  display: inline-block;\n  cursor: pointer;\n  pointer-events: initial;\n  background-color: #ddddddFF;\n  height: 18px;\n  transition: 0.4s;\n  border-radius: 34px;\n  box-shadow: 0 0 3px 2px #0000000F;\n}\n\n.checkSlider:before {\n  display: inline-block;\n  position: inherit;\n  cursor: pointer;\n  content: \" \";\n  height: 12px;\n  width: 12px;\n  margin-top: -40px;\n  margin-left: 4px;\n  background-color: #ffffffFF;\n  transition: 0.4s;\n  border-radius: 34px;\n  box-shadow: 0 0 0 2px #ddddddFF;\n}\n\ninput:checked + .checkSlider {\n  background-color: #FF6009;\n}\n\ninput:focus + .ckeckSlider {\n  box-shadow: 0 0 1px #FF6009;\n}\n\ninput:checked + .checkSlider:before {\n  transform: translateX(21px);\n  box-shadow: 0 0 0 2px #FFFFFF;\n}\n\n.switch-text {\n  position: initial;\n  margin-top: -20px;\n  margin-left: -154px;\n  font-size: 16px;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/public/UI.ts":
/*!**************************!*\
  !*** ./src/public/UI.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Buttons; });
class Buttons {
    constructor(view) {
        this.view = view;
        this.view = view;
        this.barg = document.querySelector('#barg');
        this.pencil = document.querySelector("#pencil");
        this.eraser = document.querySelector("#eraser");
        this.fill = document.querySelector("#fill");
        this.palatte = document.querySelector("#palatte");
        this.dl = document.querySelector("#download");
        this.chat = document.querySelector("#textChat");
        this.pencilSettingWindow = document.querySelector('.pencil-settings');
        this.eraserSettingWindow = document.querySelector('.eraser-settings');
        this.chatWindow = document.querySelector('.chat-window');
        this.sliders = document.getElementsByTagName('input');
        this.penSizeText = document.querySelector(".pen-size-text");
        this.eraSizeText = document.querySelector(".era-size-text");
        this.fillSizeText = document.querySelector(".fill-size-text");
        this.pressureToggle = document.querySelector('.pressure-toggle');
    }
    sliderElementSetup() {
        const penSize = this.sliders[0], penAlpha = this.sliders[1], penSmooth = this.sliders[2], eraSize = this.sliders[4], eraAplha = this.sliders[5], eraSmooth = this.sliders[6];
        penSize.addEventListener('input', (e) => {
            e.preventDefault();
            this.penSizeText.innerText = penSize.value;
            this.view.penRadius = parseInt(penSize.value, 10);
        });
        eraSize.addEventListener('input', (e) => {
            e.preventDefault();
            this.eraSizeText.innerText = eraSize.value;
            this.view.eraRadius = parseInt(eraSize.value, 10);
        });
    }
    toggleElementSetUp() {
        this.pressureToggle.addEventListener('change', () => {
            this.pressureToggle.checked ? this.view.pressureToggle = true : this.view.pressureToggle = false;
        });
    }
    elementActivate() {
        this.sliderElementSetup();
        this.toggleElementSetUp();
        this.barg.addEventListener('click', (e) => {
            e.preventDefault();
            this.pencilSettingWindow.classList.toggle('show', false);
            this.eraserSettingWindow.classList.toggle('show', false);
            this.chatWindow.classList.toggle('show', false);
        });
        this.pencil.addEventListener('click', (e) => {
            e.preventDefault();
            this.pencil.classList.contains('active') ? this.pencil.classList.contains(' ') : this.pencil.classList.add('active');
            if (this.pencil.classList.contains('active')) {
                this.eraser.classList.remove('active');
                this.fill.classList.remove('active');
                this.chat.classList.remove('active');
                this.pencil.classList.add('active');
                this.view.eraserToggle = false;
            }
            this.pencilSettingWindow.classList.toggle('show', true);
            this.eraserSettingWindow.classList.toggle('show', false);
            this.chatWindow.classList.toggle('show', false);
        });
        this.eraser.addEventListener('click', (e) => {
            e.preventDefault();
            this.eraser.classList.contains('active') ? this.eraser.classList.contains(' ') : this.eraser.classList.add('active');
            if (this.eraser.classList.contains('active')) {
                this.pencil.classList.remove('active');
                this.fill.classList.remove('active');
                this.chat.classList.remove('active');
                this.eraser.classList.add('active');
                this.view.eraserToggle = true;
            }
            this.eraserSettingWindow.classList.toggle('show', true);
            this.pencilSettingWindow.classList.toggle('show', false);
            this.chatWindow.classList.toggle('show', false);
        });
        this.chat.addEventListener('click', (e) => {
            e.preventDefault();
            this.chat.classList.contains('active') ? this.chat.classList.contains(' ') : this.chat.classList.add('active');
            if (this.chat.classList.contains('active')) {
                this.pencil.classList.remove('active');
                this.fill.classList.remove('active');
                this.eraser.classList.remove('active');
                this.chat.classList.add('active');
            }
            this.chatWindow.classList.toggle('show', true);
            this.pencilSettingWindow.classList.toggle('show', false);
            this.eraserSettingWindow.classList.toggle('show', false);
        });
    }
}


/***/ }),

/***/ "./src/public/index.ts":
/*!*****************************!*\
  !*** ./src/public/index.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tools; });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/public/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/public/UI.ts");
// import io from "socket.io-client"


const socketOption = {
    reconnectionDelay: 50000,
    transports: ['websocket', 'polling']
};
// const socket = io("http://localhost:5000")
const socket = io("https://app-drawn.herokuapp.com", socketOption);
class Application {
    constructor(canvas, context2D) {
        this.canvas = canvas;
        this.context2D = context2D;
        this.canvas = canvas;
        this.context2D = context2D;
        this._dpr = window.devicePixelRatio || 1;
    }
    setUpView(width, height, color, hide = false, smooth = false) {
        this._settingCanvasSize(width, height);
        this._backgroundColor(color);
        this._hideMenuHandler(hide);
        this._isImageSmoothing(smooth);
    }
    _settingCanvasSize(width, height) {
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.width = width;
        this.canvas.height = height;
    }
    clearAll() {
        this.context2D.clearRect(0, 0, this.width, this.height);
        this.context2D.beginPath();
    }
    _backgroundColor(color) {
        this.context2D.fillStyle = color;
        this.context2D.fillRect(0, 0, this.width, this.height);
    }
    _hideMenuHandler(bool) {
        var _a, _b;
        if (bool) {
            document.addEventListener('contextmenu', e => e.preventDefault());
            document.addEventListener('MSHoldVisal', e => e.preventDefault());
            (_a = document.getElementById('#canvasWrapper')) === null || _a === void 0 ? void 0 : _a.addEventListener('contextmenu', (e) => e.preventDefault());
            (_b = document.getElementById('#canvasWrapper')) === null || _b === void 0 ? void 0 : _b.addEventListener('MSHoldVisal', (e) => e.preventDefault());
        }
    }
    _isImageSmoothing(bool) {
        this.context2D.imageSmoothingEnabled = bool;
    }
    // *getter/setter Method
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
}
const eventStack = [];
class Tools extends Application {
    constructor(element, context2D) {
        super(element, context2D);
        // ----- ツール関連プロパティ
        this.canvasColor = "black";
        this.drawToggle = false;
        this.eraserToggle = false;
        this.pressureToggle = false;
        // ----- PenSize用プロパティ -----
        this.defRad = 10;
        this.penRadius = 10;
        this.eraRadius = 10;
        this.capStyle = 'round';
        this.joinStyle = 'round';
        this._pinchToggle = false;
        // ---- - UndoRedo -------
        // private STACK_MAX_SIZE: number = 100
        // private undoStack = []
        // private redoStack = []
        this.emitStack = [];
        this.eventActivation();
    }
    eventActivation() {
        if (window.PointerEvent) {
            this.canvas.addEventListener('pointerdown', (event) => { event.preventDefault(); this.downPointerController(event); }, { passive: false, });
            this.canvas.addEventListener('pointerup', (event) => { event.preventDefault(); this.upPointerController(event); }, { passive: false, });
            this.canvas.addEventListener('pointermove', (event) => { event.preventDefault(); this.movePointerController(event); }, { passive: false, });
            this.canvas.addEventListener('pointercancel', (event) => { event.preventDefault(); this.leavePointerHandler(event); }, { passive: false, });
            document.addEventListener('wheel', (event) => {
                event.preventDefault();
                if (isNaN(this.nowR)) {
                    this.nowR = 1;
                }
                if (event.deltaY > 1) {
                    this.nowR -= 0.2;
                }
                else if (event.deltaY < -1) {
                    this.nowR += 0.2;
                }
                this.zoomX = event.pageX;
                this.zoomY = event.pageY;
                this._pinchHandle(event);
            }, { passive: false, });
            document.addEventListener('pointerleave', event => this.leavePointerHandler(event), {
                passive: false,
            });
            document.addEventListener('pointerout', (event) => this.leavePointerHandler(event), { passive: false, });
        }
        else {
            this.canvas.addEventListener('mousedown', (event) => this.downMouseHandler(event));
            this.canvas.addEventListener('mouseup', (event) => this.upMouseHandler(event));
            this.canvas.addEventListener('mousemove', (event) => this.moveMouseHandler(event));
            this.canvas.addEventListener('mouseleave', (event) => this.leaveMouseHandler(event));
        }
    }
    pointerSwitcher(event, pen, touch, mouse) {
        switch (event.pointerType) {
            case 'pen':
                pen;
                break;
            case 'touch':
                touch;
                break;
            case 'mouse':
                mouse;
                break;
        }
    }
    // ---- PointerEvents ---
    // !------ Switcher ------
    // *- Main Callback Functions -
    downPointerController(event) {
        event.preventDefault();
        this.pointerSwitcher(event, this.handlePenDown(event), this.handleTouchDown(event), this.handleMouseDown(event));
    }
    movePointerController(event) {
        event.preventDefault();
        this.pointerSwitcher(event, this.handlePenMove(event), this.handleTouchMove(event), this.handleMouseMove(event));
    }
    upPointerController(event) {
        event.preventDefault();
        if (eventStack) {
            this._removeEventStack(event);
        }
        this.drawToggle = false;
        this.emitStack.push({ color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle });
        this.emitPoint(this.emitStack);
        this.emitStack = [];
        this.context2D.beginPath();
    }
    // ---- PointerEvents ---
    // *------- DOWN -------
    handlePenDown(event) {
        event.preventDefault();
        this.context2D.beginPath();
        this.drawToggle = true;
    }
    handleTouchDown(event) {
        event.preventDefault();
        this.context2D.beginPath();
        eventStack.push(event);
        if (eventStack.length === 1) {
            this.drawToggle = true;
            this.p1 = eventStack[0];
        }
        if (eventStack.length >= 2) {
            this.drawToggle = false;
            this.p2 = eventStack[1];
            this.pinchDist = this._calclationPointsDistance(this.p1.pageX, this.p1.pageY, this.p2.pageX, this.p2.pageY);
            this.tp1x = (eventStack[0].pageX - this.canvas.offsetLeft);
            this.tp1y = (eventStack[0].pageY - this.canvas.offsetTop);
            this.distX = (eventStack[0].pageX - this.tp1x);
            this.distY = (eventStack[0].pageY - this.tp1y);
            this.nowR = this.dist / this.pinchDist;
        }
    }
    handleMouseDown(event) {
        event.preventDefault();
        this.context2D.beginPath();
        this.drawToggle = true;
    }
    // ---- PointerEvents ---
    // *------- MOVE -------
    handlePenMove(event) {
        event.preventDefault();
        if (this.drawToggle) {
            this.eraseTool();
            this.context2D.lineWidth = this.initializePressure(event);
            this.pencilTool(event);
            this.stackPoint(this._pressurePoints(event, this.initializePressure(event)));
        }
    }
    // *-- MouseMove if PointerEvent
    handleMouseMove(event) {
        event.preventDefault();
        if (this.drawToggle) {
            this.eraseTool();
            this.context2D.lineWidth = this.initializePressure(event);
            this.pencilTool(event);
            this.stackPoint(this._pressurePoints(event, this.initializePressure(event)));
        }
    }
    // *-- TouchMove if PointerEvent
    handleTouchMove(event) {
        event.preventDefault();
        for (let i = 0; i < eventStack.length; i++) {
            if (eventStack[i].pointerId === event.pointerId) {
                eventStack[i] = event;
            }
        }
        if (eventStack.length >= 3) {
            this.drawToggle = false;
            eventStack.splice(0, 2);
        }
        this.p1 = eventStack[0];
        if (eventStack.length < 1 && this.drawToggle) {
            this.eraseTool();
            this.context2D.lineWidth = this.initializePressure(eventStack[0]);
            this.pencilTool(eventStack[0]);
            this.stackPoint(this._pressurePoints(eventStack[0], this.initializePressure(eventStack[0])));
        }
        if (eventStack.length >= 2) {
            this.p2 = eventStack[1];
            this.drawToggle = false;
            this.dist = this._calclationPointsDistance(this.p1.pageX, this.p1.pageY, this.p2.pageX, this.p2.pageY);
            this.nowR = this.dist / this.pinchDist;
            this.distX = (eventStack[0].pageX - this.tp1x);
            this.distY = (eventStack[0].pageY - this.tp1y);
        }
        this._pinchHandle(event);
    }
    // ---- PointerEvents ---
    // *------- LEAVE -------
    leavePointerHandler(event) {
        this.drawToggle = false;
        this._removeEventStack(event);
        this.context2D.beginPath();
    }
    // ---- MouseEvents ----
    // *-- LEGACY EVENTS --
    downMouseHandler(event) {
        event.preventDefault();
        this.drawToggle = true;
    }
    moveMouseHandler(event) {
        event.preventDefault();
        if (this.drawToggle) {
            this.eraseTool();
            this.context2D.lineWidth = this.initializePressure({ pressure: 0.5 });
            this.pencilTool(event);
            this.stackPoint(this._pressurePoints(event, this.initializePressure({ pressure: 0.5 })));
        }
    }
    upMouseHandler(event) {
        event.preventDefault();
        this.drawToggle = false;
        this.context2D.beginPath();
    }
    leaveMouseHandler(event) {
        event.preventDefault();
        this.drawToggle = false;
    }
    // ---- PencilTools ----
    pencilTool(event) {
        this.settingPenConf(this.canvasColor, this.capStyle, this.joinStyle);
        this.drawLine(event.offsetX, event.offsetY);
    }
    settingPenConf(color, capStyle, JoinStyle) {
        this.context2D.strokeStyle = color;
        this.context2D.fillStyle = color;
        this.context2D.lineCap = capStyle;
        this.context2D.lineJoin = JoinStyle;
    }
    drawLine(x, y) {
        this.context2D.lineTo(x, y);
        this.context2D.stroke();
        this.context2D.beginPath();
        this.context2D.moveTo(x, y);
    }
    eraseTool() {
        this.eraserToggle
            ? this.context2D.globalCompositeOperation = 'destination-out'
            : this.context2D.globalCompositeOperation = 'source-over';
    }
    eraOrPenSize() {
        return this.eraserToggle ? this.eraRadius : this.penRadius;
    }
    setPencilColor(color) {
        this.canvasColor = color;
    }
    _calclationPointsDistance(x1, y1, x2, y2) {
        const X = x1 - x2;
        const Y = y1 - y2;
        return Math.sqrt(X * X + Y * Y) / 2;
    }
    // 異常な筆圧値を丸める、筆圧によりペンのサイズを漸強/漸弱させる
    initializePressure(event) {
        let Rad = this.eraOrPenSize();
        if (!this.pressureToggle || event.pressure === null) {
            return Rad * 0.5;
        }
        else if (event.pressure < 0.995 && event.pressure > 0.05 && this.pressureToggle) { // 標準的筆圧の場合は一定の処理
            return event.pressure ? Rad * event.pressure : Rad / event.pressure;
        }
        else if (event.pressure <= 0.05 && event.pressure > 0.01 && this.pressureToggle) { //  筆圧が弱すぎる場合は最低限の筆圧で処理
            return Rad * 0.05;
        }
        else if (event.pressure >= 0.995 && this.pressureToggle) { // 筆圧が強すぎる場合最大値の筆圧で処理
            return Rad * 0.995;
        }
        else {
            return Rad;
        }
    }
    // タッチイベントをスタックから削除
    _removeEventStack(event) {
        for (let i = 0; i < eventStack.length; i++) {
            if (eventStack[i].pointerId === event.pointerId) {
                eventStack.splice(i, 1);
            }
        }
    }
    // ピンチズーム処理
    _pinchHandle(event) {
        let style = document.getElementById('canvas').style;
        let scale;
        if (this.nowR >= 20) {
            this.nowR = 10;
        }
        else if (this.nowR <= 0.05) {
            this.nowR = 0.05;
        }
        else {
            // style.transformOrigin = `${this.zoomX}px ${this.zoomY}px`
            style.transformOrigin = `${this.zoomX + 6 + (this.canvas.offsetLeft / 2)}px ${this.zoomY + (this.canvas.offsetTop / 2)}px`;
            scale = `scale(${this.nowR})`;
        }
        style.left = this.distX + 'px';
        style.top = this.distY + 'px';
        style.transform = scale;
        style.webkitTransform = scale;
        //@ts-ignore
        style.MozTransform = scale;
        //@ts-ignore
        style.msTransform = scale;
    }
    _pressurePoints(event, num) {
        return { X: event.offsetX, Y: event.offsetY, p: num };
    }
    // private _simplePoints(event: MouseEvent, num: number): drawPointsObject{
    //   return {X: event.offsetX,Y: event.offsetY, p: num}
    // }
    abs(number) {
        return (number * number) / 2;
    }
    undoRedo() {
    }
    // ---- - Socket.IO -----
    stackPoint(pointObj) {
        this.emitStack.push(pointObj);
    }
    emitPoint(pointObj) {
        socket.emit('point', pointObj);
    }
}
class socketer {
    constructor() {
    }
    pointerAsync() {
        socket.on('allCanvas', (c) => {
            for (let o in c) {
                let p = c[o];
                view.settingPenConf(p[p.length - 1].color, p[p.length - 1].cap, p[p.length - 1].join);
                p[p.length - 1].erase
                    ? view.context2D.globalCompositeOperation = 'destination-out'
                    : view.context2D.globalCompositeOperation = 'source-over';
                for (let i in p) {
                    view.context2D.lineWidth = p[i].p;
                    view.drawLine(p[i].X, p[i].Y);
                }
                view.eraseTool();
                view.context2D.beginPath();
            }
        });
        socket.on('point', (p) => {
            view.settingPenConf(p[p.length - 1].color, p[p.length - 1].cap, p[p.length - 1].join);
            p[p.length - 1].erase
                ? view.context2D.globalCompositeOperation = 'destination-out'
                : view.context2D.globalCompositeOperation = 'source-over';
            console.log(p);
            for (let i in p) {
                view.context2D.lineWidth = p[i].p;
                view.drawLine(p[i].X, p[i].Y);
            }
            view.eraseTool();
            view.context2D.beginPath();
        });
        socket.on('clear', () => {
            view.context2D.clearRect(0, 0, 1920, 1080);
        });
    }
}
const canvas = document.querySelector('#canvas');
const graphic = canvas.getContext('2d');
const view = new Tools(canvas, graphic);
(window.addEventListener('load', () => {
    let myId;
    // Application.prototype.serUpView
    //    (context , backgroundColor, hideMenu, smoothRendering)
    view.setUpView(1920, 1080, '#ffffff', true, true);
    const socketInit = new socketer();
    socketInit.pointerAsync();
    const domButton = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"](view);
    domButton.elementActivate();
    socket.emit('firstConnect', socket.id);
    socket.on('s_to_c_id', (id) => {
        myId = id;
        console.log(myId);
    });
}));


/***/ }),

/***/ "./src/public/style.css":
/*!******************************!*\
  !*** ./src/public/style.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/sass-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/dist/cjs.js!./src/public/style.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map