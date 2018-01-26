// array of Vectors for each shape
var pentagon = new Array(5);
var randomPoly = [];

function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent("sketch");

    noStroke();

    // set position of the pentagon's vertices
    var angle = TWO_PI / pentagon.length;
    for (var i = 0; i < pentagon.length; i++) {
        var a = angle * i;
        var x = 300 + cos(a) * 100;
        var y = 200 + sin(a) * 100;
        pentagon[i] = createVector(x, y);
    }

    // and create the random polygon
    var a = 0;
    var i = 0;
    while (a < 360) {
        var x = cos(radians(a)) * random(30, 50);
        var y = sin(radians(a)) * random(30, 50);
        randomPoly[i] = createVector(x, y);
        a += random(15, 40);
        i += 1;
    }
}

function draw() {
    background(255);

    // update random polygon to mouse position
    var mouse = createVector(mouseX, mouseY);
    var diff = p5.Vector.sub(mouse, randomPoly[0]);
    for (var i = 0; i < randomPoly.length; i++) {
        randomPoly[i].add(diff);
    }

    // check for collision
    // if hit, change fill color
    var hit = polyPoly(pentagon, randomPoly);
    if (hit) fill(255, 150, 0);
    else fill(0, 150, 255);

    // draw the pentagon
    noStroke();
    beginShape();
    for (var i = 0; i < pentagon.length; i++) {
        vertex(pentagon[i].x, pentagon[i].y);
    }
    endShape();

    // draw the random polygon
    fill(0, 150);
    beginShape();
    for (var i = 0; i < randomPoly.length; i++) {
        vertex(randomPoly[i].x, randomPoly[i].y);
    }
    endShape();
}

// POLYGON/POLYGON
function polyPoly(p1, p2) {
    // go through each of the vertices, plus the next
    // vertex in the list
    var next = 0;
    for (var current = 0; current < p1.length; current++) {
        // get next vertex in list
        // if we've hit the end, wrap around to 0
        next = current + 1;
        if (next == p1.length) next = 0;

        // get the PVectors at our current position
        // this makes our if statement a little cleaner
        var vc = p1[current]; // c for "current"
        var vn = p1[next]; // n for "next"

        // now we can use these two points (a line) to compare
        // to the other polygon's vertices using polyLine()
        var collision = polyLine(p2, vc.x, vc.y, vn.x, vn.y);
        if (collision) return true;

        // optional: check if the 2nd polygon is INSIDE the first
        collision = polyPoint(p1, p2[0].x, p2[0].y);
        if (collision) return true;
    }

    return false;
}

// POLYGON/LINE
function polyLine(vertices, x1, y1, x2, y2) {
    // go through each of the vertices, plus the next
    // vertex in the list
    var next = 0;
    for (var current = 0; current < vertices.length; current++) {
        // get next vertex in list
        // if we've hit the end, wrap around to 0
        next = current + 1;
        if (next == vertices.length) next = 0;

        // get the PVectors at our current position
        // extract X/Y coordinates from each
        var x3 = vertices[current].x;
        var y3 = vertices[current].y;
        var x4 = vertices[next].x;
        var y4 = vertices[next].y;

        // do a Line/Line comparison
        // if true, return 'true' immediately and
        // stop testing (faster)
        var hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
        if (hit) {
            return true;
        }
    }

    // never got a hit
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
// used only to check if the second polygon is INSIDE the first
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
