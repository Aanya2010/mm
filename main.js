
scorelw="";
song="";
leftWristx="";
leftWristy="";
rightWristx="";
rightWristy="";
scorerw="";

function setup( ) {
    canvas=createCanvas(600, 500)
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500)

    fill("#FF0000") 
    stroke("#FF0000")
    circle(leftWristx, leftWristy, 20)
    if(scorelw>0.2){
    cn=Number(leftWristy);
    rd=floor(cn);
    volume=rd/500;
    document.getElementById("volume").innerHTML="volume = "+volume;
    song.setVolume(volume);

}
if(scorerw>0.2){



circle(rightWristx, rightWristy, 20);
if(rightWristy>0 && rightWristy<=100){
    document.getElementById("speed").innerHTML="speed= 0.5x";
    song.rate(0.5);
}
else if(rightWristy>100 && rightWristy<=200){
    document.getElementById("speed").innerHTML="speed= 1x";
    song.rate(1);
}
else if(rightWristy>200 && rightWristy<=300){
    document.getElementById("speed").innerHTML="speed= 1.5x";
    song.rate(1.5);
}
else if(rightWristy>300 && rightWristy<=400){
    document.getElementById("speed").innerHTML="speed= 2x";
    song.rate(2);
}
else if(rightWristy>400 && rightWristy<=500){
    document.getElementById("speed").innerHTML="speed= 2.5x";
    song.rate(2.5);
}
}
}
function preload() {
    song=loadSound("music.mp3")
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelloaded() {
    console.log("loaded is model");
}

function gotPoses(results) {
    if(results.length>0){
        console.log(results);
        scorelw=results[0].pose.keypoints[9].score;
        console.log(scorelw);
        scorerw=results[0].pose.keypoints[10].score;
        console.log(scorerw);

        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("left wrist x ="+ leftWristx + "left wrist y =" + leftWristy);



        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("right wrist x ="+ rightWristx + "right wrist y =" + rightWristy);

    }

}

