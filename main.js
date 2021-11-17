objects=[]
status1=" "
function preload(){
    video=createVideo("video.mp4")
    }
function setup(){
        canvas=createCanvas(650,650)
        canvas.center()
        video.hide()
    }
    function start(){
        objectdetector=ml5.objectDetector('cocossd',modelloaded)
        document.getElementById("status").innerHTML="status:detecting objects"
    }
    function modelloaded(){
        console.log("modelloaded")
        status1=true
        video.loop()
        video.speed(1)
        video.volume(0)
    }
    function gotresult(error,results){
        if (error) {
            console.error(error);
        } else {
            console.log(results)
            objects=results
        }
      }
      function draw(){
        image(video,0,0,650,650)
        if(status1!=" "){
            objectdetector.detect(video,gotresult)
            for (let index = 0; index < objects.length; index++) {
                document.getElementById("status").innerHTML="status:objectsect detected"
                document.getElementById("result").innerHTML="number of objectsect detected="+objects.length
                fill("red")
                percent=floor(objects[index].confidence*100)
                text(objects[index].label+" "+percent+"%",objects[index].x,objects[index].y)
                noFill()
                stroke("red")
                rect(objects[index].x,objects[index].y,objects[index].width,objects[index].height)
            }
        }
        
        }