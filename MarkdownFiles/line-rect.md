# LINE/RECTANGLE
We've actually already covered how to check if a line has hit a rectangle: it's really just four [Line/Line](line-line.html) collisions, one for each side!

For example, the left edge of the square starts at `(rx,ry)` and extends down to `ry+rh`. We can treat that as a line, using the algorithm we made in the last section:

```javascript
var left = lineLine(x1,y1,x2,y2, rx,ry, rx,ry+rh);
```

This can be more easily visualized like this:

![Dividing a rectangle into four lines](images/line-rect.jpg)

We do the same for the other three sides:

```javascript
var left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
var right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
var top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
var bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
```

If *any* of the above statements are true, the line has hit the rectangle.

```javascript
if (left || right || top || bottom) {
    return true;
}
return false;
```

A full example is below. Note that the red dots are drawn in the [Line/Line](line-line.html) function, showing where the line intersects the rectangle. You can delete them from the function if you don't want them in your finished project.

```javascript
{{ code }}
```

This algorithm can also be used to test [line-of-sight](http://en.wikipedia.org/wiki/Line_of_sight_%28gaming%29). Let's say you have two objects and a rectangular obstacle: if you draw a line between one object and another, then check if it has hit the rectangle, you can tell if the objects can "see" each other or if they are hidden behind the obstacle.

![An example of line of sight](images/line-of-sight.jpg)

For an example of this in code, see the ["Line Of Sight" example](https://github.com/jeffThompson/ProcessingTeachingSketches/blob/master/InteractionAndGames/LineOfSight/LineOfSight.pde) in my [Processing teaching repository](https://github.com/jeffThompson/ProcessingTeachingSketches).
