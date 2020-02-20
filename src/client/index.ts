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
  public getRect(){
    return this.rect = this.canvas.getBoundingRect()
  }
  private canvasSize(){
    if(this.width || this.height){
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx.width = this.width
    this.ctx.height= this.height
    }
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
      document.addEventListener('contextmenu', e => {e.preventDefault()})
      document.addEventListener('MSHoldVisal', e => {e.preventDefault()})
    }
  }
  private isImageSmoothing(context: CanvasRenderingContext2D, bool: boolean){
    if(!bool){bool = true}
    context.mozImageSmoothingEnabled = bool
    context.webkitImageSmoothingEnabled = bool
    context.msImageSmoothingEnabled = bool
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

  public thisPoints(e: MouseEvent, rect: ClientRect){
     
    this.x =  e.clientX - Math.floor(rect.left)
    this.y =  e.clientY - Math.floor(rect.top)
  }
  public mousePoints(){
    return {x: this.x, y: this.y}
  }
  public harvestPoints(e: MouseEvent, rect: ClientRect){
    this.thisPoints(e, rect)
    return this.mousePoints()
  }
}

let eventStack: PointerEvent[] = []
class Tools {
  // ----- DOM要素 -----
  element: HTMLCanvasElement
  context: CanvasRenderingContext2D
  pointerEventHandler: boolean
  // ----- ツール関連プロパティ
  canvasColor: string
  drawToggle: boolean
  eraserToggle: boolean
  pressureToggle: boolean
  // ----- Pinch/Zoom用プロパティ -----
  pinchHandler: any
  baseX: any
  baseY: any
  nowX: any
  nowY: any
  nowR: any
  p1: number
  p2: number
  dist: number
  // ----- PenSize用プロパティ -----
  defRad: number
  penRadius: number
  dx: number = 0
  dy: number = 0
  distX: number = 0
  distY: number = 0
  lx: number = 0
  ly: number = 0
  
  constructor(element: HTMLCanvasElement, context?: CanvasRenderingContext2D){
    this.element = element
    this.context = this.element.getContext('2d')
    this.defRad = 10
  }
  
  
  // ポインターイベント用
  public pencilTool(e:PointerEvent){
    //Context2D初期化
    //@ts-ignore
    let a:any = this.context 
    //消しゴムトグル
    this.eraserToggle ? a.globalCompositeOperation = 'destination-out'
                      : a.globalCompositeOperation = 'source-over'
    this.defRad = 10
    a.lineWidth = this.activatePressure(e)
   
    
    a.strokeStyle = this.canvasColor
    a.fillStyle =   this.canvasColor
    a.lineCap = 'round'

    a.lineTo(e.offsetX ,e.offsetY)
    a.stroke()
    a.beginPath()
    a.moveTo(e.offsetX, e.offsetY)
  }
  
  // 現在の座標を取得
  // イベントを配列に格納
  public handledown(e: PointerEvent){
    e.preventDefault()
    this.drawToggle = true
    this.nowX
    this.nowY
    eventStack.push(e)

    if(eventStack.length <= 1){  
      this.baseX = eventStack[0].pageX
      this.baseY = eventStack[0].pageY
    } else if(eventStack.length >= 2){
      this.p1 = eventStack[0]
      this.p2 = eventStack[1]
      this.pinchHandler = Math.abs(this.p1.pageX - this.p2.pageX) + Math.abs(this.p1.pageY - this.p2.pageY)
    }
  }  
  public handlemove(e: PointerEvent){
    //touch
    console.log(e.pointerType)
    switch(e.pointerType){
      case 'pen':
        this.handlePenMove(e)
        break;
      case 'touch':
        this.handleTouchMove(e)
        break;
      case 'mouse':
        this.handleMouseMove(e)
        break;
    }
  }
  public handleup(e: PointerEvent){
    this.drawToggle = false
    //@ts-ignore
    this.context.beginPath()
    this.removeEventStack(e)
  }
  public handleleave(e: PointerEvent){
    this.drawToggle = false
  }
  
  // ----- moveHandler分岐処理 -----
  //  ペン
  public handlePenMove(e: PointerEvent){
    e.preventDefault()
    if(this.drawToggle){
      this.pencilTool(e)
    }
  }
  // マウス
  public handleMouseMouse(e: PointerEvent){
    if(this.drawToggle){
      this.pencilTool(e)
    }
  }
  // タッチ
  public handleTouchMove(e: PointerEvent){
    e.preventDefault()
    for (let i = 0; i < eventStack.length; i++) {
      if (eventStack[i].pointerId == e.pointerId) {                   
        eventStack[i] = e
      }
    }
    console.log('point: ',eventStack.length)
    if(eventStack.length > 3){
      eventStack.splice(0,3)
    }
  
    this.p1 = eventStack[0]
    this.p2 = eventStack[1]

    if(this.drawToggle){
      this.pencilTool(eventStack[0])
    }
    
    if(eventStack.length <= 1){

    } else if(eventStack.length >= 2) {
      this.drawToggle = false    
      
      
      this.lx = this.lx
      this.ly = this.ly
      this.dx = (this.p1.pageX + this.p2.pageX)/2
      this.dy = (this.p1.pageY + this.p2.pageY)/2
      
      this.distX = Math.abs(this.lx - this.dx)
      this.distY = Math.abs(this.ly - this.dy)
      console.log(this.distX,this.distY)
      
      this.dist = Math.abs(this.p1.pageX - this.p2.pageX) + Math.abs(this.p1.pageY - this.p2.pageY)
      this.nowR = this.dist / this.pinchHandler
    }
    this.pinchHandle()
  }

  private puressurePoints(e: PointerEvent){
    return {x: e.offsetX, y: e.offsetY, pressure: Math.sin(e.pressure)}
  }
  private removeEventStack(e: PointerEvent){
    for(let i = 0;i < eventStack.length; i++){
      if(eventStack[i].pointerId == e.pointerId){
        eventStack.splice(i, 1)
      }
    }
  }  

  // マウスイベント
  public mousePencilTool(e: MouseEvent){
    //Context2D初期化
    //@ts-ignore
    let a:any = this.context
    //消しゴムトグル
    this.eraserToggle ? a.globalCompositeOperation = 'destination-out'
                      : a.globalCompositeOperation = 'source-over'

    // 現在のポインター座標を取得
    // {x: number, y: number}
    let obj: {[s: string]: number} = DrawEvent.harvestPoints(e, app.rect)
    
    a.strokeStyle = this.canvasColor
    a.fillStyle =   this.canvasColor
    a.lineCap = 'round'
    
    a.lineTo(e.offsetX, e.offsetY)
    a.stroke()
    a.beginPath()
    a.moveTo(e.offsetX, e.offsetY)
  }
  public handlemousedown(e: MouseEvent){
    this.drawToggle = true
  }
  public handlemouseup(e: MouseEvent){
    this.drawToggle = false
    //@ts-ignore
    let a:any = this.context
    a.beginPath()
  }
  public handlemousemove(e: MouseEvent){
    if(this.drawToggle){
      this.mousePencilTool(e)
    }
  }
  public setPencilColor(color: string){
    this.canvasColor = color
  }
  public pinchHandle(){
    let style = document.getElementById('canvas').style
    let scale = `scale(${this.nowR},${this.nowR})`
    style.left = this.distX + 'px'
    style.top = this.distY + 'px'
    style.transform = scale
    style.webkitTransform = scale
    this.p1   = 0
    this.p2   = 0
    this.dist = 0
  }
  public getNowR(){
    return this.nowR
  }
  private activatePressure(e: PointerEvent){
    let Rad = this.defRad
    if (e.pressure){
        console.log(e.pressure)
        e.pressure ? Rad *= Math.sin(e.pressure)
                   : Rad /= Math.sin(e.pressure)
      return Rad
    } 
    else {  return Rad}
  }
}

const graph: HTMLCanvasElement = document.querySelector('#canvas')
const c: CanvasRenderingContext2D = graph.getContext('2d')

const app = new Application(graph, c, 1080, 720)
// app.prototype.init (context , backgroundColor, hidemenu, smoothRendering)
app.init(c, "#ffff", true, false)
const DrawEvent = new DrawEvents(graph, c)
const draw = new Tools(graph, c)
c.beginPath()

if(window.PointerEvent){
  document.addEventListener('pointerdown',  e=>draw.handledown(e) ,{ passive: false})
  document.addEventListener('pointerup',    e=>draw.handleup(e)   ,{ passive: false})
  document.addEventListener('pointermove',  e=>draw.handlemove(e) ,{ passive: false})
  document.addEventListener('pointerleave', e=>draw.handleleave(e),{ passive: false})
} else {
    graph.addEventListener('mousedown', e=>draw.handlemousedown(e)) 
    graph.addEventListener('mousemove', e=>draw.handlemouseup(e))
    graph.addEventListener('mouseup',   e=>draw.handlemousemove(e))
    graph.addEventListener('mouseover', e=>draw.handlemouseup(e))
}

// ----- 画面上にデバッグ情報が流れる
function debug(str: string){
 document.getElementById('debug').insertAdjacentHTML('afterbegin',str+'<br>')
}

// ----- 要らなくなったかも -----
// 挙動がおかしくなったときeventStack内を初期化
// 連続で指が三本触れた時、removeEventが追いつかなくて前回格納されたイベントがそのまま配列内に残ってしまっ
// eventStackのレングスが3以上になった場合  先の3を削除する事で対応
document.getElementById('debunB').addEventListener('click', ():void=>{
  eventStack.splice(0,10)
  c.beginPath()
})

document.getElementById('clear').addEventListener('click', ():void=>{
  app.clearAll()
})
