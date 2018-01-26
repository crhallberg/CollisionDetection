var cx = 0;    // position of the circle
var cy = 0;
var r =  30;   // circle's radius

// array of PVectors, one for each vertex in the polygon
var vertices = [];


function setup() {
    var canvas = createCanvas(600,400);
    canvas.parent('sketch');
    noStroke();

    // set position of the vertices (here a trapezoid)
    vertices[0] = createVector(200,100);
    vertices[1] = createVector(400,100);
    vertices[2] = createVector(350,300);
    vertices[3] = createVector(250,300);
}


function draw() {
    background(255);

    // update circle to mouse coordinates
    cx = mouseX;
    cy = mouseY;

    // check for collision
    // if hit, change fill color
    var hit = polyCircle(vertices, cx,cy,r);
    if (hit) fill(255,150,0);
    else fill(0,150,255);

    // draw the polygon using beginShape()
    noStroke();
    beginShape();
    for (var i=0; i<vertices.length; i++) {
        var v = vertices[i];
        vertex(v.x, v.y);
    }
    endShape();

    // draw the circle
    fill(0, 150);
    ellipse(cx,cy, r*2,r*2);
}


// POLYGON/CIRCLE
function polyCircle(vertices, cx,cy, r) {

    // go through each of the vertices, plus
    // the next vertex in the list
    var next = 0;
    for (var current=0; current<vertices.length; current++) {

        // get next vertex in list
        // if we've hit the end, wrap around to 0
        next = current+1;
        if (next == vertices.length) next = 0;

        // get the PVectors at our current position
        // this makes our if statement a little cleaner
        var vc = vertices[current];    // c for "current"
        var vn = vertices[next];       // n for "next"

        // check for collision between the circle and
        // a line formed between the two vertices
        var collision = lineCircle(vc.x,vc.y, vn.x,vn.y, cx,cy,r);
        if (collision) return true;
    }

    // the above algorithm only checks if the circle
    // is touching the edges of the polygon – in most
    // cases this is enough, but you can un-comment the
    // following code to also test if the center of the
    // circle is inside the polygon

    // var centerInside = polygonPoint(vertices, cx,cy);
    // if (centerInside) return true;

    // otherwise, after all that, return false
    return false;
}


// LINE/CIRCLE
function lineCircle(x1,y1,x2,y2, cx,cy,r) {
    // is either end INSIDE the circle?
    // if so, return true immediately
    var inside1 = pointCircle(x1,y1, cx,cy,r);
    var inside2 = pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;

    // get length of the line
    var distX = x1 - x2;
    var distY = y1 - y2;
    var len = sqrt( (distX*distX) + (distY*distY) );

    // get dot product of the line and circle
    var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / pow(len,2);

    // find the closest point on the line
    var closestX = x1 + (dot * (x2-x1));
    var closestY = y1 + (dot * (y2-y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    var onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    var distance = sqrt( (distX*distX) + (distY*distY) );

    // is the circle on the line?
    if (distance <= r) {
        return true;
    }
    return false;
}


// LINE/POINT
function linePoint(x1,y1,x2,y2, px,py) {

    // get distance from the point to the two ends of the line
    var d1 = dist(px,py, x1,y1);
    var d2 = dist(px,py, x2,y2);

    // get the length of the line
    var lineLen = dist(x1,y1, x2,y2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    var buffer = 0.1;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range, rather
    // than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
        return true;
    }
    return false;
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


// POLYGON/POINT
// only needed if you're going to check if the circle
// is INSIDE the polygon
function polygonPoint(vertices, px,py) {
    var collision = false;

    // go through each of the vertices, plus the next
    // vertex in the list
    var next = 0;
    for (var current=0; current<vertices.length; current++) {

        // get next vertex in list
        // if we've hit the end, wrap around to 0
        next = current+1;
        if (next == vertices.length) next = 0;

        // get the PVectors at our current position
        // this makes our if statement a little cleaner
        var vc = vertices[current];    // c for "current"
        var vn = vertices[next];       // n for "next"

        // compare position, flip 'collision' variable
        // back and forth
        if (((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
            (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)
        ) {
            collision = !collision;
        }
    }
    return collision;
}
