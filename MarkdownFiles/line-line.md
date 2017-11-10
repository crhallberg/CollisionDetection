# LINE/LINE
With this example, you'll be able to build a super-sweet sword fighting game! (Or reboot [one that never got finished](http://www.polygon.com/2014/9/19/6477103/neal-stephensons-kickstarter-clang-cancel)?)

To check if two lines are touching, we have to calculate the distance to the point of intersection:

```javascript
var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
```

If there is a collision, `uA` and `uB` should both be in the range of 0-1. We test for that like this:

```javascript
if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
}
return false;
```

That's it! We can add one more feature, if desired, that will tell us the intersection point of the two lines. This might be useful if, for example, you're making a sword-fighting game and want [sparks to fly where the two blades hit](http://tvtropes.org/pmwiki/pmwiki.php/Main/SwordSparks).

```javascript
var intersectionX = x1 + (uA * (x2-x1));
var intersectionY = y1 + (uA * (y2-y1));
```

Here's the full example:

```javascript
{{ code }}
```

Based on a tutorial by [Paul Bourke](http://paulbourke.net/geometry/pointlineplane), who includes code to test if the lines are parallel and [coincident](http://mathworld.wolfram.com/CoincidentLines.html). Also based on [this post by Ibackstrom](http://community.topcoder.com/tc?module=Static&d1=tutorials&d2=geometry2) and help from [Reddit](http://www.reddit.com/r/math/comments/36dt75/what_does_this_equation_solve_for/crd5mcc).
