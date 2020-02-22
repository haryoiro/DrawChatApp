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

eval("var Application = /** @class */ (function () {\n    function Application(canvas, context, width, height) {\n        this.width = width;\n        this.height = height;\n        this.canvas = canvas;\n        this.context = context;\n        this.rect = this.canvas.getBoundingClientRect();\n    }\n    Application.prototype.init = function (context, color, hide, smooth) {\n        if (smooth === void 0) { smooth = false; }\n        this.canvasSize();\n        this.backgroundColor(color);\n        this.hideMenuHandler(hide);\n        this._isImageSmoothing(context, smooth);\n    };\n    Application.prototype.getRect = function () {\n        //@ts-ignore\n        return (this.rect = this.canvas.getBoundingRect());\n    };\n    Application.prototype.canvasSize = function () {\n        if (this.width || this.height) {\n            this.canvas.width = this.width;\n            this.canvas.height = this.height;\n            this.context.width = this.width;\n            this.context.height = this.height;\n        }\n    };\n    Application.prototype.clearAll = function () {\n        this.context.clearRect(0, 0, this.width, this.height);\n        this.context.beginPath();\n    };\n    Application.prototype.backgroundColor = function (color) {\n        this.context.fillStyle = color;\n        this.context.fillRect(0, 0, this.width, this.height);\n    };\n    Application.prototype.hideMenuHandler = function (bool) {\n        document.addEventListener(\"contextmenu\", function () { return bool; });\n        document.addEventListener(\"MSHoldVisal\", function () { return bool; });\n    };\n    Application.prototype._isImageSmoothing = function (context, bool) {\n        context.imageSmoothingEnabled = bool;\n    };\n    return Application;\n}());\nvar eventStack = [];\nvar Tools = /** @class */ (function () {\n    function Tools(element, context) {\n        // ----- ツール関連プロパティ\n        this.canvasColor = \"#000\";\n        // ----- PenSize用プロパティ -----\n        this.defRad = 10;\n        this.dx = void 0;\n        this.dy = void 0;\n        this.lx = void 0;\n        this.ly = void 0;\n        this.capStyle = \"round\";\n        this.element = element;\n        this.context = context;\n        this.eventActivation();\n    }\n    Tools.prototype.eventActivation = function () {\n        var _this = this;\n        if (this._supportPointerEvent) {\n            document.addEventListener(\"pointerdown\", function (event) { return _this.downPointerHandler(event); }, { passive: false });\n            document.addEventListener(\"pointerup\", function (event) { return _this.upPointerHandler(event); }, { passive: false });\n            document.addEventListener(\"pointermove\", function (event) { return _this.movePointerHandler(event); }, { passive: false });\n            document.addEventListener(\"pointerleave\", function (event) { return _this.leavePointerHandler(event); }, { passive: false });\n        }\n        else {\n            document.addEventListener(\"pointerdown\", function (event) {\n                return _this.downMouseHandler(event);\n            });\n            document.addEventListener(\"pointerup\", function (event) {\n                return _this.upMouseHandler(event);\n            });\n            document.addEventListener(\"pointermove\", function (event) {\n                return _this.moveMouseHandler(event);\n            });\n            document.addEventListener(\"pointerleave\", function (event) {\n                return _this.leaveMouseHandler(event);\n            });\n        }\n    };\n    // ---- PointerEvents ----\n    Tools.prototype.downPointerHandler = function (event) {\n        event.preventDefault();\n        this.drawToggle = true;\n        eventStack.push(event);\n        if (eventStack.length <= 1) {\n            this.basePoint = eventStack[0];\n        }\n        else if (eventStack.length >= 2) {\n            this.p1 = eventStack[0];\n            this.p2 = eventStack[1];\n            this.pinchDist =\n                Math.abs(this.p1.pageX - this.p2.pageX) +\n                    Math.abs(this.p1.pageY - this.p2.pageY);\n        }\n    };\n    Tools.prototype.movePointerHandler = function (event) {\n        this.pointerSwitcher(event, {\n            pen: this.handlePenMove(event),\n            touch: this.handleTouchMove(event),\n            mouse: this.handleMouseMove(event)\n        });\n    };\n    Tools.prototype.pointerSwitcher = function (event, functionObject) {\n        switch (event.pointerType) {\n            case \"pen\":\n                functionObject.pen;\n                break;\n            case \"touch\":\n                functionObject.touch;\n                break;\n            case \"mouse\":\n                functionObject.mouse;\n                break;\n        }\n    };\n    Tools.prototype.upPointerHandler = function (event) {\n        this.drawToggle = false;\n        //@ts-ignore\n        this.context.beginPath();\n        this._removeEventStack(event);\n    };\n    Tools.prototype.leavePointerHandler = function (event) {\n        this.drawToggle = false;\n    };\n    // ---- MouseEvents ----\n    Tools.prototype.downMouseHandler = function (event) {\n        this.drawToggle = true;\n    };\n    Tools.prototype.moveMouseHandler = function (event) {\n        this.handleMouseMove(event);\n    };\n    Tools.prototype.upMouseHandler = function (event) {\n        this.drawToggle = false;\n        //@ts-ignore\n        this.context.beginPath();\n    };\n    Tools.prototype.leaveMouseHandler = function (event) {\n        this.drawToggle = false;\n    };\n    // ----- moveHandler分岐処理 -----\n    //  ペン用moveHandler\n    Tools.prototype.handlePenMove = function (event) {\n        event.preventDefault();\n        if (this.drawToggle) {\n            this.penPencilTool(event);\n        }\n    };\n    // マウス用moveHandler\n    Tools.prototype.handleMouseMove = function (event) {\n        if (this.drawToggle) {\n            this.mousePencilTool(event);\n        }\n    };\n    // タッチ用moveHandler\n    Tools.prototype.handleTouchMove = function (event) {\n        event.preventDefault();\n        for (var i = 0; i < eventStack.length; i++) {\n            if (eventStack[i].pointerId == event.pointerId) {\n                eventStack[i] = event;\n            }\n        }\n        if (eventStack.length > 3) {\n            eventStack.splice(0, 3);\n        }\n        this.p1 = eventStack[0];\n        this.p2 = eventStack[1];\n        if (this.drawToggle) {\n            this.touchPencilTool(eventStack[0]);\n        }\n        if (eventStack.length >= 2) {\n            this.drawToggle = false;\n            this.lx = this.lx;\n            this.ly = this.ly;\n            this.dx = (this.p1.pageX + this.p2.pageX) / 2;\n            this.dy = (this.p1.pageY + this.p2.pageY) / 2;\n            this.distX = Math.abs(this.lx - this.dx);\n            this.distY = Math.abs(this.ly - this.dy);\n            this.dist =\n                Math.abs(this.p1.pageX - this.p2.pageX) +\n                    Math.abs(this.p1.pageY - this.p2.pageY);\n            this.nowScale = this.dist / this.pinchDist;\n        }\n        this._pinchHandle(this.nowR);\n    };\n    // ---- PencilTools ----\n    // マウス用PencilTool\n    Tools.prototype.mousePencilTool = function (event) {\n        //Context2D初期化\n        //@ts-ignore\n        var a = this.context;\n        //消しゴムトグル\n        this.eraseTool(a);\n        this.settingPenConf(a, this.canvasColor, this.capStyle);\n        this.drawLine(a, event);\n    };\n    // ペン用PencilTool\n    Tools.prototype.penPencilTool = function (event) {\n        //Context2D初期化\n        //@ts-ignore\n        var a = this.context;\n        //消しゴムトグル\n        this.eraseTool(a);\n        a.lineWidth = this._activatePressure(event);\n        this.settingPenConf(a, this.canvasColor, this.capStyle);\n        this.drawLine(a, event);\n    };\n    Tools.prototype.settingPenConf = function (context, color, capStyle) {\n        context.strokeStyle = color;\n        context.fillStyle = color;\n        context.lineCap = capStyle;\n    };\n    // タッチ用PencilTool\n    Tools.prototype.touchPencilTool = function (event) {\n        //Context2D初期化\n        //@ts-ignore\n        var a = this.context;\n        //消しゴムトグル\n        this.eraseTool(a);\n        a.lineWidth = this.penRadius;\n        this.settingPenConf(a, this.canvasColor, this.capStyle);\n        this.drawLine(a, event);\n    };\n    Tools.prototype.drawLine = function (a, event) {\n        a.lineTo(event.offsetX, event.offsetY);\n        a.stroke();\n        a.beginPath();\n        a.moveTo(event.offsetX, event.offsetY);\n    };\n    Tools.prototype.eraseTool = function (a) {\n        this.eraserToggle\n            ? (a.globalCompositeOperation = \"destination-out\")\n            : (a.globalCompositeOperation = \"source-over\");\n    };\n    Tools.prototype.setPencilColor = function (color) {\n        this.canvasColor = color;\n    };\n    Tools.prototype.getNowR = function () {\n        return this.nowR;\n    };\n    // 筆圧に対応していた場合値を返す\n    Tools.prototype._activatePressure = function (event) {\n        var Rad = this.defRad;\n        if (event.pressure < 0.995 || event.pressure > 0.05) {\n            event.pressure ? (Rad *= event.pressure) : (Rad /= event.pressure);\n            return Rad;\n        }\n        else if (event.pressure <= 0.05 || event.pressure > 0.01) {\n            return 0.05;\n        }\n        else {\n            return void 0;\n        }\n    };\n    //タッチイベントをスタックから削除\n    Tools.prototype._removeEventStack = function (event) {\n        for (var i = 0; i < eventStack.length; i++) {\n            if (eventStack[i].pointerId == event.pointerId) {\n                eventStack.splice(i, 1);\n            }\n        }\n    };\n    // ピンチズーム処理\n    Tools.prototype._pinchHandle = function (nowScalse) {\n        var style = document.getElementById(\"canvas\").style;\n        var scale = \"scale(\" + nowScalse + \",\" + nowScalse + \")\";\n        style.left = this.distX + \"px\";\n        style.top = this.distY + \"px\";\n        style.transform = scale;\n        style.webkitTransform = scale;\n    };\n    Tools.prototype._supportPointerEvent = function () {\n        return window.PointerEvent ? true : false;\n    };\n    Tools.prototype._puressurePoints = function (event) {\n        return {\n            x: event.offsetX,\n            y: event.offsetY,\n            pressurevent: Math.sin(event.pressure)\n        };\n    };\n    // ----- 画面上にデバッグ情報が流れる\n    Tools.prototype._debugLogger = function (message) {\n        if (document.getElementById(\"debug\")) {\n            document\n                .getElementById(\"debug\")\n                .insertAdjacentHTML(\"afterbegin\", message + \"<br>\");\n        }\n        else {\n            var el = document.createElement(\"div\");\n            el.id = \"debug\";\n            el.insertAdjacentHTML(\"afterbegin\", message + \"<br>\");\n        }\n    };\n    return Tools;\n}());\nvar graph = document.querySelector(\"#canvas\");\nvar c = graph.getContext(\"2d\");\nvar app = new Application(graph, c, 1920, 1080);\nvar draw = new Tools(graph, c);\n// Application.prototype.init\n//    (context , backgroundColor, hideMenu, smoothRendering)\napp.init(c, \"#ffff\", true, false);\n\n\n//# sourceURL=webpack:///./src/client/index.ts?");

/***/ })

/******/ });