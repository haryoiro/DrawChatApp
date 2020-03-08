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
    }
    sliderElementSetup() {
        let penSize = this.sliders[0], penAlpha = this.sliders[1], penSmooth = this.sliders[2], eraSize = this.sliders[3], eraAplha = this.sliders[4], eraSmooth = this.sliders[5];
        penSize.addEventListener('input', () => {
            this.view.penRadius = parseInt(penSize.value, 10);
        });
        eraSize.addEventListener('input', () => { this.view.eraRadius = parseInt(eraSize.value, 10); });
    }
    elementActivate() {
        this.sliderElementSetup();
        this.barg.addEventListener('click', () => {
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
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ "./src/public/UI.ts");
const socketOption = {
    reconnectionDelay: 50000,
    transports: ['websocket', 'polling']
};
// const socket = io("http://localhost", socketOption)
const socket = io("https://app-drawn.herokuapp.com", socketOption);

class Application {
    constructor(canvas, context2D) {
        this.canvas = canvas;
        this.context2D = context2D;
        this.canvas = canvas;
        this.context2D = context2D;
    }
    setUpView(width, height, color, hide = false, smooth = false) {
        this._settingCanvasSize(width, height);
        this._backgroundColor(color);
        this._hideMenuHandler(hide);
        this._isImageSmoothing(smooth);
    }
    _settingCanvasSize(width, height) {
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
        if (bool) {
            document.addEventListener('contextmenu', e => e.preventDefault());
            document.addEventListener('MSHoldVisal', e => e.preventDefault());
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
            this.canvas.addEventListener('pointerdown', (event) => this.downPointerController(event), { passive: false, });
            this.canvas.addEventListener('pointerup', (event) => this.upPointerController(event), { passive: false, });
            this.canvas.addEventListener('pointermove', (event) => this.movePointerController(event), { passive: false, });
            this.canvas.addEventListener('pointercancel', (event) => this.leavePointerHandler(event), { passive: false, });
            document.addEventListener('wheel', (event) => {
                event.preventDefault();
                this.nowR ? this.nowR : this.nowR = 1;
                this.zoomX = event.pageX;
                this.zoomY = event.pageY;
                if (event.deltaY > 1) {
                    this.nowR -= 0.2;
                }
                else if (event.deltaY < -1) {
                    this.nowR += 0.2;
                }
                this._pinchHandle(event);
            }, { passive: false, });
            // this.canvas.addEventListener('pointerleave', event => this.leavePointerHandler(event), {
            //   passive: false,
            // });
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
        this.pointerSwitcher(event, this.handlePenUp(event), this.handleTouchUp(event), this.handleMouseUp(event));
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
            this.context2D.lineWidth = this.initializePressure(event);
            this.pencilTool(event);
            this.stackPoint(this._pressurePoints(event));
        }
    }
    handleMouseMove(event) {
        event.preventDefault();
        if (this.drawToggle) {
            this.context2D.lineWidth = this.initializePressure(event);
            this.pencilTool(event);
            this.stackPoint(this._pressurePoints(event));
        }
    }
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
            this.context2D.lineWidth = this.initializePressure(event);
            this.eraseTool();
            this.settingPenConf(this.canvasColor, this.capStyle, this.joinStyle);
            this.drawLine(event.offsetX, event.offsetY);
            this.stackPoint(this._pressurePoints(event));
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
    // *--------  UP  --------
    handlePenUp(event) {
        event.preventDefault();
        this.drawToggle = false;
        this.emitStack.push({ color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle, width: this.initializePressure(event) });
        this.emitPoint(this.emitStack);
        this.emitStack = [];
        this.context2D.beginPath();
    }
    handleTouchUp(event) {
        event.preventDefault();
        this.drawToggle = false;
        this.emitStack.push({ color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle, width: this.initializePressure(event) });
        this.emitPoint(this.emitStack);
        this.emitStack = [];
        this.context2D.beginPath();
        this._removeEventStack(event);
    }
    handleMouseUp(event) {
        event.preventDefault();
        this.drawToggle = false;
        this.emitStack.push({ color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle, width: this.initializePressure(event) });
        this.emitPoint(this.emitStack);
        this.emitStack = [];
        this.context2D.beginPath();
    }
    // ---- PointerEvents ---
    // *------- LEAVE -------
    leavePointerHandler(event) {
        event.preventDefault();
        this.context2D.beginPath();
        this.drawToggle = false;
    }
    // ---- MouseEvents ----
    // *-- LEGACY EVENTS --
    downMouseHandler(event) {
        event.preventDefault();
        this.drawToggle = true;
    }
    moveMouseHandler(event) {
        event.preventDefault;
        if (this.drawToggle) {
            this.context2D.lineWidth = this.initializePressure({ pressure: 0.5 });
            this.pencilTool(event);
            this.stackPoint(this._simplePoints(event, 0.5));
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
        this.eraseTool();
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
        if (this.eraserToggle) {
            this.defRad = this.eraRadius;
            this.context2D.globalCompositeOperation = 'destination-out';
        }
        else {
            this.defRad = this.penRadius;
            this.context2D.globalCompositeOperation = 'source-over';
        }
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
        this.eraseTool();
        if (event.pressure < 0.995 || event.pressure > 0.05) {
            event.pressure ? (this.defRad *= event.pressure) : (this.defRad /= event.pressure);
            return this.defRad;
        }
        else if (event.pressure <= 0.05 || event.pressure > 0.01) {
            return this.defRad *= 0.05;
        }
        else if (event.pressure >= 0.995) {
            return this.defRad *= 0.995;
        }
        else {
            return this.defRad *= 0.5;
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
        const dpr = window.devicePixelRatio || 1;
        if (this.nowR >= 20) {
            this.nowR = 10;
        }
        else if (this.nowR <= 0.05) {
            this.nowR = 0.05;
        }
        else {
            style.transformOrigin = `${this.zoomX}px ${this.zoomY}px`;
            scale = `scale(${this.nowR * dpr})`;
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
    _pressurePoints(event) {
        return { X: event.offsetX, Y: event.offsetY, pressure: this.initializePressure(event) };
    }
    _simplePoints(event, number) {
        return { X: event.offsetX, Y: event.offsetY, pressure: this.initializePressure({ pressure: number }) };
    }
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
        this.emitStack.splice(0, 1);
        socket.emit('point', pointObj);
    }
}
class socketer {
    constructor() {
    }
    pointerAsync() {
        socket.on('allCanvas', (canvas) => {
            for (let o in canvas) {
                let points = canvas[o];
                for (let i in points) {
                    console.log(points);
                    view.settingPenConf(points[i][points[i].length - 1].color, points[i][points[i].length - 1].cap, points[i][points[i].length - 1].join);
                    if (points[i][points.length - 1].erase) {
                        view.context2D.globalCompositeOperation = 'destination-out';
                    }
                    else {
                        view.context2D.globalCompositeOperation = 'source-over';
                    }
                    view.context2D.lineWidth = points[i].pressure;
                    view.drawLine(points[i].X, points[i].Y);
                }
                view.context2D.beginPath();
                view.eraseTool();
            }
        });
        socket.on('point', (points) => {
            view.settingPenConf(points[points.length - 1].color, points[points.length - 1].cap, points[points.length - 1].join);
            if (points[points.length - 1].erase) {
                view.context2D.globalCompositeOperation = 'destination-out';
            }
            else {
                view.context2D.globalCompositeOperation = 'source-over';
            }
            for (let i in points) {
                view.context2D.lineWidth = points[i].pressure;
                view.drawLine(points[i].X, points[i].Y);
            }
            view.eraseTool();
            view.context2D.beginPath();
        });
        socket.on('clear', () => {
            view.context2D.clearRect(0, 0, 1920, 1080);
        });
    }
}
// const virtualCanvas = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d')
// document.addEventListener('pointermove', (event: PointerEvent) => {
//     // virtualCanvas.arc(event.pageX, event.pageY)
// })
const canvas = document.querySelector('#canvas');
const graphic = canvas.getContext('2d');
const view = new Tools(canvas, graphic);
// Application.prototype.serUpView
//    (context , backgroundColor, hideMenu, smoothRendering)
view.setUpView(1920, 1080, '#ffffff', true, false);
const socketInit = new socketer();
socketInit.pointerAsync();
const domButton = new _UI__WEBPACK_IMPORTED_MODULE_0__["default"](view);
domButton.elementActivate();
// const clearButton = document.getElementById('clear')
// clearButton?.addEventListener('click', () => {
//   view.context2D.clearRect(0, 0, 1920, 1080)
//   socket.emit('clear')
// })


/***/ })

/******/ });
//# sourceMappingURL=index.js.map