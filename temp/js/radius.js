let radConf ={
    minRad:1,
    maxRad:20,
    defaultRad:1,
    interval:1,
}
radSpan = document.getElementById('radval'),
decRad = document.getElementById('decrad').addEventListener('click', function(){setRad(conf.radius-radConf.interval);}),
incRad = document.getElementById('incrad').addEventListener('click', function(){setRad(conf.radius+radConf.interval);});


function setRad(newRad){
    if(newRad < radConf.minRad){
        newRad = radConf.minRad;
    } else if (newRad > radConf.maxRad){
        newRad = radConf.maxRad
    }
    conf.radius = newRad
    ctx.lineWidth = conf.radius * 2;
    radSpan.innerHTML = conf.radius;
}

setRad(radConf.defaultRad);
