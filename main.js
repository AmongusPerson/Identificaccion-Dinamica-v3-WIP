var arr = [];
var tex = "";

function preload() {
    video = createVideo("video.mp4");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();
    video.hide();
}

function start() {
    ObjectDetector = ml5.ObjectDetector("CocoSSD",modelLoaded);
    document.getElementById("estado").innerHTML = "Cargando...";
}

function modelLoaded() {
    console.log("modelLoaded");
    tex = true;
    video.loop();
    video.speed(1);
    video.volume(0); 
}

function gotResult(result,error) {
    if (error) {
        console.log(error);
    } else{
        console.log(result); 
        arr = result;
    }
}

function draw() {
    image(video,0,0,500,500);
    if (tex != "") {
        ObjectDetector.detect(video,gotResult);
        for (var i = 0; i < arr.length; i++) {
            document.getElementById("detectados").innerHTML = arr.length + " Objetos detectados";
            fill("#FF0000");
            por = floor(arr[i].confidence*100);
            text(arr[i].label+" "+por+"%",arr[i].x+20,arr[i].y+20);
            noFill();
            stroke("#FF0000");
            rect(arr[i].x,arr[i].y,arr[i].height,arr[i].width);
        }
    }
}