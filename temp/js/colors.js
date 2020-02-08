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
    var swatch = e.target;
    setColor(swatch.style.backgroundColor);
    swatch.className += ' active';
}

setSwatch({target: document.getElementsByClassName('swatch')[0]});