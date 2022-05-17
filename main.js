var can = document.getElementById("imageDisplay");
var ctx = can.getContext("2d");

can.width = 100;
can.height = 100;

var selectedObj = document.getElementById("pancakeOrder");
var floofBtn = document.getElementById("floofBtn");
var floofFlooferBtn = document.getElementById("floof-FlooferBtn");
var yummyPancakes = document.getElementById("yummyPancakes");
var strawberries = document.getElementById("strawberries")

// Visibility functions

yummyPancakes.style.visibility = "hidden"
strawberries.style.visibility = "hidden"

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
    testScope(selectedObj);
}

function toggleSize(selectedObj) {
    if (selectedObj.style.height == "30px") {
        (selectedObj.style.height = "300px")
    }
    else {
        (selectedObj.style.height = "30px")
    }
}


function testScope(selectedObj) {
    alert(`Scope test: selectedObj is ${selectedObj.textContent}`);
}

function strawberryPancakes() {
    yummyPancakes.style.visibility = "hidden"
    strawberries.style.visibility = "visible"
}

function noStrawberries() {
    yummyPancakes.style.visibility = "visible"
    strawberries.style.visibility = "hidden"
}