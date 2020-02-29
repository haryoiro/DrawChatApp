const socket = io.connect('http://localhost:5000')
class Application{
  public canvas: HTMLCanvasElement;
  public context2D: CanvasRenderingContext2D;
  private _width!: number
  private _height!: number
  constructor(canvas: HTMLCanvasElement, context2D: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context2D = context2D;
  }
  public setUpView(
    width: number,
    height: number,
    color: string,
    hide: boolean = false,
    smooth: boolean = false,
  ): void {
    this._settingCanvasSize(width, height);
    this._backgroundColor(color);
    this._hideMenuHandler(hide);
    this._isImageSmoothing(smooth);
  }
  private _settingCanvasSize(width: number, height: number): void {
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
  pressure: MouseEvent | PointerEvent | number
}
class Tools extends Application {
  // ----- ツール関連プロパティ
  canvasColor:  string = "#000"
  private drawToggle: boolean = false
  private eraserToggle: boolean  = false
  private pressureToggle: boolean = false
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
  private isScale!: number
  // ----- PenSize用プロパティ -----
  private defRad = 10;
  private penRadius!: number
  private capStyle: CanvasLineCap = 'round'
  private joinStyle: CanvasLineJoin = 'round';

  public drawPointObject!: drawPointsObject

  constructor(element: HTMLCanvasElement, context2D: CanvasRenderingContext2D | any) {
    super(element, context2D);
    this.eventActivation();
  }
  public eventActivation(): void {
    if (window.PointerEvent) {
      this.canvas.addEventListener('pointerdown', event => this.downPointerController(event), {
        passive: false,
      });
      this.canvas.addEventListener('pointerup', event => this.upPointerController(event), {
        passive: false,
      });
      this.canvas.addEventListener('pointermove', event => this.movePointerController(event), {
        passive: false,
      });
      this.canvas.addEventListener('pointercancel', event => this.leavePointerHandler(event), {
        passive: false,
      });
      // this.canvas.addEventListener('pointerleave', event => this.leavePointerHandler(event), {
      //   passive: false,
      // });
      this.canvas.addEventListener('pointerout', event => this.leavePointerHandler(event), {
          passive: false,
      });
    } else {
      this.canvas.addEventListener('mousedown', event => this.downMouseHandler(event));
      this.canvas.addEventListener('mouseup', event => this.upMouseHandler(event));
      this.canvas.addEventListener('mousemove', event => this.moveMouseHandler(event));
      this.canvas.addEventListener('mouseleave', event => this.leaveMouseHandler(event));
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
    event.preventDefault()
    this.pointerSwitcher(
      event,
      this.handlePenUp(event),
      this.handleTouchUp(event),
      this.handleMouseUp(event),
    );
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
      this.context2D.lineWidth = this._activatePressure(event)
      this.pencilTool(event);
      this.stackPoint(this._puressurePoints(event))
    }
  }
  public handleMouseMove(event: PointerEvent): void {
    event.preventDefault();
    if (this.drawToggle) {
      this.context2D.lineWidth = this._activatePressure(event)
      this.pencilTool(event);
      this.stackPoint(this._simplePoints(event))
    }
  }
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
      this.context2D.lineWidth = this._activatePressure(event)
      this.eraseTool();
      this.settingPenConf(this.canvasColor, this.capStyle, this.joinStyle);
      this.drawLine(event.offsetX, event.offsetY);
      this.stackPoint(this._simplePoints(event))
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
    this._pinchHandle();
  }

  // ---- PointerEvents ---
  // *--------  UP  --------
  private handlePenUp(event: PointerEvent): void {
    event.preventDefault();
    this.drawToggle = false;
    this.emitStack.push({color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle})
    this.emitPoint(this.emitStack)
    this.emitStack = []
    this.context2D.beginPath();
  }
  private handleTouchUp(event: PointerEvent): void {
    event.preventDefault();
    this.drawToggle = false;
    this.emitStack.push({color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle})
    this.emitPoint(this.emitStack)
    this.emitStack = []
    this.context2D.beginPath();
    this._removeEventStack(event);
  }
  private handleMouseUp(event: PointerEvent): void {
    event.preventDefault();
    this.drawToggle = false;
    this.emitStack.push({color: this.canvasColor, cap: this.capStyle, join: this.joinStyle, erase: this.eraserToggle})
    this.emitPoint(this.emitStack)
    this.emitStack = []
    this.context2D.beginPath();
  }

  // ---- PointerEvents ---
  // *------- LEAVE -------
  public leavePointerHandler(event: PointerEvent): void {
    event.preventDefault()
    this.context2D.beginPath();
    this.drawToggle = false;
  }

  // ---- MouseEvents ----
  // *-- LEGACY EVENTS --
  public downMouseHandler(event: MouseEvent): void {
    event.preventDefault()
    this.drawToggle = true;
  }
  public moveMouseHandler(event: MouseEvent): void {
    event.preventDefault
    if (this.drawToggle) {
      this.context2D.lineWidth =  this.defRad * 0.5
      this.pencilTool(event);
      this.stackPoint(this._simplePoints(event))
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
    this.eraseTool();
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
      ? (this.context2D.globalCompositeOperation = 'destination-out')
      : (this.context2D.globalCompositeOperation = 'source-over');
  }
  public setPencilColor(color: string): void {
    this.canvasColor = color;
  }
  private _calclationPointsDistance(p1x: number, p1y: number, p2x: number, p2y: number): number {
    const X = p1x - p2x;
    const Y = p1y - p2y;
    return Math.sqrt(X * X + Y * Y) / 2;
  }

  // 筆圧に対応していた場合値を返す
  private _activatePressure(event: PointerEvent): number {
    let Rad = this.defRad;
    if (event.pressure < 0.995 || event.pressure > 0.05) {
      event.pressure ? (Rad *= event.pressure) : (Rad /= event.pressure);
      return Rad;
    } else if (event.pressure <= 0.05 || event.pressure > 0.01) {
      return Rad *= 0.05;
    } else if (event.pressure >= 0.995){
      return Rad *= 0.995
    }
  }
  public initializePressure(event: {pressure: number}): number {
    let Rad = this.defRad;
    if (event.pressure < 0.995 || event.pressure > 0.05) {
      event.pressure ? (Rad *= event.pressure) : (Rad /= event.pressure);
      return Rad;
    } else if (event.pressure <= 0.05 || event.pressure > 0.01) {
      return Rad *= 0.05;
    } else if (event.pressure >= 0.995){
      return Rad *= 0.995
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
  private _pinchHandle(): void {
    const style = document.getElementById('canvas')!.style;
    const scale = `scale(${this.nowR},${this.nowR})`;

    style.left = this.distX + 'px';
    style.top = this.distY + 'px';
    style.transform = scale;
    style.webkitTransform = scale;
    //@ts-ignore
    style.MozTransform =  scale;
    //@ts-ignore
    style.msTransform= scale;
    style.transition = 'initial'
  }
  private _puressurePoints(event: PointerEvent): drawPointsObject{
    return {X: event.offsetX,Y: event.offsetY,pressure: event.pressure}
  }
  private _simplePoints(event: MouseEvent): drawPointsObject{
    return {X: event.offsetX,Y: event.offsetY,pressure: null}
  }


  // ---- - UndoRedo -------
  private STACK_MAX_SIZE: number = 100
  private undoStack = []
  private redoStack = []
  private emitStack = []
  private undoRedo(){

  }
  // ---- - Socket.IO -----

  private stackPoint(pointObj: drawPointsObject) {
    this.emitStack.push(pointObj)
  }
  private emitPoint(pointObj: object) {
    socket.emit('point', pointObj)
  }
}


const graph: HTMLCanvasElement = document.querySelector('#canvas');
const c: CanvasRenderingContext2D = graph.getContext('2d');

const view = new Tools(graph, c);


// Application.prototype.serUpView
//    (context , backgroundColor, hideMenu, smoothRendering)
view.setUpView(1920, 1080, '#ffffff', true, false);
socket.on('point', points => {
  view.context2D.beginPath()
  view.settingPenConf(points[points.length-1].color, points[points.length-1].cap, points[points.length-1].join);
  if (points[points.length-1].erase){
    view.context2D.globalCompositeOperation = 'destination-out'
  }
  for(let item in points){
    view.context2D.lineWidth = view.initializePressure(points[item])
    view.drawLine(points[item].X, points[item].Y);
  }
    view.eraseTool()
})