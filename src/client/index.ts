interface Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | any;
}

class Application implements Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | any;
  private _width: number;
  private _height: number;
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) {
    this.canvas = canvas;
    this.context = context;
  }
  public setUpView(
    width: number, height: number,
    context: CanvasRenderingContext2D, color: string,
    hide: boolean, smooth: boolean = false) {
    this._settingCanvasSize(width, height);
    this._backgroundColor(color);
    this._hideMenuHandler(hide);
    this._isImageSmoothing(context, smooth);
  }
  private _settingCanvasSize(width: number, height: number) {
      this.canvas.width = width
      this.canvas.height = height;
      this.context.width = width;
      this.context.height = height;
  }
  public clearAll() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.beginPath();
  }
  private _backgroundColor(color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
  }
  private _hideMenuHandler(bool: boolean) {
    document.addEventListener("contextmenu", () => bool);
    document.addEventListener("MSHoldVisal", () => bool);
  }
  private _isImageSmoothing(context: CanvasRenderingContext2D, bool: boolean) {
    context.imageSmoothingEnabled = bool;
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

let eventStack: PointerEvent[] = [];

class Tools {
  // ----- DOM要素 -----
  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  pointerEventHandler: boolean;
  // ----- ツール関連プロパティ
  canvasColor: string | number = "#000";
  drawToggle: boolean;
  eraserToggle: boolean;
  pressureToggle: boolean;
  // ----- Pinch/Zoom用プロパティ -----
  pinchDist: number;
  basePoint:PointerEvent;
  nowX: number;
  nowY: number;
  nowR: number;   // 現在の拡大率
  nowScale: number;
  p1: PointerEvent; // 最初に触れた指
  p2: PointerEvent; // 次に触れた指
  dist: number;
  private zoomInvrease: number = 1
  // ----- PenSize用プロパティ -----
  defRad: number = 10;
  penRadius: number;
  dx: number = 0
  dy: number = 0
  distX: number // 横からの距離
  distY: number // 上からの距離
  lx: number = void 0;
  ly: number = void 0;
  capStyle: string = "round"

  constructor(element: HTMLCanvasElement, context?: CanvasRenderingContext2D) {
    this.element = element;
    this.context = context;
    this.eventActivation();
  }
  public eventActivation() {
    if (this._supportPointerEvent) {
      document.addEventListener("pointerdown",event => this.downPointerHandler(event),{ passive: false });
      document.addEventListener("pointerup",event => this.upPointerHandler(event),{ passive: false });
      document.addEventListener("pointermove",event => this.movePointerHandler(event),{ passive: false });
      document.addEventListener("pointerleave",event => this.leavePointerHandler(event),{ passive: false });
    } else {
      document.addEventListener("pointerdown", event =>this.downMouseHandler(event));
      document.addEventListener("pointerup", event =>this.upMouseHandler(event));
      document.addEventListener("pointermove", event =>this.moveMouseHandler(event));
      document.addEventListener("pointerleave", event =>this.leaveMouseHandler(event))}
  }
  // ---- PointerEvents ----
  public downPointerHandler(event: PointerEvent) {
    event.preventDefault();
    this.drawToggle = true;
    eventStack.push(event);

    if (eventStack.length <= 1) {
      this.p1 = eventStack[0];
    } else if (eventStack.length >= 2) {
      this.p1 = eventStack[0];
      this.p2 = eventStack[1];
      this.pinchDist = this._calclationPointsDistance(this.p1.pageX, this.p1.pageY, this.p2.pageX, this.p2.pageY)
      this.nowR = this.dist / this.pinchDist
      console.log('down: '+this.nowR)

    }
  }
  public movePointerHandler(event: PointerEvent) {
    this.pointerSwitcher(event, {
      pen: this.handlePenMove(event),
      touch: this.handleTouchMove(event),
      mouse: this.handleMouseMove(event)
    });
  }
  public pointerSwitcher(
    event: PointerEvent,
    functionObject: { pen: void; touch: void; mouse: void }
  ) {
    switch (event.pointerType) {
      case "pen":
        functionObject.pen;
        break;
      case "touch":
        functionObject.touch;
        break;
      case "mouse":
        functionObject.mouse;
        break;
    }
  }
  public upPointerHandler(event: PointerEvent) {
    this.drawToggle = false;
    //@ts-ignore
    this.context.beginPath();
    this._removeEventStack(event);
    console.log('up: '+this.nowR)
  }
  public leavePointerHandler(event: PointerEvent) {
    this.drawToggle = false;
  }

  // ---- MouseEvents ----
  public downMouseHandler(event: MouseEvent) {
    this.drawToggle = true;
  }
  public moveMouseHandler(event: MouseEvent) {
    this.handleMouseMove(event);
  }
  public upMouseHandler(event: MouseEvent) {
    this.drawToggle = false;
    //@ts-ignore
    this.context.beginPath();
  }
  public leaveMouseHandler(event: MouseEvent) {
    this.drawToggle = false;
  }

  // ----- moveHandler分岐処理 -----
  //  ペン用moveHandler
  public handlePenMove(event: PointerEvent) {
    event.preventDefault();
    if (this.drawToggle) {this.penPencilTool(event);}
  }
  // マウス用moveHandler
  public handleMouseMove(event: PointerEvent | MouseEvent) {
    if (this.drawToggle) {this.mousePencilTool(event);}
  }
  // タッチ用moveHandler
  public handleTouchMove(event: PointerEvent) {
    event.preventDefault();
    for (let i = 0; i < eventStack.length; i++) {
      if (eventStack[i].pointerId == event.pointerId) {
        eventStack[i] = event;
      }
    }


    if (eventStack.length > 3) {
      eventStack.splice(0, 3);
    }
    this.p1 = eventStack[0];
    this.p2 = eventStack[1];
    if (this.drawToggle) {this.touchPencilTool(eventStack[0])}

    if (eventStack.length >= 2) {
      this.drawToggle = false;
      this.dx = (this.p1.pageX + this.p2.pageX) / 2;
      this.dy = (this.p1.pageY + this.p2.pageY) / 2;
      console.log('dx:'+this.dx+'dy'+this.dy)

      this.dist = this._calclationPointsDistance(this.p1.pageX, this.p1.pageY, this.p2.pageX, this.p2.pageY)
      this.nowR = this.dist / this.pinchDist
      console.log('nowR:'+this.nowR)
    }
    this._pinchHandle(this.dist / this.pinchDist);
  }

  // ---- PencilTools ----
  // マウス用PencilTool
  public mousePencilTool(event: MouseEvent | PointerEvent) {
    //Context2D初期化
    //@ts-ignore
    let a: any = this.context;
    //消しゴムトグル
    this.eraseTool(a)

    this.settingPenConf(a, this.canvasColor, this.capStyle);
    this.drawLine(a, event);
  }

  // ペン用PencilTool
  public penPencilTool(event: PointerEvent) {
    //Context2D初期化
    //@ts-ignore
    let a: any = this.context;
    //消しゴムトグル
    this.eraseTool(a);
    a.lineWidth = this._activatePressure(event);
    this.settingPenConf(a, this.canvasColor, this.capStyle);
    this.drawLine(a, event);
  }

  private settingPenConf(context: any, color: string | number, capStyle: string) {
    context.strokeStyle = color
    context.fillStyle = color
    context.lineCap = capStyle
  }

  // タッチ用PencilTool
  public touchPencilTool(event: PointerEvent) {
    //Context2D初期化
    //@ts-ignore
    let a: any = this.context;
    //消しゴムトグル
    this.eraseTool(a);
    a.lineWidth = this.penRadius;
    this.settingPenConf(a, this.canvasColor, this.capStyle);

    this.drawLine(a, event);
  }

  private drawLine(a: any, event: PointerEvent | MouseEvent) {
    a.lineTo(event.offsetX, event.offsetY);
    a.stroke();
    a.beginPath();
    a.moveTo(event.offsetX, event.offsetY);
  }

  private eraseTool(a: any) {
    this.eraserToggle
      ? (a.globalCompositeOperation = "destination-out")
      : (a.globalCompositeOperation = "source-over");
  }

  public setPencilColor(color: string | number) {
    this.canvasColor = color;
  }
  public getNowR() {
    return this.nowR;
  }
  private _calclationPointsDistance(p1x: number, p1y: number, p2x: number, p2y: number){
    let X = Math.abs(p1x) - Math.abs(p2x)
    let Y = Math.abs(p1y) - Math.abs(p2y)
    return Math.sqrt(X*X+Y*Y)/2
  }

  // 筆圧に対応していた場合値を返す
  private _activatePressure(event: PointerEvent) {
    let Rad = this.defRad;
    if (event.pressure < 0.995 || event.pressure > 0.05) {
      event.pressure ? (Rad *= event.pressure) : (Rad /= event.pressure);
      return Rad;
    } else if (event.pressure <= 0.05 || event.pressure > 0.01) {
      return 0.05;
    } else {
      return;
    }
  }
  //タッチイベントをスタックから削除
  private _removeEventStack(event: PointerEvent) {
    for (let i = 0; i < eventStack.length; i++) {
      if (eventStack[i].pointerId == event.pointerId) {
        eventStack.splice(i, 1);
      }
    }
  }
  // ピンチズーム処理
  private _pinchHandle(nowScalse: number) {
    let style = document.getElementById("canvas").style;
		let scale = `scale(${this.nowR},${this.nowR})`;
		console.log(this.nowR + ':' + this.nowScale)
    style.left = this.distX + "px";
    style.top = this.distY + "px";
    style.transform = scale;
    style.webkitTransform = scale;
  }
  private _supportPointerEvent() {
    return window.PointerEvent ? true : false;
  }
  private _puressurePoints(event: PointerEvent) {
    return {
      x: event.offsetX,
      y: event.offsetY,
      pressurevent: Math.sin(event.pressure)
    };
  }

  // ----- 画面上にデバッグ情報が流れる
  private _debugLogger(message: string | number) {
    if (document.getElementById("debug")) {
      document
        .getElementById("debug")
        .insertAdjacentHTML("afterbegin", message + "<br>");
    } else {
      let el = document.createElement("div");
      el.id = "debug";
      el.insertAdjacentHTML("afterbegin", message + "<br>");
    }
  }
}
const graph: HTMLCanvasElement = document.querySelector("#canvas");
const c: CanvasRenderingContext2D = graph.getContext("2d");

const app = new Application(graph, c);
const draw = new Tools(graph, c);

// Application.prototype.init
//    (context , backgroundColor, hideMenu, smoothRendering)
app.setUpView(1920, 1080, c, "#ffff", true, false);
