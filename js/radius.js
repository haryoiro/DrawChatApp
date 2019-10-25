let minRad = 1,
    maxRad = 20,
    defaultRad = 1,
    interval = 1,
    radSpan = document.getElementById('radval'),
    decRad = document.getElementById('decrad').addEventListener('click', function(){setRad(radius-interval);}),
    incRad = document.getElementById('incrad').addEventListener('click', function(){setRad(radius+interval);});

function setRad(newRad){
    if(newRad<minRad)
        newRad = minRad;
    else if(newRad>maxRad)
        newRad = maxRad;
    radius = newRad;
    ctx.lineWidth = radius * 2;
    radSpan.innerHTML = radius;
}

setRad(defaultRad);
