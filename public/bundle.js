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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/index.ts":
/*!*****************************!*\
  !*** ./src/client/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Application = /** @class */ (function () {\r\n    function Application(canvas, context, width, height) {\r\n        this.width = width;\r\n        this.height = height;\r\n        this.canvas = canvas;\r\n        this.ctx = context;\r\n        this.rect = this.canvas.getBoundingClientRect();\r\n    }\r\n    Application.prototype.init = function (context, color, hide, smooth) {\r\n        this.canvasSize();\r\n        this.backgroundColor(color);\r\n        this.hideMenuHandler(hide);\r\n        this.isImageSmoothing(context, smooth);\r\n    };\r\n    Application.prototype.canvasSize = function () {\r\n        if (!this.width || !this.height) {\r\n            return;\r\n        }\r\n        this.canvas.width = this.width;\r\n        this.canvas.height = this.height;\r\n        this.ctx.width = this.width;\r\n        this.ctx.height = this.height;\r\n    };\r\n    Application.prototype.clearAll = function () {\r\n        this.ctx.clearRect(0, 0, this.width, this.height);\r\n        this.ctx.beginPath();\r\n    };\r\n    Application.prototype.clearInterval = function (fps) {\r\n        this.fps = fps;\r\n    };\r\n    Application.prototype.backgroundColor = function (color) {\r\n        this.ctx.fillStyle = color;\r\n        this.ctx.fillRect(0, 0, this.width, this.height);\r\n    };\r\n    Application.prototype.hideMenuHandler = function (bool) {\r\n        if (bool) {\r\n            document.body.style.overflow = 'hidden';\r\n            document.addEventListener('contextmenu', function (e) { e.preventDefault(); });\r\n            document.addEventListener('MSHoldVisal', function (e) { e.preventDefault(); });\r\n        }\r\n    };\r\n    Application.prototype.isImageSmoothing = function (context, bool) {\r\n        if (!bool) {\r\n            bool = true;\r\n        }\r\n        // context.mozImageSmoothingEnabled = bool\r\n        // context.webkitImageSmoothingEnabled = bool\r\n        // context.msImageSmoothingEnabled = bool\r\n        context.imageSmoothingEnabled = bool;\r\n    };\r\n    return Application;\r\n}());\r\nvar DrawEvents = /** @class */ (function () {\r\n    function DrawEvents(element, context) {\r\n        this.x;\r\n        this.y;\r\n        this.element = element;\r\n        this.ctx = context;\r\n    }\r\n    DrawEvents.prototype.thisPoints = function (event, rect) {\r\n        this.x = event.clientX - Math.floor(rect.left);\r\n        this.y = event.clientY;\r\n    };\r\n    DrawEvents.prototype.mousePoints = function () {\r\n        return { x: this.x, y: this.y };\r\n    };\r\n    DrawEvents.prototype.harvestPoints = function (event, rect) {\r\n        this.thisPoints(event, rect);\r\n        return this.mousePoints();\r\n    };\r\n    return DrawEvents;\r\n}());\r\nvar Tools = /** @class */ (function () {\r\n    function Tools(element, context) {\r\n        this.element = element;\r\n        this.context = this.element.getContext('2d');\r\n    }\r\n    Tools.prototype.handledown = function (e) {\r\n        this.drawToggle = true;\r\n        this.eventStack.push(e);\r\n        e.preventDefault();\r\n    };\r\n    Tools.prototype.handleup = function (e) {\r\n        this.drawToggle = false;\r\n    };\r\n    Tools.prototype.handlemove = function (e) {\r\n        if (this.drawToggle) {\r\n            this.pencilTool(e);\r\n        }\r\n    };\r\n    Tools.prototype.pencilTool = function (e) {\r\n        //@ts-ignore\r\n        var a = e.target.getContext(\"2d\");\r\n        for (var i = 0; i < this.eventStack.length; i++) {\r\n            if (e.pointerId == this.eventStack[i].pointerId) {\r\n                this.eventStack[i] = e;\r\n            }\r\n        }\r\n        if (this.eraserToggle) {\r\n            a.globalCompositeOperation = 'destination-out';\r\n        }\r\n        else {\r\n            a.globalCompositeOperation = 'source-over';\r\n        }\r\n        // 現在のポインター座標を取得\r\n        // {x: number, y: number}\r\n        var obj = DrawEvent.harvestPoints(this.eventStack[0], app.rect);\r\n        a.strokeStyle = this.canvasColor;\r\n        a.fillStyle = this.canvasColor;\r\n        a.lineCap = 'round';\r\n        a.lineTo(obj.x, obj.y);\r\n        a.stroke();\r\n        a.beginPath();\r\n        a.moveTo(obj.x, obj.y);\r\n    };\r\n    Tools.prototype.setPencilColor = function (color) {\r\n        this.canvasColor = color;\r\n    };\r\n    return Tools;\r\n}());\r\nvar graph = document.querySelector('#canvas');\r\nvar c = graph.getContext('2d');\r\nvar app = new Application(graph, c, 1080, 720);\r\napp.init(c, \"#0999\", true, false);\r\nvar DrawEvent = new DrawEvents(graph, c);\r\nc.beginPath();\r\nif (window.PointerEvent) {\r\n    var c_1 = graph.getContext('2d');\r\n    var draw = new Tools(graph, c_1);\r\n    graph.addEventListener('pointermove', function (e) {\r\n        DrawEvent.harvestPoints(e, app.rect, function (pointsXY) { });\r\n    });\r\n    graph.addEventListener('pointerdown', draw.handledown);\r\n    graph.addEventListener('pointerup', draw.handleup);\r\n    graph.addEventListener('pointermove', draw.handlemove);\r\n    graph.addEventListener('pointerleave', draw.handleup);\r\n}\r\nelse {\r\n    graph.addEventListener('mousemove', function (e) {\r\n        DrawEvent.harvestPoints(e, app.rect, function (p) { console.log(p); });\r\n    });\r\n    graph.addEventListener('mousedown', engage);\r\n    graph.addEventListener('mousemove', putPoint);\r\n    graph.addEventListener('mouseup', disengage);\r\n    graph.addEventListener('mouseover', disengage);\r\n}\r\n(setInterval(function () {\r\n}), app.fps);\r\n\n\n//# sourceURL=webpack:///./src/client/index.ts?");

/***/ })

/******/ });