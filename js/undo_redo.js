document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);


function beforDlaw() {
  redoStack = [];
  if(undoStack.length >= STACK_MAX_SIZE){
    undoStack.pop();
  }
  undoStack.unshift(ctx.getImageData(0, 0, w, h));
  console.log(undoStack);
}

function undo() {
  // undoのデータ数が0以下ならreturn
  if (undoStack.length <= 0) {
    return;
  }
  // redoStackにキャンバスの状態を保存し配列をunshift
  redoStack.unshift(ctx.getImageData(0, 0, w, h));
  // imageDataにundoStackの配列の左端を代入及び削除(shift)
  let imageData = undoStack.shift();
  // imageDataの状態をキャンバスに描画
  ctx.putImageData(imageData, 0, 0);
}

function redo() {
  if (redoStack.length <= 0) {
    return;
  }
  undoStack.unshift(ctx.getImageData(0, 0, w, h));
  
  let imageData = redoStack.shift();
  ctx.putImageData(imageData, 0, 0);
}

canvas.addEventListener('mousedown',beforDlaw);