var px, py;           // point controlled by the mouse
var targetX = 300;    // target point coordinates
var targetY = 200;


function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent('sketch');
    noCursor();

    strokeWeight(5);    // thicker stroke = easier to see
}


function draw() {

    // update point position to mouse coordinates
    px = mouseX;
    py = mouseY;

    // check for collision!
    // if hit, make background orange; if not, make it white
    var colliding = pointPoint(px, py, targetX, targetY);
    if (colliding) {
        background(255, 150, 0);
    }
    else {
        background(255);
    }

    // draw the two points
    stroke(0,150,255);
    point(targetX, targetY);

    stroke(0,150);
    point(px, py);
}


// POINT/POINT
function pointPoint(x1,y1, x2,y2) {

    // are the two points in the same location?
    if (x1 == x2 && y1 == y2) {
        return true;
    }
    return false;
}
