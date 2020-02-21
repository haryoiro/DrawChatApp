interface Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | any;
}

class Application implements Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | any;
  width: number;
  height: number;
  rect: ClientRect;
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = context;
    this.rect = this.canvas.getBoundingClientRect();
  }
  public init(
    context: CanvasRenderingContext2D,
    color: string,
    hide: boolean,
    smooth: boolean = false
  ) {
    this.canvasSize();
    this.backgroundColor(color);
    this.hideMenuHandler(hide);
    this._isImageSmoothing(context, smooth);
  }
  public getRect() {
    //@ts-ignore
    return (this.rect = this.canvas.getBoundingRect());
  }
  private canvasSize() {
    if (this.width || this.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.context.width = this.width;
      this.context.height = this.height;
    }
  }
  public clearAll() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.beginPath();
  }
  private backgroundColor(color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
  }
  private hideMenuHandler(bool: boolean) {
    document.addEventListener("contextmenu", () => bool);
    document.addEventListener("MSHoldVisal", () => bool);
  }
  private _isImageSmoothing(context: CanvasRenderingContext2D, bool: boolean) {
    context.imageSmoothingEnabled = bool;
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
  baseX: number;
  baseY: number;
  nowX: number;
  nowY: number;
  nowR: number;
  p1: PointerEvent;
  p2: PointerEvent;
  dist: number;
  // ----- PenSize用プロパティ -----
  defRad: number = 10;
  penRadius: number;
  dx: number = void 0;
  dy: number = void 0;
  distX: number = void 0;
  distY: number = void 0;
  lx: number = void 0;
  ly: number = void 0;
  capStyle: any;

  constructor(element: HTMLCanvasElement, context?: CanvasRenderingContext2D) {
    this.element = element;
    this.context = context;
    this.eventActivation();
  }
  public eventActivation() {
    if (this._supportPointerEvent) {
      document.addEventListener(
        "pointerdown",
        event => this.downPointerHandler(event),
        { passive: false }
      );
      document.addEventListener(
        "pointerup",
        event => this.upPointerHandler(event),
        { passive: false }
      );
      document.addEventListener(
        "pointermove",
        event => this.movePointerHandler(event),
        { passive: false }
      );
      document.addEventListener(
        "pointerleave",
        event => this.leavePointerHandler(event),
        { passive: false }
      );
    } else {
      document.addEventListener("pointerdown", event =>
        this.downMouseHandler(event)
      );
      document.addEventListener("pointerup", event =>
        this.upMouseHandler(event)
      );
      document.addEventListener("pointermove", event =>
        this.moveMouseHandler(event)
      );
      document.addEventListener("pointerleave", event =>
        this.leaveMouseHandler(event)
      );
    }
  }
  // ---- PointerEvents ----
  public downPointerHandler(event: PointerEvent) {
    event.preventDefault();
    this.drawToggle = true;
    eventStack.push(event);

    if (eventStack.length <= 1) {
      this.baseX = eventStack[0].pageX;
      this.baseY = eventStack[0].pageY;
    } else if (eventStack.length >= 2) {
      this.p1 = eventStack[0];
      this.p2 = eventStack[1];
      this.pinchDist =
        Math.abs(this.p1.pageX - this.p2.pageX) +
        Math.abs(this.p1.pageY - this.p2.pageY);
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
    if (this.drawToggle) {
      this.penPencilTool(event);
    }
  }
  // マウス用moveHandler
  public handleMouseMove(event: PointerEvent | MouseEvent) {
    if (this.drawToggle) {
      this.mousePencilTool(event);
    }
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
    if (this.drawToggle) {
      this.touchPencilTool(eventStack[0]);
    }

    if (eventStack.length >= 2) {
      this.drawToggle = false;
      this.lx = this.lx;
      this.ly = this.ly;
      this.dx = (this.p1.pageX + this.p2.pageX) / 2;
      this.dy = (this.p1.pageY + this.p2.pageY) / 2;

      this.distX = Math.abs(this.lx - this.dx);
      this.distY = Math.abs(this.ly - this.dy);

      this.dist =
        Math.abs(this.p1.pageX - this.p2.pageX) +
        Math.abs(this.p1.pageY - this.p2.pageY);
      this.nowR = this.dist / this.pinchDist;
    }
    this._pinchHandle();
  }

  // ---- PencilTools ----
  // マウス用PencilTool
  public mousePencilTool(event: MouseEvent | PointerEvent) {
    //Context2D初期化
    //@ts-ignore
    let a: any = this.context;
    //消しゴムトグル
    this.eraserToggle
      ? (a.globalCompositeOperation = "destination-out")
      : (a.globalCompositeOperation = "source-over");

    a.strokeStyle = this.canvasColor;
    a.fillStyle = this.canvasColor;
    a.lineCap = "round";
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
    this.settingPenConf(a);
    this.drawLine(a, event);
  }

  private settingPenConf(a: any) {
    a.strokeStyle = this.canvasColor;
    a.fillStyle = this.canvasColor;
    a.lineCap = this.capStyle;
  }

  // タッチ用PencilTool
  public touchPencilTool(event: PointerEvent) {
    //Context2D初期化
    //@ts-ignore
    let a: any = this.context;
    //消しゴムトグル
    this.eraseTool(a);
    a.lineWidth = this.penRadius;
    this.settingPenConf(a);

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

  // 筆圧に対応していた場合値を返す
  private _activatePressure(event: PointerEvent) {
    let Rad = this.defRad;
    if (event.pressure < 0.995 || event.pressure > 0.05) {
      event.pressure ? (Rad *= event.pressure) : (Rad /= event.pressure);
      return Rad;
    } else if (event.pressure <= 0.05 || event.pressure > 0.01) {
      return 0.05;
    } else {
      return void 0;
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
  private _pinchHandle() {
    let style = document.getElementById("canvas").style;
    let scale = `scale(${this.nowR},${this.nowR})`;
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

const app = new Application(graph, c, 1920, 1080);
const draw = new Tools(graph, c);

// Application.prototype.init
//    (context , backgroundColor, hideMenu, smoothRendering)
app.init(c, "#ffff", true, false);
