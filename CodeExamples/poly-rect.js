var sx = 0; // a square, controlled by the mouse
var sy = 0;
var sw = 30; // width and height
var sh = 30;

// array of Vectors, one for each vertex in the polygon
var vertices = [];

function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent("sketch");

    noStroke();

    // set position of the vertices (here a parallelogram)
    vertices[0] = createVector(100, 100);
    vertices[1] = createVector(400, 100);
    vertices[2] = createVector(500, 300);
    vertices[3] = createVector(200, 300);
}

function draw() {
    background(255);

    // update circle to mouse coordinates
    sx = mouseX - sw / 2;
    sy = mouseY - sh / 2;

    // check for collision
    // if hit, change fill color
    var hit = polyRect(vertices, sx, sy, sw, sh);
    if (hit) fill(255, 150, 0);
    else fill(0, 150, 255);

    // draw the polygon using beginShape()
    noStroke();
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape();

    // draw the rectangle
    fill(0, 150);
    rect(sx, sy, sw, sh);
}

// POLYGON/RECTANGLE
function polyRect(vertices, rx, ry, rw, rh) {
    // go through each of the vertices, plus the next
    // vertex in the list
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

        // check against all four sides of the rectangle
        var collision = lineRect(vc.x, vc.y, vn.x, vn.y, rx, ry, rw, rh);
        if (collision) return true;

        // optional: test if the rectangle is INSIDE the polygon
        // note that this iterates all sides of the polygon
        // again, so only use this if you need to
        var inside = polyPoint(vertices, rx, ry);
        if (inside) return true;
    }

    return false;
}

// LINE/RECTANGLE
function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
    // check if the line has hit any of the rectangle's sides
    // uses the Line/Line function below
    var left = lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
    var right = lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
    var top = lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
    var bottom = lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

    // if ANY of the above are true, the line
    // has hit the rectangle
    if (left || right || top || bottom) {
        return true;
    }
    return false;
}

// LINE/LINE
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the distance to intersection point
    var uA =
        ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
        ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    var uB =
        ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
        ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
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
