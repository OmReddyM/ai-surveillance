objects = [];
video = "";
Status = "";
function preload() {
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}
function draw(){
    image(video, 0, 0, 480, 380);
    if (Status !== "") {
        objectDetector.detect(video, gotResult);
        for (let index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("objectCount").innerHTML = "Number of Objects: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[index].confidence * 100);
            text(objects[i].label + " - " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}