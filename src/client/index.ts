import { format } from "url"

class Application {
  canvas: HTMLCanvasElement
  ctx: any
  width: number
  height: number
  fps: number
  rect: ClientRect
  constructor( canvas: HTMLCanvasElement,context: CanvasRenderingContext2D, width: number, height: number ){
    this.width = width
    this.height = height
    this.canvas = canvas
    this.ctx = context
    this.rect = this.canvas.getBoundingClientRect()
  }
  public init(context: CanvasRenderingContext2D, color: string, hide: boolean, smooth: boolean){
    this.canvasSize()
    this.backgroundColor(color)
    this.hideMenuHandler(hide)
    this.isImageSmoothing(context, smooth)
  }
  private canvasSize(){
    if(!this.width || !this.height){
      return
    }
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx.width = this.width
    this.ctx.height= this.height
  }
  public clearAll(){
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.beginPath()
  }
  public clearInterval(fps: number){
    this.fps = fps
  }
  private backgroundColor(color: string){
    this.ctx.fillStyle = color
    this.ctx.fillRect(0, 0, this.width, this.height)
  }
  private hideMenuHandler(bool: boolean){
    if(bool){
      document.body.style.overflow = 'hidden'
      document.addEventListener('contextmenu', e => {e.preventDefault()})
      document.addEventListener('MSHoldVisal', e => {e.preventDefault()})
    }
  }
  private isImageSmoothing(context: CanvasRenderingContext2D, bool: boolean){
    if(!bool){bool = true}
    // context.mozImageSmoothingEnabled = bool
    // context.webkitImageSmoothingEnabled = bool
    // context.msImageSmoothingEnabled = bool
    context.imageSmoothingEnabled = bool
  }
}
class DrawEvents {
  element: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  constructor(element: HTMLCanvasElement, context: CanvasRenderingContext2D){
    this.x
    this.y
    this.element = element
    this.ctx = context
  }

  public thisPoints(event: MouseEvent, rect: ClientRect){
    this.x =  event.clientX - Math.floor(rect.left)
    this.y =  event.clientY - Math.floor(rect.top)
  }
  public mousePoints(){
    return {x: this.x, y: this.y}
  }
  public harvestPoints(event: MouseEvent, rect: ClientRect){
    this.thisPoints(event, rect)
    return this.mousePoints()
  }
}

let eventStack: PointerEvent[] = []
class Tools {
  element: HTMLCanvasElement
  context: CanvasRenderingContext2D
  pointerEventHandler: boolean

  canvasColor: string
  drawToggle: boolean
  eraserToggle: boolean
  constructor(element: HTMLCanvasElement, context?: CanvasRenderingContext2D){
    this.element = element
    this.context = this.element.getContext('2d')
  }  
  public pencilTool(e:PointerEvent){
    //Context2D初期化
    //@ts-ignore
    let a:any = e.target.getContext("2d")
    //ポインター毎イベントを配列に保存しそれぞれ使用できるようにする
    for (let i = 0; i < eventStack.length; i++) {
      if (e.pointerId == eventStack[i].pointerId) { 
        eventStack[i] = e
    }} 
    //消しゴムトグル
    if (this.eraserToggle){
      a.globalCompositeOperation = 'destination-out'
    } else {
      a.globalCompositeOperation = 'source-over'
    }
    
    // 現在のポインター座標を取得
    // {x: number, y: number}
    let obj: {[s: string]: number} = DrawEvent.harvestPoints(eventStack[0], app.rect)

    a.strokeStyle = this.canvasColor
    a.fillStyle =   this.canvasColor
    a.lineCap = 'round'

    a.lineTo(obj.x, obj.y)
    a.stroke()
    a.beginPath()
    a.moveTo(obj.x, obj.y)
  }
  public handledown(e: PointerEvent){
    this.drawToggle = true
    eventStack.push(e)
    e.preventDefault()
  }
  public handleup(e: PointerEvent){
    this.drawToggle = false
    //@ts-ignore
    let a:any = e.target.getContext("2d")
    a.beginPath()
    this.removeEventStack(e)
  }

  public handlemove(e: PointerEvent){  // 格納したイベントの数分イベントを再格納
    if(this.drawToggle){
      this.pencilTool(e)
    }
  }
  private removeEventStack(e: PointerEvent){
    for(let i = 0;i < eventStack.length; i++){
      if(eventStack[i].pointerId == e.pointerId){
        eventStack.splice(i, 1)
      }
    }
  }

  public setPencilColor(color: string){
    this.canvasColor = color
  }
}

const graph: HTMLCanvasElement = document.querySelector('#canvas')
const c: CanvasRenderingContext2D = graph.getContext('2d')

const app = new Application(graph, c, 1080, 720)
// app.prototype.init (context , backgroundColor, hidemenu, smoothRendering)
app.init(c, "#0999", true, true)
document.body.style.touchAction = 'none'

const DrawEvent = new DrawEvents(graph, c)

c.beginPath()


if(window.PointerEvent){
  const c: CanvasRenderingContext2D = graph.getContext('2d')
  let draw = new Tools(graph, c)
    graph.addEventListener('pointerdown', e=>draw.handledown(e))
    graph.addEventListener('pointerup',   e=>draw.handleup(e))
    graph.addEventListener('pointermove', e=>draw.handlemove(e))
		graph.addEventListener('pointerleave',e=>draw.handleup(e))
} else {
    const c: CanvasRenderingContext2D = graph.getContext('2d')
    let draw = new Tools(graph, c)
    graph.addEventListener('mousedown', e=>draw.handlemousedown(e))
    graph.addEventListener('mousemove', e=>draw.handlemouseup(e))
		graph.addEventListener('mouseup',   e=>draw.handlemousemove(e))
		graph.addEventListener('mouseover', e=>draw.handlmouseeup(e))
}

(setInterval (()=> {
}), app.fps)