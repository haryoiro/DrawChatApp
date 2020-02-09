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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const canvas = document.getElementById(\"canvas\");\r\nconst ctx = canvas.getContext(\"2d\");\r\n// アンドゥ出来る回数上限\r\nconst STACK_MAX_SIZE = 100;\r\n\r\nconst conf = {\r\n\tradius:10,\r\n\t// ポインタータイプ\r\n\tpType: null,\r\n\trect: null,\r\n\t// 現在の座標\r\n\tmx: 0,\r\n\tmy: 0,\r\n\t// クリックされているかの判定\r\n\tpointToggle: false,\r\n\t// 初期画面サイズ\r\n\tw:1024,\r\n\th:768,\r\n\t// 履歴用配列\r\n\tundoStack:[],\r\n\tredoStack:[],\r\n  eraserToggle:false,\r\n}\r\n\r\nfunction thisPoint(e){\r\n  conf.rect = e.target.getBoundingClientRect()\r\n  conf.mx = (e.clientX - Math.floor(conf.rect.left))\r\n  conf.my = (e.clientY - Math.floor(conf.rect.top))\r\n}\r\n\r\n// ---- マウスイベント時 ツール関数 ----\r\n// 鉛筆ツール\r\nfunction putPoint(e) {\r\n  if (conf.eraserToggle){\r\n    ctx.globalCompositeOperation = 'destination-out'\r\n  } else {\r\n    ctx.globalCompositeOperation = 'source-over'\r\n    ctx.strokeStyle = '#FF6566'\r\n  }\r\n  if (conf.pointToggle) {\r\n\t\tthisPoint(e)\r\n    ctx.lineCap = 'round'\r\n\t\tctx.lineTo(conf.mx, conf.my)\r\n\t\tctx.stroke()\r\n\t\tctx.beginPath()\r\n\t\tctx.moveTo(conf.mx, conf.my)\r\n\t}\r\n}\r\n//ドラッグ開始時\r\nfunction engage(e) {\r\n  conf.pointToggle = true\r\n\tputPoint(e)\r\n}\r\n//ドラッグ終了時\r\nfunction disengage() {\r\n\tconf.pointToggle = false\r\n}\r\n// 現在の描画範囲をクリア\r\nfunction clearAllCanvas() {\r\n  ctx.clearRect(0, 0, 1080, 1920);\r\n  ctx.beginPath();\r\n}\r\n\r\n// ---- タッチイベント時 ツール関数 ----\r\n// ポインター接触時のポインタータイプを判定\r\nfunction handledown(e) {\r\n\tctx.beginPath()\r\n  conf.pointToggle = true\r\n  conf.pType = e.pointerType\r\n}\r\n// ドラッグ終了\r\nfunction handleup(e) {\r\n  conf.pointToggle = false;\r\n}\r\n// ポインタータイプに合わせた処理を実行\r\nfunction handlemove(e) {\r\n  switch (conf.pType) {\r\n    case \"mouse\":\r\n\t\t\tconf.pType = \"mouse\"\r\n\t\t\tputPoint(e)\r\n      break\r\n    case \"touch\":\r\n      conf.pType = \"touch\"\r\n\t\t\te.preventDefault()\r\n\t\t\tputPoint(e)\r\n      break;\r\n    case \"pen\":\r\n      conf.pType = \"pen\"\r\n\t\t\tputPoint(e)\r\n\t\t\te.preventDefault()\r\n      break;\r\n  }\r\n}\r\n\r\n// // ---- カーソル描画 ----\r\n// function drawPointerCursor(context){\r\n// \tctx.beginPath()\r\n//   ctx.arc(conf.mx + 5, conf.my + 5, conf.radius, 0,  Math.PI * 2)\r\n//   ctx.fill()\r\n// }\r\n\r\n\r\n\r\n\r\nwindow.addEventListener('load',(() => {\r\n  const canvas = document.getElementById(\"canvas\");\r\n  const ctx = canvas.getContext(\"2d\");\r\n\r\n  initWindow(1240, 720);\r\n  hideMenu(true);\r\n\r\n  isImageSmoothingEnabled(ctx, false);\r\n\r\n  // ツール関係, イベントリスナー\r\n  const clear = document.getElementById('clear')\r\n\tclear.addEventListener('click', clearAllCanvas)\r\n  const era = document.getElementById('era').addEventListener('click', ()=>{conf.eraserToggle=true})\r\n  const pen = document.getElementById('pen').addEventListener('click', ()=>{conf.eraserToggle=false})\r\n  if (window.PointerEvent) {\r\n    canvas.addEventListener('pointerdown', handledown, { passive: false })\r\n    canvas.addEventListener('pointerup', handleup, { passive: false })\r\n\t\tcanvas.addEventListener('pointermove', handlemove, { passive: false })\r\n\t\tcanvas.addEventListener('pointerleave', handleup, { passive: false })\r\n\r\n  } else {\r\n    canvas.addEventListener('mousedown', engage, { passive: false })\r\n    canvas.addEventListener('mousemove', putPoint, { passive: false })\r\n\t\tcanvas.addEventListener('mouseup', disengage, { passive: false })\r\n\t\tcanvas.addEventListener('mouseover', disengage, { passive: false })\r\n\r\n  }\r\n})())\r\nlet colors = ['#FF6566', '#FFD965', '#92D050', '#06C0C5','#7C7AA1','Black','Gray', 'rgb(241, 240, 240)'];\r\n\r\nfor(let i=0, n=colors.length;i<n;i++){\r\n    let swatch = document.createElement('div');\r\n    swatch.className = 'swatch';\r\n    swatch.style.backgroundColor = colors[i];\r\n    swatch.addEventListener('click', setSwatch);\r\n    document.getElementById('colors').appendChild(swatch);\r\n}\r\n\r\nfunction setColor(color){\r\n    ctx.fillStyle = color;\r\n    ctx.strokeStyle = color;\r\n    var active = document.getElementsByClassName('active')[0];\r\n    if(active){\r\n        active.className = 'swatch';\r\n    }\r\n}\r\n\r\nfunction setSwatch(e){\r\n    var swatch = e.target;\r\n    setColor(swatch.style.backgroundColor);\r\n    swatch.className += ' active';\r\n}\r\n\r\nsetSwatch({target: document.getElementsByClassName('swatch')[0]});\r\nlet radConf ={\r\n    minRad:1,\r\n    maxRad:20,\r\n    defaultRad:1,\r\n    interval:1,\r\n}\r\nradSpan = document.getElementById('radval'),\r\ndecRad = document.getElementById('decrad').addEventListener('click', function(){setRad(conf.radius-radConf.interval);}),\r\nincRad = document.getElementById('incrad').addEventListener('click', function(){setRad(conf.radius+radConf.interval);});\r\n\r\n\r\nfunction setRad(newRad){\r\n    if(newRad < radConf.minRad){\r\n        newRad = radConf.minRad;\r\n    } else if (newRad > radConf.maxRad){\r\n        newRad = radConf.maxRad\r\n    }\r\n    conf.radius = newRad\r\n    ctx.lineWidth = conf.radius * 2;\r\n    radSpan.innerHTML = conf.radius;\r\n}\r\n\r\nsetRad(radConf.defaultRad);\r\n\r\n// undo-redo\r\n// ペンを走らせると画像を配列に保存する\r\nfunction stackDlaw() {\r\n  conf.redoStack = []\r\n  if(conf.undoStack.length >= STACK_MAX_SIZE) {conf.undoStack.pop()}\r\n\tconf.undoStack.unshift(ctx.getImageData(0, 0, conf.w, conf.h));\r\n\tconsole.log('r' + conf.redoStack + ':' + conf.undoStack)\r\n}\r\n\r\nfunction undo() {\r\n  if (conf.undoStack.length <= 0) {return}\r\n  conf.redoStack.unshift(ctx.getImageData(0, 0, conf.w, conf.h))\r\n  let imageData = conf.undoStack.shift()\r\n\tctx.putImageData(imageData, 0, 0)\r\n\tconsole.log('undo')\r\n}\r\n\r\nfunction redo() {\r\n  if (conf.redoStack.length <= 0) {return}\r\n  conf.undoStack.unshift(ctx.getImageData(0, 0, conf.w, conf.h))\r\n  let imageData = conf.redoStack.shift()\r\n\tctx.putImageData(imageData, 0, 0)\r\n\tconsole.log('redo')\r\n}\r\n(() => {\r\n\r\n  const canvas = document.getElementById(\"canvas\");\r\n  const ctx = canvas.getContext(\"2d\");\r\n\r\n\r\n  document.getElementById('undo').addEventListener('click', undo)\r\n  document.getElementById('redo').addEventListener('click', redo)\r\n\r\n  if (window.PointerEvent) {\r\n    canvas.addEventListener('pointerdown', stackDlaw)\r\n  } else {\r\n    canvas.addEventListener('mouseudown', stackDlaw)\r\n  }\r\n})()\r\n\r\n// 右クリックで出てくるメニューを非表示\r\nfunction hideMenu(bool){\r\n  if(bool){\r\n    document.body.style.overflow = 'hidden'\r\n    document.addEventListener('contextmenu', e => {\r\n      e.preventDefault()\r\n    })\r\n    document.addEventListener('MSHoldVisal', e => {\r\n      e.preventDefault()\r\n    })\r\n  }\r\n}\r\n\r\nfunction isImageSmoothingEnabled(context, bool){\r\n  if(!bool){bool = true}\r\n  context.mozImageSmoothingEnabled = bool;\r\n  context.webkitImageSmoothingEnabled = bool;\r\n  context.msImageSmoothingEnabled = bool\r\n  context.imageSmoothingEnabled = bool\r\n}\r\n\r\nfunction initWindow(w, h){\r\n  conf.w = w\r\n  conf.h = h\r\n\tcanvas.width = conf.w\r\n  canvas.height = conf.h\r\n}\r\n\n\n//# sourceURL=webpack:///./src/client/index.js?");

/***/ })

/******/ });