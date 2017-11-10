# CIRCLE/<wbr>RECTANGLE
The last example of this section combines the circle and rectangle code together. We have a circle with the position `(cx,cy)` with a radius `r` and a square at `(rx,ry)` with a width/height `(rw,rh)`.

Our code will first test which edge of the rectangle is closest to the circle, then see if there is a collision using the Pythagorean Theorem. Let's create a temporary variable for the square's closest X/Y edges. We'll set them as the circle's position to start:

```javascript
var testX = cx;
var testY = cy;
```

Then we do the following tests:

```
If the circle is to the RIGHT of the square, check against the RIGHT edge.

If the circle is to the LEFT of the square, check against the LEFT edge.

If the circle is ABOVE the square, check against the TOP edge.

If the circle is to the BELOW the square, check against the BOTTOM edge.
```

Here's how that works as an if statement:

```javascript
if (cx < rx)         testX = rx;      // left edge
else if (cx > rx+rw) testX = rx+rw;   // right edge

if (cy < ry)         testY = ry;      // top edge
else if (cy > ry+rh) testY = ry+rh;   // bottom edge
```

Notice the slightly different `if/else` layout. You don't need the curly brackets if your statement is all on one line. This can tidy things up, but be careful you're not saving space at the expense of readable code!

Now that we know which edges to check, we run the Pythagorean Theorem code using the circle's center and the two edges we found above:

```javascript
var distX = cx-testX;
var distY = cy-testY;
var distance = sqrt( (distX*distX) + (distY*distY) );
```

Finally, we compare this distance to the circle's radius:

```javascript
if (distance <= radius) {
    return true;
}
return false;
```

Here's a full example:

```javascript
{{ code }}
```

This example is built on code by [Matt Worden](http://vband3d.tripod.com/visualbasic/tut_mixedcollisions.htm) (thanks!).