<?php

$canvas = $_POST['img'];

$canvas = str_replace('data:image/png;base64,', '', $canvas);
$canvas = str_replace(' ', '+', $canvas);

$img = base64_decode($canvas);
$img = imagecreatefromstring($canvas);

imagepng($img ,'./');

$path = 'images/' . uniqid() . '.png';
if(file_put_contents($path, $img)){
    print $path;
}
else{
    header("HTTP/1.1 500 Internal Server Error");
}

?>