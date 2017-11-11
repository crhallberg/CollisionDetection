<figcaption>Note what happens when the circle is inside<br>the polygon: we'll fix that later.</figcaption>

# POLYGON/<wbr>CIRCLE

To test if a circle has collided with a polygon, we can simplify the problem to a series of [Line/Circle](line-circle.html) collisions, one for each side of the polygon. Since we've already covered the steps to go through the vertices as lines, and [Line/Circle](line-circle.html) collisions, let's just look at the test for each side:

```javascript
var collision = lineCircle(vc.x,vc.y, vn.x,vn.y, cx,cy,r);
if (collision) return true;
```

Cool! We can build on previous code this way, allowing flexible, complex code to emerge from simpler pieces.

Here's the full example:

```javascript
{{ code }}
```

Since `polyCircle()` calls `lineCircle()` which calls `linePoint()`, we could combine these into a single function, but the idea of functions in programming is reusability. Now, if we update `linePoint()`, it carries through all our projects.

But! We have a bit of a problem. Try moving the circle so it's completely inside the polygon. No more collision! These situations are called "edge cases", ones that require a different set of parameters to check for.

In most situations, we don't need to know if the circle is inside: imagine the polygon is a spaceship and the circle is an asteroid. As soon as the asteroid touches the ship, we'd register the collision and do something (like blow up the ship).

If you do need to know if the circle is inside the polygon, you can add two more lines to the `polyCircle()` function (right before the final `return false;`) to test if the center of the circle is inside the polygon:

```javascript
var centerInside = polygonPoint(cx,cy, vertices);
if (centerInside) return true;
 ```

We do this after we test the edges, since those are more likely to be hit first. Unless you need this functionality, leave it out. It requires running through all the vertices of the polygon again, which will slow down your program.
