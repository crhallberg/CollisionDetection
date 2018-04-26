var shapes = [];
// circle, controlled by the mouse
var cx = 0;
var cy = 0;
var cr = 30;

function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent("sketch");

    for (var i = 0; i < 50; i++) {
        // 50 of each
        shapes.push(new Circle());
        shapes.push(new Rectangle());
        shapes.push(new Line());
    }
}

function draw() {
    background(255);

    cx = mouseX;
    cy = mouseY;

    // draw us!
    fill(0, 150);
    noStroke();
    ellipse(cx, cy, cr * 2, cr * 2);

    // draw the other shapes
    for (var i = 0; i < shapes.length; i++) {
        shapes[i].update();
        shapes[i].display();
    }
}

/* --- SHAPE OBJECTS --- */

class Circle {
    constructor() {
        this.x = random(width);
        this.y = random(-height, height);
        this.r = random(8, 20);
        this.speed = random(0.5, 2);
        this.hit = false;
    }

    update() {
        this.y += this.speed;
        this.hit = circleCircle(this.x, this.y, this.r, cx, cy, cr);
        // Reset
        if (this.y > height + 50) {
            this.x = random(width);
            this.y = random(-height, -50);
        }
    }

    display() {
        if (!this.hit) fill(0, 150, 255, 150);
        else fill(255, 150, 0, 150);
        noStroke();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}

class Line {
    constructor() {
        this.x1 = random(width);
        this.y1 = random(-height, height);
        this.x2 = this.x1 + random(-20, 20);
        this.y2 = this.y1 + random(-20, 20);
        this.speed = random(0.5, 2);
        this.hit = false;
    }

    update() {
        this.y1 += this.speed;
        this.y2 += this.speed;
        this.hit = lineCircle(this.x1, this.y1, this.x2, this.y2, cx, cy, cr);
        // Reset
        if (this.y1 > height + 50 && this.y2 > height + 50) {
            this.x1 = random(width);
            this.y1 = random(-height, -50);
            this.x2 = this.x1 + random(-20, 20);
            this.y2 = this.y1 + random(-20, 20);
        }
    }

    display() {
        if (!this.hit) stroke(0, 150, 255, 150);
        else stroke(255, 150, 0, 150);
        strokeWeight(5);
        line(this.x1, this.y1, this.x2, this.y2);
    }
}

class Rectangle {
    constructor() {
        this.x = random(width);
        this.y = random(-height, height);
        this.w = random(8, 20);
        this.h = random(8, 20);
        this.speed = random(0.5, 2);
        this.hit = false;
    }

    update() {
        this.y += this.speed;
        this.hit = circleRect(cx, cy, cr, this.x, this.y, this.w, this.h);
        // Reset
        if (this.y > height + 50) {
            this.x = random(width);
            this.y = random(-height, -50);
        }
    }

    display() {
        if (!this.hit) fill(0, 150, 255, 150);
        else fill(255, 150, 0, 150);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
}

/* --- COLLISION FUNCTIONS --- */

// CIRCLE/CIRCLE
function circleCircle(c1x, c1y, c1r, c2x, c2y, c2r) {
    // get distance between the circle's centers
    // use the Pythagorean Theorem to compute the distance
    var distX = c1x - c2x;
    var distY = c1y - c2y;
    var distance = sqrt(distX * distX + distY * distY);

    // if the distance is less than the sum of the circle's
    // radii, the circles are touching!
    if (distance <= c1r + c2r) {
        return true;
    }
    return false;
}

// CIRCLE/RECTANGLE
function circleRect(cx, cy, radius, rx, ry, rw, rh) {
    // temporary variables to set edges for testing
    var testX = cx;
    var testY = cy;

    // which edge is closest?
    if (cx < rx) testX = rx;
    else if (cx > rx + rw)
        // test left edge
        testX = rx + rw; // right edge
    if (cy < ry) testY = ry;
    else if (cy > ry + rh)
        // top edge
        testY = ry + rh; // bottom edge

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

// POINT/CIRCLE
function pointCircle(px, py, cx, cy, r) {
    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    var distX = px - cx;
    var distY = py - cy;
    var distance = sqrt(distX * distX + distY * distY);

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
        return true;
    }
    return false;
}

// LINE/POINT
function linePoint(x1, y1, x2, y2, px, py) {
    // get distance from the point to the two ends of the line
    var d1 = dist(px, py, x1, y1);
    var d2 = dist(px, py, x2, y2);

    // get the length of the line
    var lineLen = dist(x1, y1, x2, y2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    var buffer = 0.1; // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
        return true;
    }
    return false;
}

// LINE/CIRCLE
function lineCircle(x1, y1, x2, y2, cx, cy, r) {
    // is either end INSIDE the circle?
    // if so, return true immediately
    var inside1 = pointCircle(x1, y1, cx, cy, r);
    var inside2 = pointCircle(x2, y2, cx, cy, r);
    if (inside1 || inside2) return true;

    // get length of the line
    var distX = x1 - x2;
    var distY = y1 - y2;
    var len = sqrt(distX * distX + distY * distY);

    // get dot product of the line and circle
    var dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / pow(len, 2);

    // find the closest point on the line
    var closestX = x1 + dot * (x2 - x1);
    var closestY = y1 + dot * (y2 - y1);

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    var onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
    if (!onSegment) return false;

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    var distance = sqrt(distX * distX + distY * distY);

    if (distance <= r) {
        return true;
    }
    return false;
}
