import express from "express";
import http from "http"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import socketio from "socket.io"
import path from "path"

const port = process.env.PORT || 5000;
// Constants

// app setup
const app: express.Express = express();
const server: http.Server = app.listen(port, () :void => {
  console.log(`listening to requests on port: ${port}`)
})

// publicフォルダ設定
app.use(express.static(path.join(__dirname, './public')))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {

});

// ---- - Socket.IO -----
const io : socketio.Server = socketio(server)
io.on('connection', socket=> {
  console.log('made socket conenction', socket.id)

  socket.on('chat', data=> {
    io.sockets.emit('chat', data)
  })

  socket.on('point', points => {
    socket.broadcast.emit('point', points)
  })
})
