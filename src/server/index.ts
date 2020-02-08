import * as express from "express"
import * as http from "http"
import * as socketio from "socket.io"

const app: express.Express = express()
const server: http.Server = http.createServer(app)
const io: socketio.Server = socketio(server)
const port:  string|number = process.env.PORT || 3000

app.use(express.static("public"))

io.on("connection", (socket: socketio.Socket) => {
  socket.on('ClMessage', (msg: string) => {
    io.emit('message', msg)
  })
})

server.listen(port, () => console.log(`listening on ${port}`))