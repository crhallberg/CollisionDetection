var x1 = 0; // line controlled by mouse
var y1 = 0;
var x2 = 10; // fixed end
var y2 = 10;

var x3 = 100; // static line
var y3 = 300;
var x4 = 500;
var y4 = 100;

function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent('sketch');

    strokeWeight(5); // make lines easier to see
}

function draw() {
    background(255);

    // set line's end to mouse coordinates
    x1 = mouseX;
    y1 = mouseY;

    // check for collision
    // if hit, change color of line
    var hit = lineLine(x1,y1,x2,y2, x3,y3,x4,y4);
    if (hit) stroke(255, 150, 0, 150);
    else stroke(0, 150, 255, 150);
    line(x3,y3, x4,y4);

    // draw user-controlled line
    stroke(0, 150);
    line(x1,y1, x2,y2);
}

// LINE/LINE
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the distance to intersection point
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        // optionally, draw a circle where the lines meet
        var intersectionX = x1 + (uA * (x2-x1));
        var intersectionY = y1 + (uA * (y2-y1));
        fill(255, 0, 0);
        noStroke();
        ellipse(intersectionX, intersectionY, 20, 20);

        return true;
    }
    return false;
}
