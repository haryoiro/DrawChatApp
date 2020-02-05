const canvas = document.getElementById("canvas");
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
	// 消しゴム判定
  eraserToggle:false,
	// 初期画面サイズ
	w:1024,
	h:768,
	// 履歴用配列
	undoStack:[],
	redoStack:[],
}

function thisPoint(e){
  conf.rect = e.target.getBoundingClientRect();
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
		ctx.lineTo(conf.mx, conf.my);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(conf.mx, conf.my);
	}
}
//ドラッグ開始時
function engage(e) {
  conf.pointToggle = true;
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
	ctx.beginPath()
  conf.pointToggle = true
  conf.pType = e.pointerType
}
// ドラッグ終了
function handleup(e) {
  conf.pointToggle = false;
}
// ポインタータイプに合わせた処理を実行
function handlemove(e) {
  switch (conf.pType) {
    case "mouse":
			conf.pType = "mouse"
			putPoint(e)
      break
    case "touch":
      conf.pType = "touch"
			e.preventDefault()
			putPoint(e)
      break;
    case "pen":
      conf.pType = "pen"
			putPoint(e)
			e.preventDefault()
      break;
  }
}


window.addEventListener('load',(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  initWindow(1024, 768);
  hideMenu(true);

  isImageSmoothingEnabled(ctx, false);

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
