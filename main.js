var can = document.getElementById("imageDisplay");
var ctx = can.getContext("2d");

can.width = 100;
can.height = 100;

var selectedObj = document.getElementById("pancakeOrder");

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