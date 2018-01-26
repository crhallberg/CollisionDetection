var s1x = 0; // square position (move with mouse)
var s1y = 0;
var s1w = 30; // and dimensions
var s1h = 30;

var s2x = 200; // same for second square
var s2y = 100;
var s2w = 200;
var s2h = 200;

function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent("sketch");

    noStroke();
}

function draw() {
    background(255);

    // update square to mouse coordinates
    s1x = mouseX - s1w / 2; // center the mouse in the box
    s1y = mouseY - s1h / 2;

    // check for collision
    // if hit, change rectangle color
    var hit = rectRect(s1x, s1y, s1w, s1h, s2x, s2y, s2w, s2h);
    if (hit) {
        fill(255, 150, 0);
    } else {
        fill(0, 150, 255);
    }
    rect(s2x, s2y, s2w, s2h);

    // draw the other square
    fill(0, 150);
    rect(s1x, s1y, s1w, s1h);
}

// RECTANGLE/RECTANGLE
function rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    // are the sides of one rectangle touching the other?
    if (
        r1x + r1w >= r2x && // r1 right edge past r2 left
        r1x <= r2x + r2w && // r1 left edge past r2 right
        r1y + r1h >= r2y && // r1 top edge past r2 bottom
        r1y <= r2y + r2h // r1 bottom edge past r2 top
    ) {
        return true;
    }
    return false;
}
