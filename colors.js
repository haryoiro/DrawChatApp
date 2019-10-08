var colors = ['Black', 'white', '#ff0000', '#ff8e00',
'#ffff00', '#008e00', '#00c0c0', '#400098', '#8e008e' ];

for(var i=0, n=colors.length;i<n;i++){
    var swatch = document.createElement('div');
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
    var swatch = e.target;
    setColor(swatch.style.backgroundColor);
    swatch.className += ' active';
}

setSwatch({target: document.getElementsByClassName('swatch')[0]});