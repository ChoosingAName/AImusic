song1_status="";
song2_status="";
song1="";
song2="";
scoreleftWrist=0;
scorerightWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("song2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose",gotposes);
}
function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill('#FF0000');
    stroke('FF0000');
   if(scoreleftWrist>0.2)
   {
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(song2_status==false)
    {
        song2.play();
        document.getElementById('song').innerHTML="playing song 2";
    }
   }
   if(scorerightWrist>0.2)
   {
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if(song1_status==false)
    {
        song1.play();
        document.getElementById('song').innerHTML="playing song 1";
    }
   }
}
function modelLoaded(){
    console.log("Posenet Is Initialized");
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        scorerightWrist=results[0].pose.keypoints[10].score;
        scoreleftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY"+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftWristX="+rightWristX+"rightWristY"+rightWristY);
    }
}