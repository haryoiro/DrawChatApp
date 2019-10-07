const saveButtom = document.getElementById('save');

saveButtom.addEventListener('click', saveImage);

function getImage(){
    document.getElementById('canvas');              //id 'canvas'の読み込み
    let imgdata = canvas.toDataURL();               //imgdataにキャンバスのデータを書き込み
    document.getElementById('i1').src = imgdata;    //id'i1'のsrcをimgdataに書き換え
}   
function saveImage(){
    let data= canvas.toDataURL();

    window.open(document.querySelector('canvas').toDataURL())

    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            let response = request.responseText;
            window.open(response, '_Blank', location=0,menubar=0);
        }
    }
}


request.open('POST', 'save.php', true);
request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
request.send('img='+data);

    //window.open(data, '_Blank', location=0,menubar=0, true);