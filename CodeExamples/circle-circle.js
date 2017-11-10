var c1x = 0;      // circle 1 position
var c1y = 0;      // (controlled by mouse)
var c1r = 30;     // radius

var c2x = 300;    // circle 2 position
var c2y = 200;
var c2r = 100;


function setup() {
    var canvas = createCanvas(600,400);
    canvas.parent('sketch');
    noStroke();
}


function draw() {
    background(255);

    // update position to mouse coordinates
    c1x = mouseX;
    c1y = mouseY;

    // check for collision
    // if hit, change color
    var hit = circleCircle(c1x,c1y,c1r, c2x,c2y,c2r);
    if (hit) {
        fill(255,150,0);
    }
    else {
        fill(0,150,255);
    }
    ellipse(c2x,c2y, c2r*2,c2r*2);

    // other circle, controlled by mouse
    fill(0, 150);
    ellipse(c1x,c1y, c1r*2,c1r*2);
}


// CIRCLE/CIRCLE
function circleCircle(c1x, c1y, c1r, c2x, c2y, c2r) {

    // get distance between the circle's centers
    // use the Pythagorean Theorem to compute the distance
    var distX = c1x - c2x;
    var distY = c1y - c2y;
    var distance = sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the sum of the circle's
    // radii, the circles are touching!
    if (distance <= c1r+c2r) {
        return true;
    }
    return false;
}
