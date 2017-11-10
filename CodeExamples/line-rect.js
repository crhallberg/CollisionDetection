var x1 = 0;      // points for line (controlled by mouse)
var y1 = 0;
var x2 = 0;      // static point
var y2 = 0;

var sx = 200;    // square position
var sy = 100;
var sw = 200;    // and size
var sh = 200;


function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent('sketch');

    strokeWeight(5);  // make the line easier to see
}


function draw() {
    background(255);

    // set end of line to mouse coordinates
    x1 = mouseX;
    y1 = mouseY;

    // check if line has hit the square
    // if so, change the fill color
    var hit = lineRect(x1,y1,x2,y2, sx,sy,sw,sh);
    if (hit) fill(255,150,0);
    else fill(0,150,255);
    noStroke();
    rect(sx, sy, sw, sh);

    // draw the line
    stroke(0, 150);
    line(x1, y1, x2, y2);
}


// LINE/RECTANGLE
function lineRect(x1,y1,x2,y2, rx,ry,rw,rh) {

    // check if the line has hit any of the rectangle's sides
    // uses the Line/Line function below
    var left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
    var right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
    var top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
    var bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);

    // if ANY of the above are true, the line
    // has hit the rectangle
    if (left || right || top || bottom) {
        return true;
    }
    return false;
}


// LINE/LINE
function lineLine(x1,y1,x2,y2, x3,y3,x4,y4) {

    // calculate the direction of the lines
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

        // optionally, draw a circle where the lines meet
        var intersectionX = x1 + (uA * (x2-x1));
        var intersectionY = y1 + (uA * (y2-y1));
        fill(255,0,0);
        noStroke();
        ellipse(intersectionX, intersectionY, 20, 20);

        return true;
    }
    return false;
}
