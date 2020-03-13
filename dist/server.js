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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);





const port = process.env.PORT || 5000;
// app setup
const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
const server = http__WEBPACK_IMPORTED_MODULE_1___default.a.createServer(app);
// publicフォルダ設定
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static(path__WEBPACK_IMPORTED_MODULE_4___default.a.join(__dirname, './public')));
app.set('views', path__WEBPACK_IMPORTED_MODULE_4___default.a.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({ extended: true }));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_3___default()());
// app.use(helmet())
// app.disable('x-powered-by')
// // Sets "X-XSS-Protection: 1; mode=block".
// app.use(helmet.xssFilter())
// // Strict-Transport-Security
// const sixtyDaysInSeconds = 31536000
// app.use(helmet.hsts({
//   maxAge: sixtyDaysInSeconds,
//   includeSubDomains: true,
//   preload: true
// }))
app.get("/", (req, res) => {
    res.render('index', () => {
        res.writeHead(200);
    });
});
// ---- - Socket.IO -----
const socketOption = {
    cookie: false,
    serveClient: false,
    transports: ['websocket', 'polling']
};
// import socketio from "socket.io"
const socket = __webpack_require__(/*! socket.io */ "socket.io");
const io = socket(server, socketOption);
// const io = socket(server)
let canvasArr = [];
class SocketMapHandler {
    constructor() {
        this.nowTime = () => new Date();
        this.setSocketId = (socketId) => this.map.set(socketId, this.nowTime());
        this.hasSocketId = (socketId) => this.map.has(socketId);
        this.getSocketId = (socketId) => this.map.get(socketId);
        this.deleteSocketId = (socketId) => this.hasSocketId(socketId) ? this.map.delete(socketId) : void 0;
        this.map = new Map();
    }
}
const canvasPointsMap = new Map();
const hasOnPoints = (map, socketId, points) => map.has(points) || points !== null ? true : false;
const setOnPoints = (map, socketId, pointsArr) => hasOnPoints(map, socketId, pointsArr) ? void 0 : map.set(socketId, pointsArr);
const deleteOnPoints = (map, socketId, pointsArr) => { hasOnPoints(map, socketId, pointsArr) ? void 0 : map.delete(pointsArr); };
const sUser = new SocketMapHandler();
io.sockets.on('connection', (socket) => {
    sUser.setSocketId(socket.id);
    console.log(`socket connected: ${socket.id} :: ${sUser.getSocketId(socket.id)}`);
    console.log(`now Player: ${sUser.map.size}`);
    socket.on('firstConnect', (socketId) => {
        socket.emit('allCanvas', canvasArr);
        io.to(socketId).emit('s_to_c_id', { id: socketId });
    });
    console.log(sUser.map);
    sUser.map.clear();
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
    socket.on('point', (points) => {
        canvasArr.push(points);
        // console.log(points)
        socket.broadcast.emit('point', points);
    });
    socket.on('disconnect', (socket) => {
        console.log(socket.id);
        if (sUser.hasSocketId(socket.id)) {
            console.log('socket disconnection', socket.id);
            io.socket.emit('userDisconnect', socket.id);
            sUser.deleteSocketId(socket.id);
        }
    });
    // setInterval(()=>{socket.emit('clearAll')},30000)
});
server.listen(port, () => {
    console.log(`listening to requests on port: ${port}`);
});


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });