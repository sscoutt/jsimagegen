var can = document.getElementById("imageDisplay");
var ctx = can.getContext("2d");

var canWidth = 600;
var canHeight = 600;

can.width = canWidth;
can.height = canHeight;

var floofBtn = document.getElementById("floofBtn");
var floofFlooferBtn = document.getElementById("floof-FlooferBtn");
var yummyPancakes = document.getElementById("yummyPancakes");
var strawberries = document.getElementById("strawberries");

// Visibility functions

yummyPancakes.style.visibility = "hidden";
strawberries.style.visibility = "hidden";

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
function changeColor(selectedObj) {
    selectedObj.style.color = "#000000";
}

function setSelectedObj(id) {
    var selectedObj = document.getElementById(id);
    alert(`selected ${selectedObj.textContent}!`);
}

function toggleSize(selectedObj) {
    if (selectedObj.style.height == "30px") {
        (selectedObj.style.height = "300px");
    }
    else {
        (selectedObj.style.height = "30px");
    }
}

function strawberryPancakes() {
    yummyPancakes.style.visibility = "hidden";
    strawberries.style.visibility = "visible";
}

function noStrawberries() {
    yummyPancakes.style.visibility = "visible";
    strawberries.style.visibility = "hidden";
<<<<<<< HEAD
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
