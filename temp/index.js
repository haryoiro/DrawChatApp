const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
// アンドゥ出来る回数上限
const STACK_MAX_SIZE = 100;

const conf = {
	radius:10,
	// ポインタータイプ
	pType: null,
	rect: null,
	// 現在の座標
	mx: 0,
	my: 0,
	// クリックされているかの判定
	pointToggle: false,
	// 初期画面サイズ
	w:1024,
	h:768,
	// 履歴用配列
	undoStack:[],
	redoStack:[],
  eraserToggle:false,
  eC:[]
}

function thisPoint(e){
  conf.rect = e.target.getBoundingClientRect()
  conf.mx = (e.clientX - Math.floor(conf.rect.left))
  conf.my = (e.clientY - Math.floor(conf.rect.top))
}

// ---- マウスイベント時 ツール関数 ----
// 鉛筆ツール
function putPoint(e) {
  if (conf.eraserToggle){
    ctx.globalCompositeOperation = 'destination-out'
  } else {
    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = '#FF6566'
  }
  if (conf.pointToggle) {
		thisPoint(e)
		ctx.lineTo(conf.mx, conf.my)
		ctx.stroke()
		ctx.beginPath()
    ctx.moveTo(conf.mx, conf.my)
	}
}
//ドラッグ開始時
function engage(e) {
  conf.pointToggle = true
	putPoint(e)
}
//ドラッグ終了時
function disengage() {
	conf.pointToggle = false
}
// 現在の描画範囲をクリア
function clearAllCanvas() {
  ctx.clearRect(0, 0, 1080, 1920);
  ctx.beginPath();
}

// ---- タッチイベント時 ツール関数 ----
// ポインター接触時のポインタータイプを判定
function handledown(e) {
  e.preventDefault()
  conf.pType = e.pointerType
  conf.eC.push(e)
	ctx.beginPath()
  conf.pointToggle = true
}

// ドラッグ終了
function handleup(e) {
  ctx.beginPath()
  conf.pointToggle = false
  remove_event(e)
}
// ポインタータイプに合わせた処理を実行
function handlemove(e) {
  // 格納したイベントの数分イベントを再格納
  for (let i = 0; i < conf.eC.length; i++) {
    if (e.pointerId == conf.eC[i].pointerId) {
      conf.eC[i] = e;
    }	
    if (conf.eraserToggle){
      ctx.globalCompositeOperation = 'destination-out'
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = '#FF6566'
    }
    if (conf.pointToggle) {
      let touch = conf.eC[i]
      let rect = touch.target.getBoundingClientRect()
      let x = conf.eC[0].clientX - Math.floor(rect.left)
      let y = conf.eC[0].clientY - Math.floor(rect.top)
      console.log('page'+touch.pageX + ':' + touch.pageY)
      console.log('client'+touch.clientX+':'+touch.clientY)
      ctx.lineTo(x,y)
      ctx.stroke()
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x,y)
    }
  }
}
function remove_event(e) {
  for (let i = 0; i < eC.length; i++) {
    if (conf.eC[i].pointerId == e.pointerId) {
      conf.eC.splice(i, 1);
      break;
    }
  }
}
window.addEventListener('load',(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  initWindow(1240, 720);
  hideMenu(true);

  isImageSmoothingEnabled(ctx, false);

  ctx.lineCap = 'round'
  // ツール関係, イベントリスナー
  const clear = document.getElementById('clear')
	clear.addEventListener('click', clearAllCanvas)
  const era = document.getElementById('era').addEventListener('click', ()=>{conf.eraserToggle=true})
  const pen = document.getElementById('pen').addEventListener('click', ()=>{conf.eraserToggle=false})
  if (window.PointerEvent) {
    canvas.addEventListener('pointerdown', handledown, { passive: false })
    canvas.addEventListener('pointerup', handleup, { passive: false })
		canvas.addEventListener('pointermove', handlemove, { passive: false })
		canvas.addEventListener('pointerleave', handleup, { passive: false })

  } else {
    canvas.addEventListener('mousedown', engage, { passive: false })
    canvas.addEventListener('mousemove', putPoint, { passive: false })
		canvas.addEventListener('mouseup', disengage, { passive: false })
		canvas.addEventListener('mouseover', disengage, { passive: false })

  }
})())
let colors = ['#FF6566', '#FFD965', '#92D050', '#06C0C5','#7C7AA1','Black','Gray', 'rgb(241, 240, 240)'];

for(let i=0, n=colors.length;i<n;i++){
    let swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = colors[i];
    swatch.addEventListener('click', setSwatch);
    document.getElementById('colors').appendChild(swatch);
}

function setColor(color){
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    var active = document.getElementsByClassName('active')[0];
    if(active){
        active.className = 'swatch';
    }
}

function setSwatch(e){
    let swatch = e.target;
    setColor(swatch.style.backgroundColor);
    swatch.className += ' active';
}

setSwatch({target: document.getElementsByClassName('swatch')[0]});

let radConf ={
    minRad:1,
    maxRad:20,
    defaultRad:1,
    interval:1,
}
let radSpan = document.getElementById('radval'),
    decRad = document.getElementById('decrad').addEventListener('click', function(){setRad(conf.radius-radConf.interval);}),
    incRad = document.getElementById('incrad').addEventListener('click', function(){setRad(conf.radius+radConf.interval);});


function setRad(newRad){
    if(newRad < radConf.minRad){
        newRad = radConf.minRad;
    } else if (newRad > radConf.maxRad){
        newRad = radConf.maxRad
    }
    conf.radius = newRad
    ctx.lineWidth = conf.radius * 2;
    radSpan.innerHTML = conf.radius;
}

setRad(radConf.defaultRad);

// undo-redo
// ペンを走らせると画像を配列に保存する
function stackDlaw() {
  conf.redoStack = []
  if(conf.undoStack.length >= STACK_MAX_SIZE) {conf.undoStack.pop()}
	conf.undoStack.unshift(ctx.getImageData(0, 0, conf.w, conf.h));
	console.log('r' + conf.redoStack + ':' + conf.undoStack)
}

function undo() {
  if (conf.undoStack.length <= 0) {return}
  conf.redoStack.unshift(ctx.getImageData(0, 0, conf.w, conf.h))
  let imageData = conf.undoStack.shift()
	ctx.putImageData(imageData, 0, 0)
	console.log('undo')
}

function redo() {
  if (conf.redoStack.length <= 0) {return}
  conf.undoStack.unshift(ctx.getImageData(0, 0, conf.w, conf.h))
  let imageData = conf.redoStack.shift()
	ctx.putImageData(imageData, 0, 0)
	console.log('redo')
}
(() => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");


  document.getElementById('undo').addEventListener('click', undo)
  document.getElementById('redo').addEventListener('click', redo)

  if (window.PointerEvent) {
    canvas.addEventListener('pointerdown', stackDlaw)
  } else {
    canvas.addEventListener('mouseudown', stackDlaw)
  }
})()

// 右クリックで出てくるメニューを非表示
function hideMenu(bool){
  if(bool){
    document.body.style.overflow = 'hidden'
    document.addEventListener('contextmenu', e => {
      e.preventDefault()
    })
    document.addEventListener('MSHoldVisal', e => {
      e.preventDefault()
    })
  }
}

function isImageSmoothingEnabled(context, bool){
  if(!bool){bool = true}
  context.mozImageSmoothingEnabled = bool;
  context.webkitImageSmoothingEnabled = bool;
  context.msImageSmoothingEnabled = bool
  context.imageSmoothingEnabled = bool
}

function initWindow(w, h){
  conf.w = w
  conf.h = h
	canvas.width = conf.w
  canvas.height = conf.h
}
