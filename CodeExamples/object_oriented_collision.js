// a single Circle object, controlled by the mouse
var mouseCircle;

// a list of rectangles
var rects = new Array(8);

function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent("sketch");

    // create a new Circle with 30px radius
    mouseCircle = new Circle(0, 0, 30);

    // generate rectangles in random locations
    // but snap to grid!
    for (var i = 0; i < rects.length; i++) {
        var x = round(random(50, width - 50) / 50) * 50;
        var y = round(random(50, height - 50) / 50) * 50;
        rects[i] = new Rectangle(x, y, 50, 50);
    }
}

function draw() {
    background(255);

    // go through all rectangles...
    for (var i = 0; i < rects.length; i++) {
        rects[i].checkCollision(mouseCircle); // check for collision
        rects[i].display(); // and draw
    }

    // update circle's position and draw
    mouseCircle.update();
    mouseCircle.display();
}

// Circle class
class Circle {
    constructor(_x, _y, _r) {
        this.x = _x;
        this.y = _y;
        this.r = _r;
    }

    update() {
        this.x = mouseX;
        this.y = mouseY;
    }

    display() {
        fill(0, 150);
        noStroke();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}

// Rectangle class
class Rectangle {
    constructor(_x, _y, _w, _h) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.hit = false;
    }

    // check for collision with the circle using the
    // Circle/Rect function we made in the beginning
    checkCollision(c) {
        this.hit = circleRect(c.x, c.y, c.r, this.x, this.y, this.w, this.h);
    }

    // draw the rectangle
    // if hit, change the fill color
    display() {
        if (this.hit) fill(255, 150, 0);
        else fill(0, 150, 255);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
}

// CIRCLE/RECTANGLE
function circleRect(cx, cy, radius, rx, ry, rw, rh) {
    // temporary variables to set edges for testing
    var testX = cx;
    var testY = cy;

    // which edge is closest?
    // test left edge
    if (cx < rx) testX = rx;
    else if (cx > rx + rw)
        // right edge
        testX = rx + rw;
    // top edge
    if (cy < ry) testY = ry;
    else if (cy > ry + rh)
        // bottom edge
        testY = ry + rh;

    // get distance from closest edges
    var distance = dist(cx, cy, testX, testY);

    // if the distance is less than the radius, collision!
    if (distance <= radius) {
        return true;
    }
    return false;
}
