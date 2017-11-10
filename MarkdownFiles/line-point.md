# LINE/POINT
So far, our collisions have mostly been logic and a little bit of addition. Line collision is a little trickier, unless your high school geometry class is still fresh.

A line ([see note](#not-a-line)) is defined by two sets of X/Y coordinates. We can find the length of the line using our old standby the Pythagorean Theorem, but since we'll need to use it three times in this example, let's cheat and use Processing's built-in `dist()` function:

```javascript
var lineLen = dist(x1,y1, x2,y2);
```

We also need to figure out the distance between the point and the two ends of the line:

```javascript
var d1 = dist(px,py, x1,y1);
var d2 = dist(px,py, x2,y2);
```

If `d1+d2` is equal to the length of the line, then we're on the line! This doesn't make intuitive sense, but look at this diagram:

![Forming triangles between a point and line](images/line-point.jpg)

If we collapse the distances, they are longer than the line!

There's a bit of an issue here, though. Since floating-point numbers are so minutely accurate, the collision only occurs if the point is *exactly* on the line, which means we're not going to get a natural-feeling collision. This is very similar to our first example, [Point/Point](point-point.html). To fix this, let's create a small buffer and check if `d1+d2` is +/- that range.

```javascript
var buffer = 0.1;   // higher # = less accurate collision
```

Try playing with this value until you get something that feels right. Using this buffer value, we'll check for a collision:

```javascript
if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
    return true;
}
return false;
```

Here's a full example, combining everything above:

```javascript
{{ code }}
```

<a name="not-a-line"></a>\* OK, technically this would be called a ["line segment"](http://en.wikipedia.org/wiki/Line_segment). But for the sake of simplicity, we'll be referring to these as the generic term "line". [Haters to the left](http://knowyourmeme.com/memes/haters-to-the-left).

This algorithm is thanks to help from [this answer by MrRoy](http://stackoverflow.com/a/17693146/1167783) on StackOverflow.
