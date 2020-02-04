
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