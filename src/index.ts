import express from "express";
import http from "http"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path"
import { futimesSync } from "fs";
import { resolve } from "dns";
// const helmet = require("helmet")

const port = process.env.PORT || 5000

// app setup
const app: express.Express = express();
const server: http.Server = http.createServer(app)

// publicフォルダ設定
app.use(express.static(path.join(__dirname, './public')))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

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
    res.writeHead(200)
  })
});

let canvasArr: any[] = []
let playerArr: any[] = []
const allCanvasStack = (points: any)  => {
  canvasArr.push(points)
}
const clearAllCanvas = () => {
  canvasArr = []
}
// ---- - Socket.IO -----
const socketOption = {
  cookie: false,
  serveClient: false,
  transports: ['websocket', 'polling']
}
// import socketio from "socket.io"
const socket = require('socket.io')
const io = socket(server, socketOption)
// const io : socketio.Server = socketio(server).listen()


// io.adapter(redis({host: "127.0.0.1", port: 5000}))
io.on('connection', (socket: any): void=> {
  console.log('made socket conenction', socket.id)
  playerArr = [...playerArr, socket.id]
  socket.emit('allCanvas', canvasArr)
  console.log(playerArr)
  console.log(`now Player: ${playerArr.length}`)

  socket.on('chat', (data: any): void=> {
    io.sockets.emit('chat', data)
  })

  socket.on('point',(points: any): void => {
    allCanvasStack(points)
    socket.broadcast.emit('point', points)
  })

  socket.on('disconnect', (socket: any): void => {
    playerArr.splice(
      playerArr.indexOf(socket.id), 1)
    console.log('socket disconnection', socket.id)
  })
  setInterval(()=>{socket.emit('clearAll')},30000)
})


server.listen(port, () :void => {
  console.log(`listening to requests on port: ${port}`)
})