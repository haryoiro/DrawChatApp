import express from "express";
import http from "http"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path"
import { Socket } from "net";
import { stringify } from "querystring";

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

// ---- - Socket.IO -----
const socketOption = {
  cookie: false,
  serveClient: false,
  transports: ['websocket', 'polling']
}
// import socketio from "socket.io"
const socket = require('socket.io')
const io = socket(server, socketOption)
// const io = socket(server)


let canvasArr: any[] = []
const pointsStack = (points: any)  => {
  canvasArr.push(points)
}
const clearAllCanvas = () => {
  canvasArr = []
}
class SocketMapHandler {
  public map: Map<string, Date>
  constructor(){
    this.map =  new Map<string, Date>()
  }
  public nowTime = () => new Date()
  public setSocketId = (socketId: string) => this.map.set(socketId, this.nowTime())
  public hasSocketId = (socketId: string) => this.map.has(socketId)
  public getSocketId = (socketId: string) => this.map.get(socketId)
  public deleteSocketId = (socketId: string) => this.hasSocketId(socketId) ? this.map.delete(socketId) : void 0
}
const canvasPointsMap = new Map<string, any>()
const hasOnPoints = (map: Map<string, any>, socketId: string, points:any) => map.has(points) || points !== null ? true : false
const setOnPoints = (map: Map<string, any>, socketId: string, pointsArr: any) => hasOnPoints(map, socketId, pointsArr) ? void 0 : map.set(socketId, pointsArr)
const deleteOnPoints = (map: Map<string, any>, socketId: string, pointsArr: any) => {hasOnPoints(map, socketId, pointsArr) ? void 0 : map.delete(pointsArr)}



const sUser = new SocketMapHandler()
io.sockets.on('connection',  (socket: any) => {
  sUser.setSocketId(socket.id)
  console.log(`socket connected: ${socket.id} :: ${sUser.getSocketId(socket.id)}`)
  console.log(`now Player: ${sUser.map.size}`)
  console.log(sUser.map)

  socket.on('firstConnect', (socketId: any) => {
    socket.emit('allCanvas', canvasArr)
    io.to(socketId).emit('s_to_c_id', {id: socketId})
  })

  socket.on('chat', (data: any): void=> {
    io.sockets.emit('chat', data)
  })

  socket.on('point',(points: any): void => {
    canvasArr.push(points)
    // console.log(points)
    socket.broadcast.emit('point', points)
  })

  socket.on('disconnect', (socket: any): void => {
    console.log(socket.id)
    if(sUser.hasSocketId(socket.id)){
      console.log('socket disconnection', socket.id)
      io.socket.emit('userDisconnect', socket.id)
      sUser.deleteSocketId(socket.id)
    }
  })
  // setInterval(()=>{socket.emit('clearAll')},30000)
})


server.listen(port, () :void => {
  console.log(`listening to requests on port: ${port}`)
})