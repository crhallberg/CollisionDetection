# TRIANGLE/POINT
To test if a point is inside a triangle, we compare the area of the original triangle with the sum of the area of three triangles made between the point and the corners of the triangle.

Here's a diagram demonstrating the triangles created for a point outside and inside the triangle:

![Points outside and inside a triangle, forming three smaller triangles](images/tri-point.jpg)

To get the area, we use [Heron's Forumula](http://en.wikipedia.org/wiki/Heron%27s_formula):

```javascript
var areaOrig = abs( (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1) );
```

We need to calculate the area of the three triangles made from the point as well:

```javascript
var area1 = abs( (x1-px)*(y2-py) - (x2-px)*(y1-py) );
var area2 = abs( (x2-px)*(y3-py) - (x3-px)*(y2-py) );
var area3 = abs( (x3-px)*(y1-py) - (x1-px)*(y3-py) );
```

If we add the three areas together and they equal the original, we know we're inside the triangle! Using this, we can test for collision:

```javascript
if (area1 + area2 + area3 == areaOrig) {
    return true;
}
return false;
```

Here's a full example:

```javascript
{{ code }}
```

This example was built on a modified version of a post on [YoYo Games](http://gmc.yoyogames.com/index.php?showtopic=106307). If you would like to read a lengthy discussion on the merits and problems with this method, and many other suggestions, see [this thread on GameDev.net](http://www.gamedev.net/topic/295943-is-this-a-better-point-in-triangle-test-2d/).
