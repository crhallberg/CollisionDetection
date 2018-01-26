# POLYGON/<wbr>RECTANGLE
Like the previous example, collision between a polygon and a rectangle really just requires us to extend existing functions. In this case, we can test if any of the edges of the rectangle are hitting any of the edges of the polygon.

To do this, we test [Line/Rectangle](line-rectangle.html) collision for each side of the polygon. Like our previous exmaples, `vc` and `vn` are the two PVectors forming a side:

```javascript
var collision = lineRect(vc.x,vc.y,vn.x,vn.y, rx,ry,rw,rh);
if (collision) return true;
```

Also like the last example, we can catch the edge case where the rectangle is inside the polygon by testing if its X/Y position (a point) is inside the polygon. This should be left off unless necessary, since like our previous example it requires going through all the vertices of the polygon again, slowing down your program.

```javascript
var inside = polyPoint(vertices, rx,ry);
if (inside) return true;
```

Here's a full example:
```javascript
{{ code }}
```
