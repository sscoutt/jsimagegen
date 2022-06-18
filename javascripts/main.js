var can = document.getElementById("imageDisplay");
var ctx = can.getContext("2d");

var canWidth = 600;
var canHeight = 600;

can.width = canWidth;
can.height = canHeight;

var currentTab = "hair";
var displayedCoat = "none";
var displayedGloves = "none";
var displayedHair = "none";

var placementMode = false;
var placementImg = document.getElementById('hairAfroHairImg');
var placementAngle = 0;
var mouseX = 0;
var mouseY = 0;



// Window updating functions
//window scale factor
var scaleFactor = 1;
function scaleWindow() {
    let win = window;
    doc = document;
    docElem = doc.documentElement;
    body = doc.getElementsByTagName('body')[0];
    x = win.innerWidth || docElem.clientWidth || body.clientWidth;
    y = win.innerHeight || docElem.clientHeight || body.clientHeight;

    let width = 1200;
    let height = 640;

    scaleFactor = Math.min(x / width, y / height);
    //document.body.style.transform = "scale(" + scaleFactor + ")";
    document.body.style.transform = "scale(" + Math.min(x / width, y / 640) + ")";

    if (x / width < y / height) {
        document.body.style.margin = ((((y - (height * scaleFactor)) / 2) + 10) + "px 0px 0px 0px");
    }
    else {
        //document.body.style.margin = "0px 0px " + (x - (width*scaleFactor))/2 + "px 0px";
        document.body.style.margin = "10px 0px 0px 0px";
    }
}






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

//sets the image that placementMode displays
function setPlacementImg(id) {
    placementImg = document.getElementById(id);
}


function setSelectedObj(id) {
    var selectedObj = document.getElementById(id);
}

function setCoat(coatId) {
    if (coatId == "none") {
        displayedCoat = "none"
    }
    else {
        displayedCoat = document.getElementById(coatId)
        setPlacementImg(coatId);
    }
}

function setGloves(glovesId) {
    if (glovesId == "none") {
        displayedGloves = "none"
    }
    else {
        displayedGloves = document.getElementById(glovesId)
        setPlacementImg(glovesId);
    }
}

function setHair(hairId) {
    if (hairId == "none") {
        displayedHair = "none"
    }
    else {
        displayedHair = document.getElementById(hairId)
        setPlacementImg(hairId);
    }
}



//canvas functions
function clearCanvas() {
    ctx.clearRect(0, 0, canWidth, canHeight);
}



//rotation functions!
//use these like:

//<--!-->
//open ctx path
//ctx.beginPath();

//use rotation function of choice (the function will save the old canvas transformations for you)
//rotate(canWidth/2,canHeight/2,-90);

//perform actions in new rotated canvas
//ctx.drawImage(alpacaImgVar,0,0,canWidth,canHeight);

//restore at the end to return to the default rotation
//ctx.restore();
//<--!-->



//rotates [a] degrees from a point at ([x],[y])
function rotate(x, y, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a * Math.PI / 180);
    ctx.translate(0 - x, 0 - y);
}

//rotates [a] degrees from a point at the center of a rectangle defined by 2 corners - upper-left at ([x1],[y1]) and bottom-right at ([x2],[y2])
function rotateByCoords(x1, y1, x2, y2, a) {
    let pointX = (x1 + x2) / 2;
    let pointY = (y1 + y2) / 2;
    ctx.save();
    ctx.translate(pointX, pointY);
    ctx.rotate(a * Math.PI / 180);
    ctx.translate(0 - pointX, 0 - pointY);
}

//rotates [a] degrees from a point at the center of a rectangle defined by an upper-left corner ([x],[y]), and [width] and [height] values
function rotateByCorner(x, y, width, height, a) {
    let pointX = (x + (x + width)) / 2;
    let pointY = (y + (y + height)) / 2;
    ctx.save();
    ctx.translate(pointX, pointY);
    ctx.rotate(a * Math.PI / 180);
    ctx.translate(0 - pointX, 0 - pointY);
}

//a combination of rotateByCorner() and ctx.drawImage()
//rotates [a] degrees from a point at the center of a rectangle defined by an upper-left corner ([x],[y]), and [width] and [height] values
//draws an image from a source variable [src] with the image's upper-left corner at ([x],[y]) and [width] and [height] values that determine the size of the image to be drawn
//[ratioKeep] is an optional parameter that preserves the image's aspect ratio based on width
//[ratioFromHeight] is an optional boolean parameter that overrides ratioKeep and instead defines the aspect ratio based on height if [ratioFromHeight]'s value equals true
function rotateByImage(src, x, y, width, height, a, ratioKeep, ratioFromHeight) {
    if (src !== "none") {
        if (ratioKeep === undefined || ratioKeep === false) {
            ctx.beginPath();
            rotateByCorner(x, y, width, height, a);
            ctx.drawImage(src, x, y, width, height);
            ctx.restore();
        }
        if (ratioKeep) {
            if (ratioFromHeight === true) {
                let aspectRatio = src.width / src.height;
                let newWidth = height * aspectRatio;
                ctx.beginPath();
                rotateByCorner(x, y, newWidth, height, a);
                ctx.drawImage(src, x, y, newWidth, height);
                ctx.restore();
            }
            else {
                let aspectRatio = src.height / src.width;
                let newHeight = width * aspectRatio;
                ctx.beginPath();
                rotateByCorner(x, y, width, newHeight, a);
                ctx.drawImage(src, x, y, width, newHeight);
                ctx.restore();
            }
        }
    }
}



//image variables (fetched by element ID)
var alpacaImgVar = document.getElementById("alpacaImg");
var raincoatImgVar = document.getElementById("coatsRaincoatImg");
raincoatImgVar.setAttribute('xOffset', 140);
raincoatImgVar.setAttribute('yOffset', 20);

//the [interval] variable is the FPS of the mainLoop() function
var loopInterval = 50;
var mainTimer = 0;

var alpacaRatio = canWidth / alpacaImgVar.width;

//mainLoop() function updates the canvas and runs [loopInterval] times every second
function mainLoop() {
    scaleWindow();
    //mainTimer keeps time in seconds-since-startup
    mainTimer += loopInterval / 1000;

    //clearCanvas() function draws a white rectangle across the entire canvas every loop before drawing anything
    clearCanvas();

    ctx.beginPath();
    rotate(canWidth / 2, canHeight / 2, 0);
    ctx.drawImage(alpacaImgVar, 0, 0, alpacaImgVar.width * alpacaRatio, alpacaImgVar.height * alpacaRatio);
    ctx.restore();

    //the above code can be simplified by using the new rotateByImage() function:
    //rotateByImage(alpacaImgVar,0,0,canWidth,canHeight,270,false,false);
    //(last two [false] parameters could be excluded in this case);

    if (placementMode) {
        //console.log(placementImg)
        rotateByImage(placementImg, mouseX*2, mouseY*2, placementImg.width * alpacaRatio, placementImg.height * alpacaRatio, placementAngle);
        //rotateByImage(displayedCoat, mouseX*2, mouseY*2, displayedCoat.width * alpacaRatio, displayedCoat.height * alpacaRatio, 0);
    }
    else {
        rotateByImage(displayedCoat, 140, 20, displayedCoat.width * alpacaRatio, displayedCoat.height * alpacaRatio, 0);
        rotateByImage(displayedGloves, 300, 500, displayedGloves.width * alpacaRatio, displayedGloves.height * alpacaRatio, 0);
        rotateByImage(displayedHair, 386, -50, displayedHair.width * alpacaRatio, displayedHair.height * alpacaRatio, 0);
    }
    //rotateByImage(displayedHair, mouseX*2, mouseY*2, displayedHair.width * alpacaRatio, displayedHair.height * alpacaRatio, 0);



    //take keyboard inputs
    if (placementMode) {
        if ((map[37] || map[65]) && (!map[39] && !map[68])) {
            if (placementAngle > 0) {
                placementAngle--;
            }
            else {
                placementAngle = 359;
            }
        }
        else if ((!map[37] && !map[65]) && (map[39] || map[68])) {
            if (placementAngle < 360) {
                placementAngle++;
            }
            else {
                placementAngle = 1;
            }
        }
    }
}

//runs mainLoop() based on loopInterval
setInterval(mainLoop, 1000 / loopInterval);

//function that runs on page load
window.onload = function () {
    setCoat('none');
    setGloves('none');
    setHair('none');
}





//keyboard and mouse inputs:

//canvas onclick() functions
function mouseDownCan() {
    //if z,x and c keys are pressed and canvas is clicked
    if (map[90] && map[88] && map[67]) {
        placementMode = !placementMode;
        if (!placementMode) {
            placementAngle = 0;
        }
    }
    //else if (!(map[90] && map[88] && map[67]) && placementMode) {
        //console.log("X: " + (mouseX*2).toPrecision(4) + ", Y: " + (mouseY*2).toPrecision(4) + ", A: " + placementAngle);
    //}
}

//canvas onclick() functions
function mouseDownPage() {
    //if z,x and c keys are pressed and canvas is clicked
    if (!(map[90] && map[88] && map[67]) && placementMode) {
        console.log("X: " + (mouseX*2).toPrecision(4) + ", Y: " + (mouseY*2).toPrecision(4) + ", A: " + placementAngle);
    }
}

//get mouse position
document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }

    let boundRect = can.getBoundingClientRect();
    mouseX = (event.pageX / scaleFactor) - (boundRect.left/scaleFactor);
    mouseY = (event.pageY / scaleFactor) - (boundRect.top/scaleFactor);
}

//get keys pressed
var map = {}; // You could also use an array
//wsad
map[87] = false;
map[83] = false;
map[65] = false;
map[68] = false;

//^v<>
map[38] = false;
map[40] = false;
map[37] = false;
map[39] = false;

//space
map[32] = false;

//zxc
map[90] = false;
map[88] = false;
map[67] = false;

onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}
