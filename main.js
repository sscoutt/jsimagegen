var can = document.getElementById("imageDisplay");
var ctx = can.getContext("2d");

can.width = 100;
can.height = 100;

var pancakes = document.getElementById("pancakeOrder");
var floofBtn = document.getElementById("floofBtn");
var floofFlooferBtn = document.getElementById("floof-FlooferBtn");

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
function changeColor(selectedObj) {
    selectedObj.style.color = "#000000";
}

function setSelectedObj(id) {
    var selectedObj = document.getElementById(id);
    alert(`selected ${selectedObj.textContent}!`);
    testScope();
}

function testScope() {
    alert(`Scope test: selectedObj is ${selectedObj.textContent}`);
}