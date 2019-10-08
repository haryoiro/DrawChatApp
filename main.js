const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let radius = 10,
    dragging = false;
canvas.width = 1920;
canvas.height = 1080;
ctx.lineWidth = radius * 2;
ctx.fillStyle = 'rgb(240,240,220)';
ctx.fillRect(0, 0, 1920, 2080);

function putPoint(e){
    if(dragging){
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    }
}

function engage(e){
    dragging = true;
    putPoint(e);
}

function disengage(){
    dragging = false;
    ctx.beginPath();
}

function invalidata(){
    dragging = false;
    ctx.beginPath();
}


function clearImage() {
    let clear = document.getElementById("clear");
    if(confirm("本当に削除しますか？")){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }
    return;
}



canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('mouseleave', invalidata);


clear.addEventListener("click", clearImage);