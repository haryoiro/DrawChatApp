import * as io from "socket.io-client"
const socket: SocketIOClient.Socket = io()

const form: HTMLFormElement = document.querySelector('form')
const input: HTMLInputElement = document.querySelector('input')
const ul: HTMLUListElement = document.querySelector('ul')

form.addEventListener('submit', (e: Event) => {
  e.preventDefault()
  socket.emit('ClMessage', input.value)
  input.value = ''
})

socket.on('message', (msg: string) => {
  ul.insertAdjacentHTML('beforebegin', `<li>${msg}</li>`)
})