img = ";"
status1 = ""
objects = [];

function preload() {
   img = loadImage("image.jpg");
}

function draw() {
   image(img, 0, 0, 640, 420);
   /*fill("red");
   text("Dog",120,90);
   noFill();
   stroke("red")
   rect(60,60,450,350)
   text("Cat",340,100)
   rect(280,90,300,350)*/
   console.log("status1 : "+ status1)
   if (status1 != "") {
      for (i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML = "Object Detected"
         fill("blue");
         percent = floor(objects[i].confidence * 100)
         text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y+10);
         noFill()
         stroke("blue")
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

      }
   }
}

function setup() {
   canvas = createCanvas(640, 420);
   canvas.center();
   objectDetector = ml5.objectDetector('cocossd', modelLoaded)
   document.getElementById("status").innerHTML = "status:detecting objects"
}

function modelLoaded() {
   console.log("Model has been initialized")
   status1 = true;
   objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
   if (error) {
      console.log(error);
   } else {
      console.log(results)
      objects = results;
   }
}