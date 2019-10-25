const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// アンドゥ出来る回数上限
const STACK_MAX_SIZE = 100;

let radius = 10,
    // マウス移動の初期化
    dragging = false,
    // imagedataを入れる用
    undoStack = [],
    redoStack = [];
    w = canvas.width = 1920;
    h = canvas.height = 1080;
    ctx.lineWidth = radius * 2;

//ドラッグされると線が引かれる
function putPoint(e) {
    if (dragging) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - Math.floor(rect.left);
        let y = e.clientY - Math.floor(rect.top);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}
//ドラッグ開始時
function engage(e) {
    dragging = true;
    putPoint(e);
}
//ドラッグ終了時
function disengage() {
    dragging = false;
    ctx.beginPath();
}
//キャンバス外
function overcanvas() {
    dragging = false;
    ctx.beginPath();
}
//キャンバスをクリア
function clearImage() {
    const clear = document.getElementById("clear");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    return;
}

canvas.addEventListener("mousedown", engage);
canvas.addEventListener("mousemove", putPoint);
canvas.addEventListener("mouseup", disengage);
canvas.addEventListener("mouseleave", overcanvas);
clear.addEventListener("click", clearImage);
