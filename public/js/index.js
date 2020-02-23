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

eval("var Application = /** @class */ (function () {\r\n    function Application(canvas, context) {\r\n        this.canvas = canvas;\r\n        this.context = context;\r\n    }\r\n    Application.prototype.setUpView = function (width, height, context, color, hide, smooth) {\r\n        if (smooth === void 0) { smooth = false; }\r\n        this._settingCanvasSize(width, height);\r\n        this._backgroundColor(color);\r\n        this._hideMenuHandler(hide);\r\n        this._isImageSmoothing(context, smooth);\r\n    };\r\n    Application.prototype._settingCanvasSize = function (width, height) {\r\n        this.canvas.width = width;\r\n        this.canvas.height = height;\r\n        this.context.width = width;\r\n        this.context.height = height;\r\n    };\r\n    Application.prototype.clearAll = function () {\r\n        this.context.clearRect(0, 0, this.width, this.height);\r\n        this.context.beginPath();\r\n    };\r\n    Application.prototype._backgroundColor = function (color) {\r\n        this.context.fillStyle = color;\r\n        this.context.fillRect(0, 0, this.width, this.height);\r\n    };\r\n    Application.prototype._hideMenuHandler = function (bool) {\r\n        document.addEventListener(\"contextmenu\", function () { return bool; });\r\n        document.addEventListener(\"MSHoldVisal\", function () { return bool; });\r\n    };\r\n    Application.prototype._isImageSmoothing = function (context, bool) {\r\n        context.imageSmoothingEnabled = bool;\r\n    };\r\n    Object.defineProperty(Application.prototype, \"width\", {\r\n        // *getter/setter Method\r\n        get: function () {\r\n            return this._width;\r\n        },\r\n        set: function (value) {\r\n            this._width = value;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Application.prototype, \"height\", {\r\n        get: function () {\r\n            return this._height;\r\n        },\r\n        set: function (value) {\r\n            this._height = value;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return Application;\r\n}());\r\nvar eventStack = [];\r\nvar Tools = /** @class */ (function () {\r\n    function Tools(element, context) {\r\n        // ----- ツール関連プロパティ\r\n        this.canvasColor = \"#000\";\r\n        this.zoomInvrease = 1;\r\n        // ----- PenSize用プロパティ -----\r\n        this.defRad = 10;\r\n        this.dx = 0;\r\n        this.dy = 0;\r\n        this.lx = void 0;\r\n        this.ly = void 0;\r\n        this.capStyle = \"round\";\r\n        this.element = element;\r\n        this.context = context;\r\n        this.eventActivation();\r\n    }\r\n    Tools.prototype.eventActivation = function () {\r\n        var _this = this;\r\n        if (this._supportPointerEvent) {\r\n            document.addEventListener(\"pointerdown\", function (event) { return _this.downPointerHandler(event); }, { passive: false });\r\n            document.addEventListener(\"pointerup\", function (event) { return _this.upPointerHandler(event); }, { passive: false });\r\n            document.addEventListener(\"pointermove\", function (event) { return _this.movePointerHandler(event); }, { passive: false });\r\n            document.addEventListener(\"pointerleave\", function (event) { return _this.leavePointerHandler(event); }, { passive: false });\r\n        }\r\n        else {\r\n            document.addEventListener(\"pointerdown\", function (event) { return _this.downMouseHandler(event); });\r\n            document.addEventListener(\"pointerup\", function (event) { return _this.upMouseHandler(event); });\r\n            document.addEventListener(\"pointermove\", function (event) { return _this.moveMouseHandler(event); });\r\n            document.addEventListener(\"pointerleave\", function (event) { return _this.leaveMouseHandler(event); });\r\n        }\r\n    };\r\n    // ---- PointerEvents ----\r\n    Tools.prototype.downPointerHandler = function (event) {\r\n        event.preventDefault();\r\n        this.drawToggle = true;\r\n        eventStack.push(event);\r\n        if (eventStack.length <= 1) {\r\n            this.p1 = eventStack[0];\r\n        }\r\n        else if (eventStack.length >= 2) {\r\n            this.p1 = eventStack[0];\r\n            this.p2 = eventStack[1];\r\n            this.pinchDist = this._calclationPointsDistance(this.p1.pageX, this.p1.pageY, this.p2.pageX, this.p2.pageY);\r\n            this.nowR = this.dist / this.pinchDist;\r\n        }\r\n    };\r\n    Tools.prototype.movePointerHandler = function (event) {\r\n        this.pointerSwitcher(event, {\r\n            pen: this.handlePenMove(event),\r\n            touch: this.handleTouchMove(event),\r\n            mouse: this.handleMouseMove(event)\r\n        });\r\n    };\r\n    Tools.prototype.pointerSwitcher = function (event, functionObject) {\r\n        switch (event.pointerType) {\r\n            case \"pen\":\r\n                functionObject.pen;\r\n                break;\r\n            case \"touch\":\r\n                functionObject.touch;\r\n                break;\r\n            case \"mouse\":\r\n                functionObject.mouse;\r\n                break;\r\n        }\r\n    };\r\n    Tools.prototype.upPointerHandler = function (event) {\r\n        this.drawToggle = false;\r\n        //@ts-ignore\r\n        this.context.beginPath();\r\n        this._removeEventStack(event);\r\n    };\r\n    Tools.prototype.leavePointerHandler = function (event) {\r\n        this.drawToggle = false;\r\n    };\r\n    // ---- MouseEvents ----\r\n    Tools.prototype.downMouseHandler = function (event) {\r\n        this.drawToggle = true;\r\n    };\r\n    Tools.prototype.moveMouseHandler = function (event) {\r\n        this.handleMouseMove(event);\r\n    };\r\n    Tools.prototype.upMouseHandler = function (event) {\r\n        this.drawToggle = false;\r\n        //@ts-ignore\r\n        this.context.beginPath();\r\n    };\r\n    Tools.prototype.leaveMouseHandler = function (event) {\r\n        this.drawToggle = false;\r\n    };\r\n    // ----- moveHandler分岐処理 -----\r\n    //  ペン用moveHandler\r\n    Tools.prototype.handlePenMove = function (event) {\r\n        event.preventDefault();\r\n        if (this.drawToggle) {\r\n            this.penPencilTool(event);\r\n        }\r\n    };\r\n    // マウス用moveHandler\r\n    Tools.prototype.handleMouseMove = function (event) {\r\n        if (this.drawToggle) {\r\n            this.mousePencilTool(event);\r\n        }\r\n    };\r\n    // タッチ用moveHandler\r\n    Tools.prototype.handleTouchMove = function (event) {\r\n        event.preventDefault();\r\n        for (var i = 0; i < eventStack.length; i++) {\r\n            if (eventStack[i].pointerId == event.pointerId) {\r\n                eventStack[i] = event;\r\n            }\r\n        }\r\n        if (eventStack.length > 3) {\r\n            eventStack.splice(0, 3);\r\n        }\r\n        this.p1 = eventStack[0];\r\n        this.p2 = eventStack[1];\r\n        if (this.drawToggle) {\r\n            this.touchPencilTool(eventStack[0]);\r\n        }\r\n        if (eventStack.length >= 2) {\r\n            this.drawToggle = false;\r\n            this.dx = (this.p1.pageX + this.p2.pageX) / 2;\r\n            this.dy = (this.p1.pageY + this.p2.pageY) / 2;\r\n            this.dist = this._calclationPointsDistance(this.p1.pageX, this.p1.pageY, this.p2.pageX, this.p2.pageY);\r\n            this.nowR = this.dist / this.pinchDist;\r\n        }\r\n        this._pinchHandle(this.dist / this.pinchDist);\r\n    };\r\n    // ---- PencilTools ----\r\n    // マウス用PencilTool\r\n    Tools.prototype.mousePencilTool = function (event) {\r\n        //Context2D初期化\r\n        //@ts-ignore\r\n        var a = this.context;\r\n        //消しゴムトグル\r\n        this.eraseTool(a);\r\n        this.settingPenConf(a, this.canvasColor, this.capStyle);\r\n        this.drawLine(a, event);\r\n    };\r\n    // ペン用PencilTool\r\n    Tools.prototype.penPencilTool = function (event) {\r\n        //Context2D初期化\r\n        //@ts-ignore\r\n        var a = this.context;\r\n        //消しゴムトグル\r\n        this.eraseTool(a);\r\n        a.lineWidth = this._activatePressure(event);\r\n        this.settingPenConf(a, this.canvasColor, this.capStyle);\r\n        this.drawLine(a, event);\r\n    };\r\n    Tools.prototype.settingPenConf = function (context, color, capStyle) {\r\n        context.strokeStyle = color;\r\n        context.fillStyle = color;\r\n        context.lineCap = capStyle;\r\n    };\r\n    // タッチ用PencilTool\r\n    Tools.prototype.touchPencilTool = function (event) {\r\n        //Context2D初期化\r\n        //@ts-ignore\r\n        var a = this.context;\r\n        //消しゴムトグル\r\n        this.eraseTool(a);\r\n        a.lineWidth = this.penRadius;\r\n        this.settingPenConf(a, this.canvasColor, this.capStyle);\r\n        this.drawLine(a, event);\r\n    };\r\n    Tools.prototype.drawLine = function (a, event) {\r\n        a.lineTo(event.offsetX, event.offsetY);\r\n        a.stroke();\r\n        a.beginPath();\r\n        a.moveTo(event.offsetX, event.offsetY);\r\n    };\r\n    Tools.prototype.eraseTool = function (a) {\r\n        this.eraserToggle\r\n            ? (a.globalCompositeOperation = \"destination-out\")\r\n            : (a.globalCompositeOperation = \"source-over\");\r\n    };\r\n    Tools.prototype.setPencilColor = function (color) {\r\n        this.canvasColor = color;\r\n    };\r\n    Tools.prototype.getNowR = function () {\r\n        return this.nowR;\r\n    };\r\n    Tools.prototype._calclationPointsDistance = function (p1x, p1y, p2x, p2y) {\r\n        var X = Math.abs(p1x) - Math.abs(p2x);\r\n        var Y = Math.abs(p1y) - Math.abs(p2y);\r\n        return Math.sqrt(X * X + Y * Y) / 2;\r\n    };\r\n    // 筆圧に対応していた場合値を返す\r\n    Tools.prototype._activatePressure = function (event) {\r\n        var Rad = this.defRad;\r\n        if (event.pressure < 0.995 || event.pressure > 0.05) {\r\n            event.pressure ? (Rad *= event.pressure) : (Rad /= event.pressure);\r\n            return Rad;\r\n        }\r\n        else if (event.pressure <= 0.05 || event.pressure > 0.01) {\r\n            return 0.05;\r\n        }\r\n        else {\r\n            return;\r\n        }\r\n    };\r\n    //タッチイベントをスタックから削除\r\n    Tools.prototype._removeEventStack = function (event) {\r\n        for (var i = 0; i < eventStack.length; i++) {\r\n            if (eventStack[i].pointerId == event.pointerId) {\r\n                eventStack.splice(i, 1);\r\n            }\r\n        }\r\n    };\r\n    // ピンチズーム処理\r\n    Tools.prototype._pinchHandle = function (nowScalse) {\r\n        var style = document.getElementById(\"canvas\").style;\r\n        var scale = \"scale(\" + this.nowR + \",\" + this.nowR + \")\";\r\n        console.log(this.nowR + ':' + this.nowScale);\r\n        style.left = this.distX + \"px\";\r\n        style.top = this.distY + \"px\";\r\n        style.transform = scale;\r\n        style.webkitTransform = scale;\r\n    };\r\n    Tools.prototype._supportPointerEvent = function () {\r\n        return window.PointerEvent ? true : false;\r\n    };\r\n    Tools.prototype._puressurePoints = function (event) {\r\n        return {\r\n            x: event.offsetX,\r\n            y: event.offsetY,\r\n            pressurevent: Math.sin(event.pressure)\r\n        };\r\n    };\r\n    // ----- 画面上にデバッグ情報が流れる\r\n    Tools.prototype._debugLogger = function (message) {\r\n        if (document.getElementById(\"debug\")) {\r\n            document\r\n                .getElementById(\"debug\")\r\n                .insertAdjacentHTML(\"afterbegin\", message + \"<br>\");\r\n        }\r\n        else {\r\n            var el = document.createElement(\"div\");\r\n            el.id = \"debug\";\r\n            el.insertAdjacentHTML(\"afterbegin\", message + \"<br>\");\r\n        }\r\n    };\r\n    return Tools;\r\n}());\r\nvar graph = document.querySelector(\"#canvas\");\r\nvar c = graph.getContext(\"2d\");\r\nvar app = new Application(graph, c);\r\nvar draw = new Tools(graph, c);\r\n// Application.prototype.init\r\n//    (context , backgroundColor, hideMenu, smoothRendering)\r\napp.setUpView(1920, 1080, c, \"#ffff\", true, false);\r\n\n\n//# sourceURL=webpack:///./src/client/index.ts?");

/***/ })

/******/ });