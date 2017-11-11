var px =     0;      // point position
var py =     0;

var cx =     300;    // circle center position
var cy =     200;
var radius = 100;    // circle's radius


function setup() {
    var canvas = createCanvas(600,400);
    canvas.parent('sketch');
    noCursor();

    strokeWeight(5);   // thicker stroke = easier to see
}


function draw() {
    background(255);

    // update point position to mouse coordinates
    px = mouseX;
    py = mouseY;

    // check for collision!
    var hit = pointCircle(px,py, cx,cy, radius);

    // draw circle
    // change fill color if hit
    if (hit) {
        fill(255,150,0);
    }
    else {
        fill(0,150,255);
    }
    noStroke();
    ellipse(cx,cy, radius*2,radius*2);

    // draw the point
    stroke(0);
    point(px, py);
}


// POINT/CIRCLE
function pointCircle(px,py, cx,cy,r) {

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
