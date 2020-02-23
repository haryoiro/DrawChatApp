interface Canvas {
  canvas: HTMLCanvasElement;
  context2D: CanvasRenderingContext2D | any;
}

class Application implements Canvas {
  canvas: HTMLCanvasElement;
  context2D: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  constructor(canvas: HTMLCanvasElement, context2D: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context2D = context2D;
  }
  public setUpView(
    width: number,
    height: number,
    color: string,
    hide: boolean,
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
    document.addEventListener('contextmenu', () => bool);
    document.addEventListener('MSHoldVisal', () => bool);
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
  X: number
  Y: number
  pressure: number
}
class Tools extends Application {
  // ----- DOM要素 -----
  pointerEventHandler: boolean;
  // ----- ツール関連プロパティ
  canvasColor:  string = "#000"
  drawToggle: boolean;
  eraserToggle: boolean;
  pressureToggle: boolean;
  // ----- Pinch/Zoom用プロパティ -----
  pinchDist: number;
  basePoint: PointerEvent;
  nowX: number;
  nowY: number;
  nowR: number; // 現在の拡大率
  nowScale: number;
  p1: PointerEvent; // 最初に触れた指
  p2: PointerEvent; // 次に触れた指
  dist: number;
  private zoomInvrease = 1;
  // ----- PenSize用プロパティ -----
  defRad = 10;
  penRadius: number;
  dx = 0;
  dy = 0;
  distX: number; // 横からの距離
  distY: number; // 上からの距離
  lx: number = undefined;
  ly: number = undefined;
  capStyle: CanvasLineCap = 'round';
  joinStyle: CanvasLineJoin = 'bevel';

  drawPointObject: drawPointsObject

  constructor(element: HTMLCanvasElement, context2D: CanvasRenderingContext2D | any) {
    super(element, context2D);
    this.eventActivation();
  }
  public eventActivation(): void {
    if (this._supportPointerEvent) {
      document.addEventListener('pointerdown', event => this.downPointerController(event), {
        passive: false,
      });
      document.addEventListener('pointerup', event => this.upPointerController(event), {
        passive: false,
      });
      document.addEventListener('pointermove', event => {
        this.movePointerController(event)
        this.drawPointObject = {X: event.offsetX, Y: event.offsetY, pressure: event.pressure}
        console.log(this.drawPointObject)
      }, {
        passive: false,
      });
      document.addEventListener('pointerleave', () => this.leavePointerHandler(), {
        passive: false,
      });
    } else {
      document.addEventListener('mousedown', () => this.downMouseHandler());
      document.addEventListener('mouseup', () => this.upMouseHandler());
      document.addEventListener('mousemove', event => this.moveMouseHandler(event));
      document.addEventListener('mouseleave', () => this.leaveMouseHandler());
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
    this.pointerSwitcher(
      event,
      this.handlePenDown(event),
      this.handleTouchDown(event),
      this.handleMouseDown(event),
    );
  }
  public movePointerController(event: PointerEvent): void {
    this.pointerSwitcher(
      event,
      this.handlePenMove(event),
      this.handleTouchMove(event),
      this.handleMouseMove(event),
    );
  }
  public upPointerController(event: PointerEvent): void {
    this.pointerSwitcher(
      event,
      this.handlePenUp(),
      this.handleTouchUp(event),
      this.handleMouseUp(),
    );
  }
  // ---- PointerEvents ---
  // *------- DOWN -------
  private handlePenDown(event: PointerEvent): void {
    event.preventDefault();
    this.drawToggle = true;
    this.context2D.lineWidth = this._activatePressure(event)
  }
  private handleTouchDown(event: PointerEvent): void {
    event.preventDefault();
    this.drawToggle = true;
    this.context2D.lineWidth = this._activatePressure(event)
    if (eventStack.length <= 1) {
      this.p1 = eventStack[0];
    } else if (eventStack.length >= 2) {
      this.p1 = eventStack[0];
      this.p2 = eventStack[1];
      this.pinchDist = this._calclationPointsDistance(
        this.p1.pageX,
        this.p1.pageY,
        this.p2.pageX,
        this.p2.pageY,
      );
      this.nowR = this.dist / this.pinchDist;
    }
  }
  private handleMouseDown(event: PointerEvent): void {
    this.drawToggle = true;
    this.context2D.lineWidth = this._activatePressure(event)
  }

  // ---- PointerEvents ---
  // *------- MOVE -------
  public handlePenMove(event: PointerEvent): void {
    event.preventDefault();
    if (this.drawToggle) {
      this.pencilTool(event);
    }
  }
  public handleMouseMove(event: PointerEvent | MouseEvent): void {
    if (this.drawToggle) {
      this.pencilTool(event);
    }
  }
  public handleTouchMove(event: PointerEvent): void {
    event.preventDefault();
    for (let i = 0; i < eventStack.length; i++) {
      if (eventStack[i].pointerId === event.pointerId) {
        eventStack[i] = event;
      }
    }

    if (eventStack.length > 3) {
      eventStack.splice(0, 3);
    }
    this.p1 = eventStack[0];
    this.p2 = eventStack[1];
    if (this.drawToggle) {
      this.pencilTool(eventStack[0]);
    }

    if (eventStack.length >= 2) {
      this.drawToggle = false;
      this.dx = (this.p1.pageX + this.p2.pageX) / 2;
      this.dy = (this.p1.pageY + this.p2.pageY) / 2;

      this.dist = this._calclationPointsDistance(
        this.p1.pageX,
        this.p1.pageY,
        this.p2.pageX,
        this.p2.pageY,
      );
      this.nowR = this.dist / this.pinchDist;
    }
    this._pinchHandle();
  }

  // ---- PointerEvents ---
  // *--------  UP  --------
  private handlePenUp(): void {
    this.drawToggle = false;
    this.context2D.beginPath();
  }
  private handleTouchUp(event: PointerEvent): void {
    this.drawToggle = false;
    // @ts-ignore
    this.context2D.beginPath();
    this._removeEventStack(event);
  }
  private handleMouseUp(): void {
    this.drawToggle = false;
    this.context2D.beginPath();
  }

  // ---- PointerEvents ---
  // *------- LEAVE -------
  public leavePointerHandler(): void {
    this.drawToggle = false;
  }

  // ---- MouseEvents ----
  // *-- LEGACY EVENTS --
  public downMouseHandler(): void {
    this.drawToggle = true;
  }
  public moveMouseHandler(event: MouseEvent): void {
    this.context2D.lineWidth = this.defRad
    this.handleMouseMove(event);
  }
  public upMouseHandler(): void {
    this.drawToggle = false;
    this.context2D.beginPath();
  }
  public leaveMouseHandler(): void {
    this.drawToggle = false;
  }

  // ---- PencilTools ----
  // PencilTool ------- 🖍
  public pencilTool(event: MouseEvent): void {
    this.eraseTool();
    this.settingPenConf(this.canvasColor, this.capStyle, this.joinStyle);
    this.drawLine(this.drawPointObject.X, this.drawPointObject.Y);
    console.log(this.drawPointObject.X, this.drawPointObject.Y)
  }

  private settingPenConf(
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

  private eraseTool(): void {
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
      return 0.05;
    } else {
      return;
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
    const style = document.getElementById('canvas').style;
    const scale = `scale(${this.nowR},${this.nowR})`;
    style.left = this.distX + 'px';
    style.top = this.distY + 'px';
    style.transform = scale;
    style.webkitTransform = scale;
  }
  private _supportPointerEvent(): boolean {
    return window.PointerEvent ? true : false;
  }
  private _puressurePoints(event: PointerEvent): any{
    return {
      Y: event.offsetX,
      X: event.offsetY,
      pressure: event.pressure
    };
  }
  private _simplePoints(event: MouseEvent): object{
    return {
      x: event.offsetX,
      y: event.offsetY
    }
  }

  // ----- 画面上にデバッグ情報が流れる
  private _debugLogger(message: string | number): void {
    if (document.getElementById('debug')) {
      document.getElementById('debug').insertAdjacentHTML('afterbegin', message + '<br>');
    } else {
      const el = document.createElement('div');
      el.id = 'debug';
      el.insertAdjacentHTML('afterbegin', message + '<br>');
    }
  }
}
const graph: HTMLCanvasElement = document.querySelector('#canvas');
const c: CanvasRenderingContext2D = graph.getContext('2d');

const app = new Tools(graph, c);

// Application.prototype.init
//    (context , backgroundColor, hideMenu, smoothRendering)
app.setUpView(1920, 1080, '#ffff', true, false);
