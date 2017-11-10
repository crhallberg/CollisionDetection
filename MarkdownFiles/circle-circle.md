# CIRCLE/CIRCLE
Collision with points is fine, but rarely do objects actually occupy a single point in space. Next, we can use the same application of the Pythagorean Theorem from the [Point/Circle](point-circle.php) example to test if two circles are colliding.

First, calculate the distance between the two circle's centers:

```javascript
var distX = c1x - c2x;
var distY = c1y - c2y;
var distance = sqrt( (distX*distX) + (distY*distY) );
```

To check if they are colliding, we see if the distance between them is less than the sum of their radii.

```javascript
if (distance <= c1r+c2r) {
    return true;
}
return false;
```

Built into a full example, it looks like this:

```javascript
{{ code }}
```

**Circle/Circle** collision can be used to create "bounding circles" around more complex objects. While sacrificing accuracy, this kind of collision detection is very fast and can be a good approximation.

![An example of a bounding circle](images/bounding-circle.jpg)
<figcaption>While it includes some areas that aren't part of the shape, a circle is a good approximation of this <a href="http://en.wikipedia.org/wiki/Dodecagon">dodecagon</a>.</figcaption>

You may be wondering why we are only talking about circles and not ellipses. It might seem fairly similar, but the math for [ellipse collision is actually quite complicated](http://stackoverflow.com/questions/2945337/how-to-detect-if-an-ellipse-intersectscollides-with-a-circle). Consider it a great challenge once you master the other collision examples!
