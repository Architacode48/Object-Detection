photo="";
status="";
objects=[];
function preload(){
    photo= loadImage("dog_cat.jpg");
}
function setup(){
    canvas= createCanvas(640,450);
    canvas.center();
    archita=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("cocossd has loaded");
    status=true;
    archita.detect(photo,gotResult);
}
function draw(){
    image(photo,0,0,640,450);
    if(status != ""){
        for(i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            percent=floor(objects[i].confidence*100);
            stroke("#FF0000");
            text(objects[i].label +" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}