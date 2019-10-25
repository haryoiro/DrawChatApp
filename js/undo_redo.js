document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);

// ペンを走らせると画像を配列に保存する
function beforDlaw() {
  redoStack = [];
  if(undoStack.length >= STACK_MAX_SIZE){
    undoStack.pop();
  } 
  undoStack.unshift(ctx.getImageData(0, 0, w, h));
}

function undo() {
  // やり直しデータがなかった場合何もしない
  if (undoStack.length <= 0) {
    return;
  }
  // 現在のイメージを保存
  redoStack.unshift(ctx.getImageData(0, 0, w, h));
  // 古いイメージを削除
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
