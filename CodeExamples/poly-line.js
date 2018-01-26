var x1 = 0;    // line position (set by mouse)
var y1 = 0;
var x2 = 20;   // fixed end
var y2 = 20;

// array of PVectors, one for each vertex in the polygon
var vertices = Array(16);


function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent('sketch');
    noCursor();

    strokeWeight(5);  // make the line easier to see

    // set position of the vertices - a regular polygon!
    // based on this example:
    // https://processing.org/examples/regularpolygon.html
    var angle = TWO_PI / vertices.length;
    for (var i=0; i<vertices.length; i++) {
        var a = angle * i;
        var x = 300 + cos(a) * 100;
        var y = 200 + sin(a) * 100;
        vertices[i] = createVector(x,y);
    }
}


function draw() {
    background(255);

    // update line to mouse coordinates
    x1 = mouseX;
    y1 = mouseY;

    // check for collision
    // if hit, change fill color
    var hit = polyLine(vertices, x1, y1, x2, y2);
    if (hit) fill(255, 150, 0);
    else fill(0, 150, 255);

    // draw the polygon using beginShape()
    noStroke();
    beginShape();
    for (var i=0; i<vertices.length; i++) {
        var v = vertices[i];
        vertex(v.x, v.y);
    }
    endShape(CLOSE);

    // draw line
    stroke(0, 150);
    line(x1, y1, x2, y2);
}


// POLYGON/LINE
function polyLine(vertices, x1,y1,x2,y2) {
    // go through each of the vertices, plus the next
    // vertex in the list
    var next = 0;
    for (var current=0; current<vertices.length; current++) {
        // get next vertex in list
        // if we've hit the end, wrap around to 0
        next = current+1;
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
function lineLine(x1,y1,x2,y2, x3,y3,x4,y4) {
    // calculate the direction of the lines
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}
