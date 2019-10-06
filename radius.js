
function setRadius(newRadius){
    if(newRadius<minRad)
        newRadius = minRad;
    else if(newRadius>maxRad)
        newRadius = maxRad;
    radius = newRadius;
    ctx.lineWidth = radius * 2;

    radSpan.innerHTML = radius;
}

let minRad = 0,
    maxRad = 100,
    defaultRad = 10,
    interval = 5,
    radSpan = document.getElementById('radval'),
    decRad = document.getElementById('decrad'),
    incRad = document.getElementById('incrad');


decRad.addEventListener('click', function(){
    setRadius(radius-interval);
});
incRad.addEventListener('click', function(){
    setRadius(radius+interval);
});

setRadius(defaultRad);