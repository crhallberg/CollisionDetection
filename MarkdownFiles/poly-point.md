# POLYGON/POINT
Circle and rectangle collisions are great, and oftentimes simplifying the collision of complex shapes using bounding boxes and circles makes sense. But there are applications when we want more accuracy. Fortunately, most of the remaining examples use ideas we've already covered, even if how we apply them gets more complicated.

In this first example, we'll check if a point is inside a complex polygon. We define our polygon using a set of X/Y points called *vertices*. To store these points, we'll use an array of `Vector` objects. Vectors simply store X/Y (or X/Y/Z) coordinates. This makes storing points a little easier, and Processing gives us some fancy math for Vectors that would be tricky otherwise. If you haven't used Vectors before, read at least the first part of [this tutorial on the Processing site](https://processing.org/tutorials/Vector/) before continuing.

First, we create an array of four Vectors, one for each corner of our polygon:

```javascript
var vertices = [];
```

Then, we set their X/Y positions. Here we're drawing a distorted trapezoid (like above), but you could make more complicated shapes, or even randomize the points!

```javascript
vertices[0] = createVector(200,100); // set X/Y position
vertices[1] = createVector(400,130);
vertices[2] = createVector(350,300);
vertices[3] = createVector(250,300);
```

To check for collision, we're going to use a separate boolean variable. This will be inside our function later, so if this gets confusing, jump to the full example at the bottom.

```javascript
var collision = false;
```

Then we need to go through the vertices one-by-one. To do this we use a for loop with the variable `current`. But also want the next vertex in the list so we can form a line (a side of the polygon). To do this, we use a second variable called `next`. Here's what the loop looks like:

```javascript
var next = 0;
for (var current = 0; current < vertices.length; current++) {
    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1;
    if (next == vertices.length) next = 0;
}
```

Then we can use `current` and `next` to retrieve the Vectors from our array:

```javascript
var vc = vertices[current]; // c for "current"
var vn = vertices[next];    // n for "next"
```

Now for the if statement. We can access the X/Y coordinates of each vertex using the syntax `vc.x` and `vc.y`. This statement is pretty tricky, so here's the whole thing, then we'll break it down into its parts:

```javascript
if (
    ((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
    px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x
) {
    collision = !collision;
}
```

There are two tests happening here. The first checks if the point is between the two vertices in the Y direction:

```javascript
(vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)
```

We test if the point is either above `vc.y` and below `vn.y`, or below `vc.y` and above `vn.y`. Here's what this looks like visually:

![Diagram of a point above/below the Y coordinates of a polygon](images/poly-point.jpg)

Note: There's a fancier, more concise way of writing this if statement, if you prefer:

```javascript
(vc.y > py) != (vn.y > py)
```

That's a little confusing: it does the same test, but only evaluates `true` if both tests are not the same as each other!

Next up is a more complicated test. This is based on the [Jordan Curve Theorem](http://en.wikipedia.org/wiki/Jordan_curve_theorem), which is pretty intense math so we'll skip explaining it. (If you  understand how this algorithm works, please do let me know!)

```javascript
px < (vn.x-vc.x) * (py-vc.y) / (vn.y-vc.y) + vc.x
```

If both checks are true, we switch `collision` to its opposite value. This is different than our previous tests, where we set the collision to simply `true` or `false`. After we've gone through all the vertices, whatever the final state of `collision` is is the result.

```javascript
// set collision to the opposite of its current state
collision = !collision;
```

Here's a full example with everything together:

```javascript
{{ code }}
```

This function is designed to take any number of vertices, so it can handle very complex shapes! However, the more vertices you check, the slower the function will be. If you wanted to do this in a full game, even just a few of these tests on complex shapes could slow your game to a crawl. Balance the need for accuracy with speed: whatever feels intuitive is probably the right way to go.

This example is based on [this answer by nirg and Pranav from StackOverflow](http://stackoverflow.com/a/2922778/1167783).
