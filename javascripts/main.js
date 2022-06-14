var can = document.getElementById("imageDisplay");
var ctx = can.getContext("2d");

var canWidth = 600;
var canHeight = 600;

can.width = canWidth;
can.height = canHeight;

var currentTab = "hair";

// Window updating functions

function scaleWindow() {
    let win = window;
    doc = document;
    docElem = doc.documentElement;
    body = doc.getElementsByTagName('body')[0];
    x = win.innerWidth || docElem.clientWidth || body.clientWidth;
    y = win.innerHeight || docElem.clientHeight || body.clientHeight;

    let width = 1200;
    let height = 640;

    let scaleFactor = Math.min(x/width,y/height);
    //document.body.style.transform = "scale(" + scaleFactor + ")";
    document.body.style.transform = "scale(" + Math.min(x/width,y/640) + ")";

    if (x/width < y/height) {
        document.body.style.margin = ((((y - (height*scaleFactor))/2)+10) + "px 0px 0px 0px");
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



function setSelectedObj(id) {
    var selectedObj = document.getElementById(id);
}

function setCoat(coatId) {
    if (coatId == "none"){
        displayedCoat = "none"
    } 
    else {
        displayedCoat = document.getElementById(coatId)
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

    rotateByImage(displayedCoat,140,20,raincoatImgVar.width * alpacaRatio,raincoatImgVar.height * alpacaRatio,0);
}

//runs mainLoop() based on loopInterval
setInterval(mainLoop, 1000 / loopInterval);

//function that runs on page load
window.onload = function(){
    setCoat('none');
}
