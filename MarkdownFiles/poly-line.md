# POLYGON/LINE

Checking if a line is hitting a polygon is very much like the [Rectangle/Line](rect-line.html) example. We go through each side of the polygon and do a [Line/Line](line-line.html) check.

In this example, we make a nice regular polygon with 16 sides (a [hexadecagon](http://en.wikipedia.org/wiki/Hexadecagon)). The points are stored in an array of PVectors again:

```javascript
var vertices = [];

// generate a nice, even polygon
var angle = TWO_PI / vertices.length;
for (var i=0; i<vertices.length; i++) {
    var a = angle * i;
    var x = 300 + cos(a) * 100;
    var y = 200 + sin(a) * 100;
    vertices[i] = createVector(x,y);
}
```

We do the same for loop that walks through the vertices and gets the current point, as well as the point one step ahead in the array.

```javascript
var next = 0;
for (var current=0; current<vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+1;
    if (next == vertices.length) next = 0;
}
```

Now we can get the X/Y coordinates of those two points, which form a line:

```javascript
var x3 = vertices[current].x;
var y3 = vertices[current].y;
var x4 = vertices[next].x;
var y4 = vertices[next].y;
```

And we can pass that to a [Line/Line](line-line.php) collision. If any of the lines hit, we can immediately send back `true`. This saves processing, since we can skip computing the remaining sides. If we get to the end and haven't had a hit, we return `false`.

```javascript
var hit = lineLine(x1,y1,x2,y2, x3,y3,x4,y4);
if (hit) {
    return true;
}
```

Here's a full example:

```javascript
{{ code }}
```
