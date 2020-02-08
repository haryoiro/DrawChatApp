
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
