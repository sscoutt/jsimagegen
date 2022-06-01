var can = document.getElementById("imageDisplay");
var ctx = can.getContext("2d");

var canWidth = 600;
var canHeight = 600;

can.width = canWidth;
can.height = canHeight;


// Visibility functions

function hideObject(selectedObj) {
    selectedObj.style.visibility = "hidden";
}

function showObject(selectedObj) {
    selectedObj.style.visibility = "visible";
}

function toggleVisibility(selectedObj) {
    if (selectedObj.style.visibility == "hidden") {
        selectedObj.style.visibility = "visible";
    }
    else {
        selectedObj.style.visibility = "hidden";
    }
}

//Color functions
function setSelectedObj(id) {
    var selectedObj = document.getElementById(id);
}



//canvas functions
function clearCanvas() {
    ctx.clearRect(0,0,canWidth,canHeight);
}

function rotate(x,y,a) {
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(a * Math.PI / 180);
    ctx.translate(0-x,0-y);
}

function rotateByCoords(x1,y1,x2,y2,a) {
    let pointX = (x1 + x2) / 2;
    let pointY = (y1 + y2) / 2;
    ctx.save();
    ctx.translate(pointX,pointY);
    ctx.rotate(a * Math.PI / 180);
    ctx.translate(0-pointX,0-pointY);
}



//canvas magic
var alpacaImgVar = document.getElementById("alpacaImg");

var loopInterval = 50;
var mainTimer = 0;
function mainLoop() {
    mainTimer += loopInterval/1000;
    clearCanvas();
    //ctx.drawImage(pancakeImg,10,10,400+Math.sin(mainTimer)*100,400+Math.cos(mainTimer)*100);

    ctx.beginPath();
    rotate(canWidth/2,canHeight/2,-90);
    ctx.drawImage(alpacaImgVar,0,0,canWidth,canHeight);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    rotate(30,30,mainTimer*45);
    ctx.rect(20,20,20,20);
    //ctx.fill();
    ctx.restore();

    //rotate(x,y,a)
    //draw thing
    //reset transform
}

setInterval(mainLoop,1000/loopInterval);