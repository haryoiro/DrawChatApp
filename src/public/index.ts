// import io from "socket.io-client"
import './style.css'
import Buttons from './UI'

const socketOption = {
  reconnectionDelay: 50000,
  transports: ['websocket', 'polling']
}

// const socket = io("http://localhost:5000")
const socket = io("https://app-drawn.herokuapp.com", socketOption)

class Application{
  private _width!: number
  private _height!: number
  protected _dpr: number
  constructor(public canvas: HTMLCanvasElement, public context2D: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context2D = context2D;
    this._dpr = window.devicePixelRatio || 1
  }
  public setUpView(
    width: number,
    height: number,
    color: string,
    hide: boolean = false,
    smooth: boolean = false
  ): void {
    this._settingCanvasSize(width, height);
    this._backgroundColor(color);
    this._hideMenuHandler(hide);
    this._isImageSmoothing(smooth);
  }
  private _settingCanvasSize(width: number, height: number): void {
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.canvas.width = width;
    this.canvas.height = height;
  }
  public clearAll(): void {
    this.context2D.clearRect(0, 0, this.width, this.height);
    this.context2D.beginPath();
  }
  private _backgroundColor(color: string): void {
    this.context2D.fillStyle = color;
    this.context2D.fillRect(0, 0, this.width, this.height);
  }
  private _hideMenuHandler(bool: boolean): void {
    if(bool){
      document.addEventListener('contextmenu', e => e.preventDefault());
      document.addEventListener('MSHoldVisal', e => e.preventDefault());
      document.getElementById('#canvasWrapper')?.addEventListener('contextmenu', (e: any) => e.preventDefault())
      document.getElementById('#canvasWrapper')?.addEventListener('MSHoldVisal', (e: any) => e.preventDefault())
    }
  }
  private _isImageSmoothing(bool: boolean): void {
    this.context2D.imageSmoothingEnabled = bool;
  }
  // *getter/setter Method
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }
}


const eventStack: PointerEvent[] = [];
interface drawPointsObject {
  X: MouseEvent | PointerEvent | number
  Y: MouseEvent | PointerEvent | number
  p: MouseEvent | PointerEvent | number
}
export default class Tools extends Application {
  // ----- ツール関連プロパティ
  canvasColor:  string = "black"
  public drawToggle: boolean = false
  public eraserToggle: boolean  = false
  public pressureToggle: boolean = false
  // ----- Pinch/Zoom用プロパティ -----
  private nowR!: number // 現在の拡大率
  private p1!: PointerEvent; // 最初に触れた指
  private p2!: PointerEvent  // 次に触れた指
  private dx!: number
  private dy!: number

  private dist!: number
  private pinchDist!: number

  private distX!: number // 横からの距離
  private distY!: number // 上からの距離
  private tp1x!: number
  private tp1y!: number
  private zoomX!: number
  private zoomY!: number
  private isScale!: number
  // ----- PenSize用プロパティ -----
  private defRad: number  = 10;
  public penRadius: number = 10
  public eraRadius: number = 10
  private capStyle: CanvasLineCap = 'round'
  private joinStyle: CanvasLineJoin = 'round'
  private scale!: string

  public drawPointObject!: drawPointsObject
  private _pinchToggle: boolean = false

  constructor(element: HTMLCanvasElement, context2D: CanvasRenderingContext2D) {
    super(element, context2D);
    this.eventActivation();
  }
  public eventActivation(): void {
    if (window.PointerEvent) {
      this.canvas.addEventListener('pointerdown', (event): void => {event.preventDefault();this.downPointerController(event)}, {passive: false,});
      this.canvas.addEventListener('pointerup', (event): void=> {event.preventDefault();this.upPointerController(event)}, {passive: false,});
      this.canvas.addEventListener('pointermove', (event): void => {event.preventDefault();this.movePointerController(event)}, {passive: false,});
      this.canvas.addEventListener('pointercancel',  (event): void => {event.preventDefault();this.leavePointerHandler(event)}, {passive: false,});
      document.addEventListener('wheel', (event) => {
        event.preventDefault();
        if(isNaN(this.nowR)){this.nowR = 1}
        if(event.deltaY > 1){
          this.nowR -= 0.2
        } else if(event.deltaY < -1){
          this.nowR += 0.2
        }
        this.zoomX = event.pageX
        this.zoomY = event.pageY
        this._pinchHandle(event)

      }, {passive: false,})
      document.addEventListener('pointerleave', event => this.leavePointerHandler(event), {
        passive: false,
      });
      document.addEventListener('pointerout',  (event): void => this.leavePointerHandler(event), {passive: false,});
    } else {
      this.canvas.addEventListener('mousedown',  (event): void => this.downMouseHandler(event));
      this.canvas.addEventListener('mouseup',  (event): void => this.upMouseHandler(event));
      this.canvas.addEventListener('mousemove',  (event): void => this.moveMouseHandler(event));
      this.canvas.addEventListener('mouseleave',  (event): void => this.leaveMouseHandler(event));
    }
  }
  public pointerSwitcher(event: PointerEvent, pen: void, touch: void, mouse: void): void {
    switch (event.pointerType) {
      case 'pen':
        pen;
        break;
      case 'touch':
        touch;
        break;
      case 'mouse':
        mouse;
        break;
    }
  }
  // ---- PointerEvents ---
  // !------ Switcher ------
  // *- Main Callback Functions -
  public downPointerController(event: PointerEvent): void {
    event.preventDefault()
    this.pointerSwitcher(
      event,
      this.handlePenDown(event),
      this.handleTouchDown(event),
      this.handleMouseDown(event),
    );
  }
  public movePointerController(event: PointerEvent): void {
    event.preventDefault()
    this.pointerSwitcher(
      event,
      this.handlePenMove(event),
      this.handleTouchMove(event),
      this.handleMouseMove(event),
    );
  }
  public upPointerController(event: PointerEvent): void {
    event.preventDefault();

    if(eventStack){
      this._removeEventStack(event);
    }
    this.drawToggle = false;

    this.emitStack.push({color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle})
    this.emitPoint(this.emitStack)
    this.emitStack = []

    this.context2D.beginPath();
  }
  // ---- PointerEvents ---
  // *------- DOWN -------
  private handlePenDown(event: PointerEvent): void {
    event.preventDefault();
    this.context2D.beginPath();
    this.drawToggle = true;
  }
  private handleTouchDown(event: PointerEvent): void {
    event.preventDefault();
    this.context2D.beginPath();
    eventStack.push(event);
    if (eventStack.length === 1) {
      this.drawToggle = true;
      this.p1 = eventStack[0]
    }
    if (eventStack.length >= 2) {
      this.drawToggle = false
      this.p2 = eventStack[1]
      this.pinchDist = this._calclationPointsDistance(
        this.p1.pageX,
        this.p1.pageY,
        this.p2.pageX,
        this.p2.pageY,
      );

      this.tp1x = (eventStack[0].pageX - this.canvas.offsetLeft)
      this.tp1y = (eventStack[0].pageY - this.canvas.offsetTop)
      this.distX =(eventStack[0].pageX - this.tp1x)
      this.distY =(eventStack[0].pageY - this.tp1y)
      this.nowR = this.dist / this.pinchDist;
    }
  }
  private handleMouseDown(event: PointerEvent): void {
    event.preventDefault();
    this.context2D.beginPath();
    this.drawToggle = true;
  }

  // ---- PointerEvents ---
  // *------- MOVE -------
  public handlePenMove(event: PointerEvent): void {
    event.preventDefault();
    if (this.drawToggle) {
      this.eraseTool()
      this.context2D.lineWidth = this.initializePressure(event)
      this.pencilTool(event);
      this.stackPoint(this._pressurePoints(event, this.initializePressure(event)))
    }
  }
  // *-- MouseMove if PointerEvent
  public handleMouseMove(event: PointerEvent): void {
    event.preventDefault();
    if (this.drawToggle) {
      this.eraseTool()
      this.context2D.lineWidth = this.initializePressure(event)
      this.pencilTool(event);
      this.stackPoint(this._pressurePoints(event, this.initializePressure(event)))
    }
  }
  // *-- TouchMove if PointerEvent
  public handleTouchMove(event: PointerEvent): void {
    event.preventDefault();
    for (let i = 0; i < eventStack.length; i++) {
      if (eventStack[i].pointerId === event.pointerId) {
        eventStack[i] = event;
      }
    }
    if(eventStack.length >= 3){
      this.drawToggle = false
      eventStack.splice(0, 2)
    }
    this.p1 = eventStack[0];
    if (eventStack.length < 1 && this.drawToggle){
      this.eraseTool();
      this.context2D.lineWidth = this.initializePressure(eventStack[0])
      this.pencilTool(eventStack[0])
      this.stackPoint(this._pressurePoints(eventStack[0], this.initializePressure(eventStack[0])))
    }
    if (eventStack.length >= 2) {
      this.p2 = eventStack[1];
      this.drawToggle = false;

      this.dist = this._calclationPointsDistance(
        this.p1.pageX,
        this.p1.pageY,
        this.p2.pageX,
        this.p2.pageY,
      )
      this.nowR = this.dist / this.pinchDist;
      this.distX = (eventStack[0].pageX - this.tp1x)
      this.distY = (eventStack[0].pageY - this.tp1y)
    }
    this._pinchHandle(event);
  }

  // ---- PointerEvents ---
  // *------- LEAVE -------
  public leavePointerHandler(event: PointerEvent): void {
    this.drawToggle = false
    this._removeEventStack(event)
    this.context2D.beginPath();
  }

  // ---- MouseEvents ----
  // *-- LEGACY EVENTS --
  public downMouseHandler(event: MouseEvent): void {
    event.preventDefault()
    this.drawToggle = true;
  }
  public moveMouseHandler(event: MouseEvent): void {
    event.preventDefault()
    if (this.drawToggle) {
      this.eraseTool()
      this.context2D.lineWidth =  this.initializePressure({pressure: 0.5})
      this.pencilTool(event);
      this.stackPoint(this._pressurePoints(event, this.initializePressure({pressure: 0.5})))
    }
  }
  public upMouseHandler(event: MouseEvent): void {
    event.preventDefault()
    this.drawToggle = false;
    this.context2D.beginPath();
  }
  public leaveMouseHandler(event: MouseEvent): void {
    event.preventDefault()
    this.drawToggle = false;
  }

  // ---- PencilTools ----
  public pencilTool(event: MouseEvent): void {
    this.settingPenConf(this.canvasColor, this.capStyle, this.joinStyle);
    this.drawLine(event.offsetX, event.offsetY);
  }

  public settingPenConf(
    color: string,
    capStyle: CanvasLineCap,
    JoinStyle: CanvasLineJoin,
  ): void {
    this.context2D.strokeStyle = color;
    this.context2D.fillStyle = color;
    this.context2D.lineCap = capStyle;
    this.context2D.lineJoin = JoinStyle;
  }

  public drawLine(x: number, y: number): void {
    this.context2D.lineTo(x, y);
    this.context2D.stroke();
    this.context2D.beginPath();
    this.context2D.moveTo(x, y);
  }

  public eraseTool(): void {
    this.eraserToggle
      ? this.context2D.globalCompositeOperation = 'destination-out'
      : this.context2D.globalCompositeOperation = 'source-over'
  }

  public eraOrPenSize():number {
    return this.eraserToggle ? this.eraRadius : this.penRadius
  }
  public setPencilColor(color: string): void {
    this.canvasColor = color;
  }
  private _calclationPointsDistance(x1: number, y1: number, x2: number, y2: number): number {
    const X = x1 - x2;
    const Y = y1 - y2;
    return Math.sqrt(X * X + Y * Y) / 2;
  }

  // 異常な筆圧値を丸める、筆圧によりペンのサイズを漸強/漸弱させる
  public initializePressure(event: PointerEvent | {pressure: number}): number {
    let Rad: number = this.eraOrPenSize()
    if (!this.pressureToggle || event.pressure === null){
      return Rad * 0.5
    } else if (event.pressure < 0.995 && event.pressure > 0.05 && this.pressureToggle) {  // 標準的筆圧の場合は一定の処理
      return event.pressure ? Rad * event.pressure : Rad / event.pressure;
    } else if (event.pressure <= 0.05 && event.pressure > 0.01 && this.pressureToggle) { //  筆圧が弱すぎる場合は最低限の筆圧で処理
      return Rad * 0.05;
    } else if (event.pressure >= 0.995 && this.pressureToggle){  // 筆圧が強すぎる場合最大値の筆圧で処理
      return Rad * 0.995
    } else {
      return Rad
    }
  }

  // タッチイベントをスタックから削除
  private _removeEventStack(event: PointerEvent): void {
    for (let i = 0; i < eventStack.length; i++) {
      if (eventStack[i].pointerId === event.pointerId) {
        eventStack.splice(i, 1);
      }
    }
  }
  // ピンチズーム処理
  private _pinchHandle(event:WheelEvent | PointerEvent): void {
    let style = document.getElementById('canvas')!.style;
    let scale!: string
    if(this.nowR >= 20){
        this.nowR = 10
      }else if(this.nowR <= 0.05){
        this.nowR = 0.05
      }else{
        // style.transformOrigin = `${this.zoomX}px ${this.zoomY}px`
        style.transformOrigin  = `${this.zoomX + 6 + (this.canvas.offsetLeft / 2)}px ${this.zoomY + (this.canvas.offsetTop / 2)}px`
        scale = `scale(${this.nowR})`;
      }
      style.left = this.distX + 'px';
      style.top = this.distY + 'px';
      style.transform = scale;
      style.webkitTransform = scale;
      //@ts-ignore
      style.MozTransform =  scale;
      //@ts-ignore
      style.msTransform= scale;
  }
  private _pressurePoints(event: PointerEvent | MouseEvent, num: number): drawPointsObject{
    return {X: event.offsetX,Y: event.offsetY, p: num}
  }
  // private _simplePoints(event: MouseEvent, num: number): drawPointsObject{
  //   return {X: event.offsetX,Y: event.offsetY, p: num}
  // }
  private abs(number: number){
    return (number * number)/2
  }

  // ---- - UndoRedo -------
  // private STACK_MAX_SIZE: number = 100
  // private undoStack = []
  // private redoStack = []
  private emitStack: any[] = []
  private undoRedo(){

  }
  // ---- - Socket.IO -----

  private stackPoint(pointObj?: drawPointsObject) {
    this.emitStack.push(pointObj)
  }
  private emitPoint(pointObj?: object) {
    socket.emit('point', pointObj)
  }
}

class socketer {
  constructor(){
  }
  public pointerAsync(){
    socket.on('allCanvas', (c: any[]) => {
      for (let o in c){
        let p = c[o]
        view.settingPenConf(p[p.length-1].color, p[p.length-1].cap, p[p.length-1].join);
        p[p.length-1].erase
          ? view.context2D.globalCompositeOperation = 'destination-out'
          : view.context2D.globalCompositeOperation =  'source-over'
      for(let i in p){
        view.context2D.lineWidth = p[i].p
        view.drawLine(p[i].X, p[i].Y)
      }
      view.eraseTool()
      view.context2D.beginPath()
      }
    })

    socket.on('point', (p: any[]) => {
      view.settingPenConf(p[p.length-1].color, p[p.length-1].cap, p[p.length-1].join);
      p[p.length-1].erase
        ? view.context2D.globalCompositeOperation = 'destination-out'
        : view.context2D.globalCompositeOperation =  'source-over'

      console.log(p)
      for (let i in p){
        view.context2D.lineWidth =p[i].p
        view.drawLine(p[i].X, p[i].Y);
      }
      view.eraseTool()
      view.context2D.beginPath()
    })
    socket.on('clear', () => {
      view.context2D.clearRect(0, 0, 1920, 1080)
    })
  }
}
const canvas = <HTMLCanvasElement>document.querySelector('#canvas');
const graphic = <CanvasRenderingContext2D>canvas.getContext('2d');

const view = new Tools(canvas, graphic);

(window.addEventListener('load', () => {
  let myId:string

  // Application.prototype.serUpView
  //    (context , backgroundColor, hideMenu, smoothRendering)
  view.setUpView(1920, 1080, '#ffffff', true, true);


  const socketInit = new socketer()
  socketInit.pointerAsync()


  const domButton = new Buttons(view)
  domButton.elementActivate()

  socket.emit('firstConnect', socket.id)
  socket.on('s_to_c_id', (id: string) => {
    myId = id
    console.log(myId)
  })
}))
