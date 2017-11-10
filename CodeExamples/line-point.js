var px = 0;     // point position (set by mouse)
var py = 0;

var x1 = 100;   // line defined by two points
var y1 = 300;
var x2 = 500;
var y2 = 100;


function setup() {
    var canvas = createCanvas(600,400);
    canvas.parent('sketch');
    noCursor();

    strokeWeight(5);  // make things a little easier to see
}


function draw() {
    background(255);

    // set point to mouse coordinates
    px = mouseX;
    py = mouseY;

    // check for collision
    // if hit, change the color of the line
    var hit = linePoint(x1,y1, x2,y2, px,py);
    if (hit) stroke(255,150,0, 150);
    else stroke(0,150,255, 150);
    line(x1,y1, x2,y2);

    // draw the point
    stroke(0, 150);
    point(px,py);
}


// LINE/POINT
function linePoint(x1,y1, x2,y2, px,py) {

    // get distance from the point to the two ends of the line
    var d1 = dist(px,py, x1,y1);
    var d2 = dist(px,py, x2,y2);

    // get the length of the line
    var lineLen = dist(x1,y1, x2,y2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    var buffer = 0.1;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
        return true;
    }
    return false;
}
