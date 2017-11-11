var px = 0;      // point position (move with mouse)
var py = 0;

var sx = 200;    // square position
var sy = 100;
var sw = 200;    // and dimensions
var sh = 200;


function setup() {
    var canvas = createCanvas(600,400);
    canvas.parent('sketch');
    noCursor();

    strokeWeight(5);    // thicker stroke = easier to see
}


function draw() {
    background(255);

    // update point to mouse coordinates
    px = mouseX;
    py = mouseY;

    // check for collision
    // if hit, change rectangle color
    var hit = pointRect(px,py, sx,sy,sw,sh);
    if (hit) {
        fill(255,150,0);
    }
    else {
        fill(0,150,255);
    }
    noStroke();
    rect(sx,sy, sw,sh);

    // draw the point
    stroke(0);
    point(px,py);
}


// POINT/RECTANGLE
function pointRect(px,py, rx,ry,rw,rh) {
    // is the point inside the rectangle's bounds?
    if (px >= rx &&        // right of the left edge AND
        px <= rx + rw &&   // left of the right edge AND
        py >= ry &&        // below the top AND
        py <= ry + rh      // above the bottom
    ) {
        return true;
    }
    return false;
}
