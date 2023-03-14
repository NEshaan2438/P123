var wristHeightDif = 0;
var wristWidthDif = 0;
var distance = 0;

function preload() {
}

function setup() {
    video = createCapture(VIDEO);
    video.size(510, 385);
    video.position(80, 300);

    canvas = createCanvas(510, 385);
    canvas.position(800, 300);
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    background("aliceblue");
    stroke("navy");
    text("SQUIRREL", 25, 200);
    textSize(distance/3.5);
}

function modelLoaded() {
    console.log("PoseNet is initialized.")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        wristHeightDif = Math.abs(results[0].pose.leftWrist.y - results[0].pose.rightWrist.y);
        wristWidthDif = Math.abs(results[0].pose.leftWrist.x - results[0].pose.rightWrist.x);
        distance = Math.sqrt((wristHeightDif * wristHeightDif) + (wristWidthDif * wristWidthDif));
    }
}