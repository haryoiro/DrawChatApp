let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


let radius  = 10;
let dragging= false;

canvas.width    = window.innerWidth;
canvas.height   = window.innerHeight;

ctx.lineWidth = radius * 2;

function putPoint(e){
    if(dragging){
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
    //arc(x, y, radius, startAngle, endAngle, anticlokwise?);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    }
}

function engage(e){
    dragging= true;
    putPoint(e);
}

function disengage(){
    dragging = false;
    ctx.beginPath();
}

function touchPoint(e){
    if(dragging){
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
    //arc(x, y, radius, startAngle, endAngle, anticlokwise?);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    }
}

function touchengage(e){
    dragging= true;
    putPoint(e);
}

function touchdisengage(){
    dragging = false;
    ctx.beginPath();
}


canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('touchdown', touchengage);
canvas.addEventListener('touchmove', touchPoint);
canvas.addEventListener('touchup', touchdisengage);

