var cx = 0; // circle position (set with mouse)
var cy = 0;
var r = 30; // circle radius

var sx = 200; // square position
var sy = 100;
var sw = 200; // and dimensions
var sh = 200;

function setup() {
    var canvas = createCanvas(600,400);
    canvas.parent('sketch');
    noStroke();
}

function draw() {
    background(255);

    // update square to mouse coordinates
    cx = mouseX;
    cy = mouseY;

    // check for collision
    // if hit, change rectangle color
    var hit = circleRect(cx, cy, r, sx, sy, sw, sh);
    if (hit) {
        fill(255, 150, 0);
    } else {
        fill(0, 150, 255);
    }
    rect(sx, sy, sw, sh);

    // draw the circle
    fill(0, 150);
    ellipse(cx, cy, r * 2, r * 2);
}

// CIRCLE/RECTANGLE
function circleRect(cx, cy, radius, rx, ry, rw, rh) {
    // temporary variables to set edges for testing
    var testX = cx;
    var testY = cy;

    // which edge is closest?
    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge

    // get distance from closest edges
    var distX = cx - testX;
    var distY = cy - testY;
    var distance = sqrt(distX * distX + distY * distY);

    // if the distance is less than the radius, collision!
    if (distance <= radius) {
        return true;
    }
    return false;
}
