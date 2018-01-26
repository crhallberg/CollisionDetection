var px = 0; // point position
var py = 0;

// array of PVectors, one for each vertex in the polygon
var vertices = [];

function setup() {
    var canvas = createCanvas(600, 400);
	canvas.parent("sketch");

    noCursor();

    strokeWeight(5); // make the point easier to see

    // set position of the vertices
    // here we draw a distorted trapezoid, but
    // you could make much more complex shapes
    // or even randomize the points!
    vertices[0] = createVector(200, 100);
    vertices[1] = createVector(400, 130);
    vertices[2] = createVector(350, 300);
    vertices[3] = createVector(250, 300);
}

function draw() {
    background(255);

    // update point to mouse coordinates
    px = mouseX;
    py = mouseY;

    // check for collision
    // if hit, change fill color
    var hit = polyPoint(vertices, px, py);
    if (hit) fill(255, 150, 0);
    else fill(0, 150, 255);

    // draw the polygon using beginShape()
    noStroke();
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape();

    // draw the point
    stroke(0, 150);
    point(px, py);
}

// POLYGON/POINT
function polyPoint(vertices, px, py) {
    var collision = false;

    // go through each of the vertices, plus
    // the next vertex in the list
    var next = 0;
    for (var current = 0; current < vertices.length; current++) {
        // get next vertex in list
        // if we've hit the end, wrap around to 0
        next = current + 1;
        if (next == vertices.length) next = 0;

        // get the PVectors at our current position
        // this makes our if statement a little cleaner
        var vc = vertices[current]; // c for "current"
        var vn = vertices[next]; // n for "next"

        // compare position, flip 'collision' variable
        // back and forth
        if (
            ((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
            px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x
        ) {
            collision = !collision;
        }
    }
    return collision;
}
