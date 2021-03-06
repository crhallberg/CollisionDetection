var cx = 0;      // circle position (set by mouse)
var cy = 0;
var r =  30;     // circle radius

var x1 = 100;    // coordinates of line
var y1 = 300;
var x2 = 500;
var y2 = 100;


function setup() {
    var canvas = createCanvas(600,400);
    canvas.parent('sketch');

    strokeWeight(5);    // make it a little easier to see
}


function draw() {
    background(255);

    // update circle to mouse position
    cx = mouseX;
    cy = mouseY;

    // check for collision
    // if hit, change line's stroke color
    var hit = lineCircle(x1,y1, x2,y2, cx,cy,r);
    if (hit) stroke(255,150,0, 150);
    else stroke(0,150,255, 150);
    line(x1,y1, x2,y2);

    // draw the circle
    fill(0,150,255, 150);
    noStroke();
    ellipse(cx,cy, r*2,r*2);
}


// LINE/CIRCLE
function lineCircle(x1, y1, x2, y2, cx, cy, r) {

    // is either end INSIDE the circle?
    // if so, return true immediately
    var inside1 = pointCircle(x1,y1, cx,cy,r);
    var inside2 = pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;

    // get length of the line
    var distX = x1 - x2;
    var distY = y1 - y2;
    var len = sqrt( (distX*distX) + (distY*distY) );

    // get dot product of the line and circle
    var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / pow(len,2);

    // find the closest point on the line
    var closestX = x1 + (dot * (x2-x1));
    var closestY = y1 + (dot * (y2-y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    var onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;

    // optionally, draw a circle at the closest
    // point on the line
    fill(255,0,0);
    noStroke();
    ellipse(closestX, closestY, 20, 20);

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    var distance = sqrt( (distX*distX) + (distY*distY) );

    if (distance <= r) {
        return true;
    }
    return false;
}


// POINT/CIRCLE
function pointCircle(px, py, cx, cy, r) {

    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    var distX = px - cx;
    var distY = py - cy;
    var distance = sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
        return true;
    }
    return false;
}


// LINE/POINT
function linePoint(x1, y1, x2, y2, px, py) {

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
