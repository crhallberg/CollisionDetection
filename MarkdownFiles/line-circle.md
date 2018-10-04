# LINE/CIRCLE
To check if a circle is hitting a line, we use code from previous examples &mdash; a practice that we'll use through the rest of the book. The resulting math behind this gets a little hairy, but we'll simplify the harder parts.

First, let's test if either of the ends of the line are inside the circle. This is likely to happen if the line is much smaller than the circle. To do this, we can use [Point/Circle](point-circle.php) from the beginning of the book. If either end is inside, return `true` immediately and skip the rest.

```javascript
var inside1 = pointCircle(x1,y1, cx,cy,r);
var inside2 = pointCircle(x2,y2, cx,cy,r);
if (inside1 || inside2) return true;
```

Next, we need to get closest point on the line. To start, let's get the length of the line using the Pythagorean Theorem:

```javascript
var distX = x1 - x2;
var distY = y1 - y2;
var len = sqrt( (distX*distX) + (distY*distY) );
```

Then, we get a value we're calling `dot`. If you've done vector math before, this is the same as doing the [dot product](http://en.wikipedia.org/wiki/Dot_product) of two vectors. If this isn't familiar, no worry! Consider this step a lot of math you can be glad not to have to solve by hand:

```javascript
var   = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / pow(len,2);
```

Finally, we can use this equation to find the closest point on the line:

```javascript
var closestX = x1 + (dot * (x2-x1));
var closestY = y1 + (dot * (y2-y1));
```

However, this returns a point anywhere on the line as it extends to infinity in both directions. In other words, it could give us a point off the end of the line! So let's check if that closest point is actually on the line using the [Line/Point](line-point.php) algorithm we just made. This is the first of many times we'll nest previous functions when working on more complex collisions.

If the point is on the line, we can keep going. If not, we can immediately return `false`, since that means the closest point is off one of the ends:

```javascript
var onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
if (!onSegment) return false;
```

Finally, we get the distance from the circle to the closest point on the line, once again using the Pythagorean Theorem:

```javascript
distX = closestX - cx;
distY = closestY - cy;
var distance = sqrt( (distX*distX) + (distY*distY) );
```

If that distance is less than the radius, we have a collision (same as [Point/Circle](point-circle.php)).

```javascript
if (distance <= r) {
    return true;
}
return false;
```

Here's a full example putting everything together. Notice that we have three functions at the bottom: the one we just built and two previous functions.

```javascript
{{ code }}
```

Math using lines can benefit from some of the built-in functionality of the `PVector` class. If you haven't used PVectors before, it may be worth some time to get familiar with them. The Processing website has a [good tutorial](https://processing.org/tutorials/pvector/). Daniel Shiffman's excellent ["Nature of Code"](http://natureofcode.com/book/) book deals with vectors quite a bit and is a very friendly introduction. We'll cover PVectors a little bit when we start working with polygons, if you want a very short introduction.

This example was based on code by [Philip Nicoletti](http://www.codeguru.com/forum/showthread.php?threadid=194400) (thanks!). This [CodeGuru post](http://www.codeguru.com/forum/showthread.php?threadid=194400) inclues a lot more discussion of how this algorithm works and the math behind it, if you're so inclined.