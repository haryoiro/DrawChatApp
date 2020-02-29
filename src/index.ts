import express from "express";
import http from "http"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import socketio from "socket.io"

const port = process.env.PORT || 5000;

// app setup
const app: express.Express = express();
const server: http.Server = app.listen(port, () :void => {
  console.log(`listening to requests on port: ${port}`)
})
const io : socketio.Server = socketio(server)

// publicフォルダ設定
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

// // ---- - ROUTES ----
// app.get("/", async (req: Express.Request, res: Express.Response) => {
//   try {
//     res.end("Hello World");
//   } catch (error) {
//     console.error(`Error: ${error}`, error);
//     res.status(500).send({ error: `${error}` });
//   }
// });
io.on('connection', (socket) => {
  console.log('made socket conenction', socket.id)

  socket.on('chat', data => {
    io.sockets.emit('chat', data)
  })

  socket.on('point', points => {
    socket.broadcast.emit('point', points)
  })
})
