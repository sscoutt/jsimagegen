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

function clearCanvas() {
    ctx.clearRect(0,0,canWidth,canHeight);
}

//canvas magic
var pancakeImg = document.getElementById("pancakeOrder");

var loopInterval = 50;
var mainTimer = 0;
function mainLoop() {
    mainTimer += loopInterval/1000;
    clearCanvas();
    ctx.drawImage(pancakeImg,10,10,400+Math.sin(mainTimer)*100,400+Math.cos(mainTimer)*100);
}

setInterval(mainLoop,1000/loopInterval);