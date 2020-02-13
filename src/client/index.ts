class Application {
  canvas: HTMLCanvasElement
  width: number
  height: number
  ctx: any
  fps: number
  rect: ClientRect
  constructor( canvas: string, width: number, height: number ){
    this.width = width
    this.height = height
    this.canvas = document.querySelector(canvas)
    this.ctx =   this.canvas.getContext('2d')
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
  public createCanvas(){
    return this.canvas
  }
  public createGraphics(){
    return this.ctx
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
  pointerEventHandler: boolean
  drawToggle: boolean
  x: number
  y: number
  constructor(element: HTMLCanvasElement, context: CanvasRenderingContext2D){
    this.x
    this.y
    this.element = element
    this.ctx = context
  }
  public thisPoints(event: MouseEvent, rect: ClientRect){
    this.x =  Math.floor(event.clientX - rect.left)
    this.y =  Math.floor(event.clientY - rect.top)
  }
  public mousePoints(){
    return {x: this.x, y: this.y}
  }
  public harvestPoints(event: MouseEvent, rect: ClientRect, callback: FunctionStringCallback){
    this.thisPoints(event, rect)
    let tmp: any = this.mousePoints()
    return callback(tmp)
  }
}

class Tools extends DrawEvents {
  constructor(element: HTMLCanvasElement, context: CanvasRenderingContext2D){
    super(element, context)
    this.element = element
    this.ctx = context
  }
  public handledown(e: PointerEvent){
    this.drawToggle = true
    e.preventDefault()
  }
  public handleup(e: PointerEvent){
    this.drawToggle = false
    this.ctx.beginPath()
  }
  public handlemove(e: PointerEvent){
    if(this.drawToggle){

    }
  }
}

let app = new Application('#canvas', 720, 1080)
let graph = app.createCanvas()
let c = app.createGraphics()

let DrawEvent = new DrawEvents(graph, c)

app.init(c, "#0999", true, false)
app.clearInterval(33)
c.beginPath()


if(window.PointerEvent){
  let draw = new Tools(graph, c)
    graph.addEventListener('pointermove', (e)=>{
      draw.harvestPoints(e, app.rect, (p) => {console.log(p)})
    })

    graph.addEventListener('pointerdown', draw.handledown, { passive: false })
    graph.addEventListener('pointerup',   draw.handleup, { passive: false })
		graph.addEventListener('pointermove', draw.handlemove, { passive: false })
		graph.addEventListener('pointerleave',draw.handleup, { passive: false })
} else {
    graph.addEventListener('mousemove',(e)=>{
      DrawEvent.thisPoints(e, app.rect)
      console.log(DrawEvent.mousePoints())
    })

    graph.addEventListener('mousedown', engage)
    graph.addEventListener('mousemove', putPoint)
		graph.addEventListener('mouseup',   disengage)
		graph.addEventListener('mouseover', disengage)
}

(setInterval (()=> {
}), app.fps)