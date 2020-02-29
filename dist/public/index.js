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

/***/ "./src/public/index.ts":
/*!*****************************!*\
  !*** ./src/public/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

const socket = io.connect('http://localhost:5000');
class Application {
    constructor(canvas, context2D) {
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
        this.canvasColor = "#000";
        this.drawToggle = false;
        this.eraserToggle = false;
        this.pressureToggle = false;
        this.defRad = 10;
        this.capStyle = 'round';
        this.joinStyle = 'round';
        this.STACK_MAX_SIZE = 100;
        this.undoStack = [];
        this.redoStack = [];
        this.emitStack = [];
        this.eventActivation();
    }
    eventActivation() {
        if (window.PointerEvent) {
            this.canvas.addEventListener('pointerdown', event => this.downPointerController(event), {
                passive: false,
            });
            this.canvas.addEventListener('pointerup', event => this.upPointerController(event), {
                passive: false,
            });
            this.canvas.addEventListener('pointermove', event => this.movePointerController(event), {
                passive: false,
            });
            this.canvas.addEventListener('pointercancel', event => this.leavePointerHandler(event), {
                passive: false,
            });
            this.canvas.addEventListener('pointerout', event => this.leavePointerHandler(event), {
                passive: false,
            });
        }
        else {
            this.canvas.addEventListener('mousedown', event => this.downMouseHandler(event));
            this.canvas.addEventListener('mouseup', event => this.upMouseHandler(event));
            this.canvas.addEventListener('mousemove', event => this.moveMouseHandler(event));
            this.canvas.addEventListener('mouseleave', event => this.leaveMouseHandler(event));
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
    handlePenMove(event) {
        event.preventDefault();
        if (this.drawToggle) {
            this.context2D.lineWidth = this._activatePressure(event);
            this.pencilTool(event);
            this.stackPoint(this._puressurePoints(event));
        }
    }
    handleMouseMove(event) {
        event.preventDefault();
        if (this.drawToggle) {
            this.context2D.lineWidth = this._activatePressure(event);
            this.pencilTool(event);
            this.stackPoint(this._simplePoints(event));
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
            this.context2D.lineWidth = this._activatePressure(event);
            this.eraseTool();
            this.settingPenConf(this.canvasColor, this.capStyle, this.joinStyle);
            this.drawLine(event.offsetX, event.offsetY);
            this.stackPoint(this._simplePoints(event));
        }
        if (eventStack.length >= 2) {
            this.p2 = eventStack[1];
            this.drawToggle = false;
            this.dist = this._calclationPointsDistance(this.p1.pageX, this.p1.pageY, this.p2.pageX, this.p2.pageY);
            this.nowR = this.dist / this.pinchDist;
            this.distX = (eventStack[0].pageX - this.tp1x);
            this.distY = (eventStack[0].pageY - this.tp1y);
        }
        this._pinchHandle();
    }
    handlePenUp(event) {
        event.preventDefault();
        this.drawToggle = false;
        this.emitStack.push({ color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle });
        this.emitPoint(this.emitStack);
        this.emitStack = [];
        this.context2D.beginPath();
    }
    handleTouchUp(event) {
        event.preventDefault();
        this.drawToggle = false;
        this.emitStack.push({ color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle });
        this.emitPoint(this.emitStack);
        this.emitStack = [];
        this.context2D.beginPath();
        this._removeEventStack(event);
    }
    handleMouseUp(event) {
        event.preventDefault();
        this.drawToggle = false;
        this.emitStack.push({ color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle });
        this.emitPoint(this.emitStack);
        this.emitStack = [];
        this.context2D.beginPath();
    }
    leavePointerHandler(event) {
        event.preventDefault();
        this.context2D.beginPath();
        this.drawToggle = false;
    }
    downMouseHandler(event) {
        event.preventDefault();
        this.drawToggle = true;
    }
    moveMouseHandler(event) {
        event.preventDefault;
        if (this.drawToggle) {
            this.context2D.lineWidth = this.defRad * 0.5;
            this.pencilTool(event);
            this.stackPoint(this._simplePoints(event));
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
        this.eraserToggle
            ? (this.context2D.globalCompositeOperation = 'destination-out')
            : (this.context2D.globalCompositeOperation = 'source-over');
    }
    setPencilColor(color) {
        this.canvasColor = color;
    }
    _calclationPointsDistance(p1x, p1y, p2x, p2y) {
        const X = p1x - p2x;
        const Y = p1y - p2y;
        return Math.sqrt(X * X + Y * Y) / 2;
    }
    _activatePressure(event) {
        let Rad = this.defRad;
        if (event.pressure < 0.995 || event.pressure > 0.05) {
            event.pressure ? (Rad *= event.pressure) : (Rad /= event.pressure);
            return Rad;
        }
        else if (event.pressure <= 0.05 || event.pressure > 0.01) {
            return Rad *= 0.05;
        }
        else if (event.pressure >= 0.995) {
            return Rad *= 0.995;
        }
    }
    initializePressure(event) {
        let Rad = this.defRad;
        if (event.pressure < 0.995 || event.pressure > 0.05) {
            event.pressure ? (Rad *= event.pressure) : (Rad /= event.pressure);
            return Rad;
        }
        else if (event.pressure <= 0.05 || event.pressure > 0.01) {
            return Rad *= 0.05;
        }
        else if (event.pressure >= 0.995) {
            return Rad *= 0.995;
        }
    }
    _removeEventStack(event) {
        for (let i = 0; i < eventStack.length; i++) {
            if (eventStack[i].pointerId === event.pointerId) {
                eventStack.splice(i, 1);
            }
        }
    }
    _pinchHandle() {
        const style = document.getElementById('canvas').style;
        const scale = `scale(${this.nowR},${this.nowR})`;
        style.left = this.distX + 'px';
        style.top = this.distY + 'px';
        style.transform = scale;
        style.webkitTransform = scale;
        style.MozTransform = scale;
        style.msTransform = scale;
        style.transition = 'initial';
    }
    _puressurePoints(event) {
        return { X: event.offsetX, Y: event.offsetY, pressure: event.pressure };
    }
    _simplePoints(event) {
        return { X: event.offsetX, Y: event.offsetY, pressure: null };
    }
    undoRedo() {
    }
    stackPoint(pointObj) {
        this.emitStack.push(pointObj);
    }
    emitPoint(pointObj) {
        socket.emit('point', pointObj);
    }
}
const graph = document.querySelector('#canvas');
const c = graph.getContext('2d');
const view = new Tools(graph, c);
view.setUpView(1920, 1080, '#ffffff', true, false);
socket.on('point', points => {
    view.context2D.beginPath();
    view.settingPenConf(points[points.length - 1].color, points[points.length - 1].cap, points[points.length - 1].join);
    if (points[points.length - 1].erase) {
        view.context2D.globalCompositeOperation = 'destination-out';
    }
    for (let item in points) {
        view.context2D.lineWidth = view.initializePressure(points[item]);
        console.log(points[item].pressure);
        view.drawLine(points[item].X, points[item].Y);
    }
    view.eraseTool();
});


/***/ })

/******/ });
//# sourceMappingURL=index.js.map