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

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Application = /** @class */ (function () {
    function Application(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    Application.prototype.setUpView = function (width, height, context, color, hide, smooth) {
        if (smooth === void 0) { smooth = false; }
        this._settingCanvasSize(width, height);
        this._backgroundColor(color);
        this._hideMenuHandler(hide);
        this._isImageSmoothing(context, smooth);
    };
    Application.prototype._settingCanvasSize = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    };
    Application.prototype.clearAll = function () {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.beginPath();
    };
    Application.prototype._backgroundColor = function (color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.width, this.height);
    };
    Application.prototype._hideMenuHandler = function (bool) {
        document.addEventListener('contextmenu', function () { return bool; });
        document.addEventListener('MSHoldVisal', function () { return bool; });
    };
    Application.prototype._isImageSmoothing = function (context, bool) {
        context.imageSmoothingEnabled = bool;
    };
    Object.defineProperty(Application.prototype, "width", {
        // *getter/setter Method
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
        },
        enumerable: true,
        configurable: true
    });
    return Application;
}());
var eventStack = [];
var Tools = /** @class */ (function (_super) {
    __extends(Tools, _super);
    function Tools(element, context) {
        var _this = _super.call(this, element, context) || this;
        // ----- ツール関連プロパティ
        _this.canvasColor = '#000';
        _this.zoomInvrease = 1;
        // ----- PenSize用プロパティ -----
        _this.defRad = 10;
        _this.dx = 0;
        _this.dy = 0;
        _this.lx = void 0;
        _this.ly = void 0;
        _this.capStyle = 'round';
        _this.joinStyle = 'bevel';
        _this.eventActivation();
        return _this;
    }
    Tools.prototype.eventActivation = function () {
        var _this = this;
        if (this._supportPointerEvent) {
            document.addEventListener('pointerdown', function (event) { return _this.downPointerController(event); }, {
                passive: false,
            });
            document.addEventListener('pointerup', function (event) { return _this.upPointerController(event); }, {
                passive: false,
            });
            document.addEventListener('pointermove', function (event) { return _this.movePointerController(event); }, {
                passive: false,
            });
            document.addEventListener('pointerleave', function (event) { return _this.leavePointerHandler(event); }, {
                passive: false,
            });
        }
        else {
            document.addEventListener('pointerdown', function (event) { return _this.downMouseHandler(event); });
            document.addEventListener('pointerup', function (event) { return _this.upMouseHandler(event); });
            document.addEventListener('pointermove', function (event) { return _this.moveMouseHandler(event); });
            document.addEventListener('pointerleave', function (event) { return _this.leaveMouseHandler(event); });
        }
    };
    Tools.prototype.pointerSwitcher = function (event, pen, touch, mouse) {
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
    };
    // ---- PointerEvents ---
    // !------ Switcher ------
    // *- Main Callback Functions -
    Tools.prototype.downPointerController = function (event) {
        this.pointerSwitcher(event, this.handlePenDown(event), this.handleTouchDown(event), this.handleMouseDown(event));
    };
    Tools.prototype.movePointerController = function (event) {
        this.pointerSwitcher(event, this.handlePenMove(event), this.handleTouchMove(event), this.handleMouseMove(event));
    };
    Tools.prototype.upPointerController = function (event) {
        this.pointerSwitcher(event, this.handlePenUp(event), this.handleTouchUp(event), this.handleMouseUp(event));
    };
    // ---- PointerEvents ---
    // *------- DOWN -------
    Tools.prototype.handlePenDown = function (event) {
        event.preventDefault();
        this.drawToggle = true;
    };
    Tools.prototype.handleTouchDown = function (event) {
        event.preventDefault();
        this.drawToggle = true;
        if (eventStack.length <= 1) {
            this.p1 = eventStack[0];
        }
        else if (eventStack.length >= 2) {
            this.p1 = eventStack[0];
            this.p2 = eventStack[1];
            this.pinchDist = this._calclationPointsDistance(this.p1.pageX, this.p1.pageY, this.p2.pageX, this.p2.pageY);
            this.nowR = this.dist / this.pinchDist;
        }
    };
    Tools.prototype.handleMouseDown = function (event) {
        this.drawToggle = true;
    };
    // ---- PointerEvents ---
    // *------- MOVE -------
    Tools.prototype.handlePenMove = function (event) {
        event.preventDefault();
        if (this.drawToggle) {
            this.penPencilTool(event);
        }
    };
    Tools.prototype.handleMouseMove = function (event) {
        if (this.drawToggle) {
            this.mousePencilTool(event);
        }
    };
    Tools.prototype.handleTouchMove = function (event) {
        event.preventDefault();
        for (var i = 0; i < eventStack.length; i++) {
            if (eventStack[i].pointerId === event.pointerId) {
                eventStack[i] = event;
            }
        }
        if (eventStack.length > 3) {
            eventStack.splice(0, 3);
        }
        this.p1 = eventStack[0];
        this.p2 = eventStack[1];
        if (this.drawToggle) {
            this.touchPencilTool(eventStack[0]);
        }
        if (eventStack.length >= 2) {
            this.drawToggle = false;
            this.dx = (this.p1.pageX + this.p2.pageX) / 2;
            this.dy = (this.p1.pageY + this.p2.pageY) / 2;
            this.dist = this._calclationPointsDistance(this.p1.pageX, this.p1.pageY, this.p2.pageX, this.p2.pageY);
            this.nowR = this.dist / this.pinchDist;
        }
        this._pinchHandle(this.dist / this.pinchDist);
    };
    // ---- PointerEvents ---
    // *--------  UP  --------
    Tools.prototype.handlePenUp = function (event) {
        this.drawToggle = false;
        // @ts-ignore
        this.context.beginPath();
    };
    Tools.prototype.handleTouchUp = function (event) {
        this.drawToggle = false;
        // @ts-ignore
        this.context.beginPath();
        this._removeEventStack(event);
    };
    Tools.prototype.handleMouseUp = function (event) {
        this.drawToggle = false;
        // @ts-ignore
        this.context.beginPath();
    };
    // ---- PointerEvents ---
    // *------- LEAVE -------
    Tools.prototype.leavePointerHandler = function (event) {
        this.drawToggle = false;
    };
    // ---- MouseEvents ----
    // *-- LEGACY EVENTS --
    Tools.prototype.downMouseHandler = function (event) {
        this.drawToggle = true;
    };
    Tools.prototype.moveMouseHandler = function (event) {
        this.handleMouseMove(event);
    };
    Tools.prototype.upMouseHandler = function (event) {
        this.drawToggle = false;
        // @ts-ignore
        this.context.beginPath();
    };
    Tools.prototype.leaveMouseHandler = function (event) {
        this.drawToggle = false;
    };
    // ---- PencilTools ----
    // マウス用PencilTool
    Tools.prototype.mousePencilTool = function (event) {
        // Context2D初期化
        // @ts-ignore
        var a = this.context;
        // 消しゴムトグル
        this.eraseTool(a);
        this.settingPenConf(a, this.canvasColor, this.capStyle, this.joinStyle);
        this.drawLine(a, event);
    };
    // ペン用PencilTool
    Tools.prototype.penPencilTool = function (event) {
        // Context2D初期化
        // @ts-ignore
        var a = this.context;
        // 消しゴムトグル
        this.eraseTool(a);
        a.lineWidth = this._activatePressure(event);
        this.settingPenConf(a, this.canvasColor, this.capStyle, this.joinStyle);
        this.drawLine(a, event);
    };
    Tools.prototype.settingPenConf = function (context, color, capStyle, JoinStyle) {
        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineCap = capStyle;
        context.lineJoin = JoinStyle;
    };
    // タッチ用PencilTool
    Tools.prototype.touchPencilTool = function (event) {
        // Context2D初期化
        // @ts-ignore
        var a = this.context;
        // 消しゴムトグル
        this.eraseTool(a);
        a.lineWidth = this.penRadius;
        this.settingPenConf(a, this.canvasColor, this.capStyle, this.joinStyle);
        this.drawLine(a, event);
    };
    Tools.prototype.drawLine = function (a, event) {
        a.lineTo(event.offsetX, event.offsetY);
        a.stroke();
        a.beginPath();
        a.moveTo(event.offsetX, event.offsetY);
    };
    Tools.prototype.eraseTool = function (a) {
        this.eraserToggle
            ? (a.globalCompositeOperation = 'destination-out')
            : (a.globalCompositeOperation = 'source-over');
    };
    Tools.prototype.setPencilColor = function (color) {
        this.canvasColor = color;
    };
    Tools.prototype._calclationPointsDistance = function (p1x, p1y, p2x, p2y) {
        var X = p1x - p2x;
        var Y = p1y - p2y;
        return Math.sqrt(X * X + Y * Y) / 2;
    };
    // 筆圧に対応していた場合値を返す
    Tools.prototype._activatePressure = function (event) {
        var Rad = this.defRad;
        if (event.pressure < 0.995 || event.pressure > 0.05) {
            event.pressure ? (Rad *= event.pressure) : (Rad /= event.pressure);
            return Rad;
        }
        else if (event.pressure <= 0.05 || event.pressure > 0.01) {
            return 0.05;
        }
        else {
            return;
        }
    };
    // タッチイベントをスタックから削除
    Tools.prototype._removeEventStack = function (event) {
        for (var i = 0; i < eventStack.length; i++) {
            if (eventStack[i].pointerId === event.pointerId) {
                eventStack.splice(i, 1);
            }
        }
    };
    // ピンチズーム処理
    Tools.prototype._pinchHandle = function (nowScalse) {
        var style = document.getElementById('canvas').style;
        var scale = "scale(" + this.nowR + "," + this.nowR + ")";
        style.left = this.distX + 'px';
        style.top = this.distY + 'px';
        style.transform = scale;
        style.webkitTransform = scale;
    };
    Tools.prototype._supportPointerEvent = function () {
        return window.PointerEvent ? true : false;
    };
    Tools.prototype._puressurePoints = function (event) {
        return {
            x: event.offsetX,
            y: event.offsetY,
            pressurevent: event.pressure,
        };
    };
    // ----- 画面上にデバッグ情報が流れる
    Tools.prototype._debugLogger = function (message) {
        if (document.getElementById('debug')) {
            document.getElementById('debug').insertAdjacentHTML('afterbegin', message + '<br>');
        }
        else {
            var el = document.createElement('div');
            el.id = 'debug';
            el.insertAdjacentHTML('afterbegin', message + '<br>');
        }
    };
    return Tools;
}(Application));
var graph = document.querySelector('#canvas');
var c = graph.getContext('2d');
var app = new Application(graph, c);
var draw = new Tools(graph, c);
// Application.prototype.init
//    (context , backgroundColor, hideMenu, smoothRendering)
app.setUpView(1920, 1080, c, '#ffff', true, false);


/***/ })

/******/ });
//# sourceMappingURL=index.js.map