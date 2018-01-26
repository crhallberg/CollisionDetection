<figcaption>Refresh your browser for random squares!</figcaption>

# MOVING TO OBJECT-ORIENTED COLLISION
Congrats! You've made it through a *lot* of collision-detection code. But these examples are meant as simple demonstrations of how the algorithms work. Combining them into bigger projects probably means moving your code to an object-oriented approach. (For an excellent introduction to object-oriented programming, see Daniel Shiffman's book ["Nature Of Code"](http://natureofcode.com/book/).)

Why? Let's say we have a circle and a bunch of rectangles (like above). We could store separate positions, sizes, and collisions for each, but that would quickly get messy. Instead, a `Circle` and `Rectangle` class will give our code a lot more power and flexibility.

Let's start with our Circle class:

```javascript
	class Circle {
	  float x, y;    // position
	  float r;       // radius

	  Circle (float _x, float _y, float _r) {
	    x = _x;
	    y = _y;
	    r = _r;
	  }

	  // move into mouse position
	  void update() {
	    x = mouseX;
	    y = mouseY;
	  }

	  // draw
	  void display() {
	    fill(0, 150);
	    noStroke();
	    ellipse(x,y, r*2, r*2);
	  }
	}
```

Pretty straightforward. We can also make a basic Rectangle class:

```javascript
function Rectangle(_x, _y, _w, _h) {
    return (function() {
        var x = _x;
        var y = _y;
        var w = _w;
        var h = _h;
        var hit = false;

        // draw the rectangle
        // if hit, change the fill color
        function display() {
            if (hit) fill(255, 150, 0);
            else fill(0, 150, 255);
            noStroke();
            rect(x, y, w, h);
        }

        return {
            checkCollision: checkCollision,
            display: display,
        };
    })();
}
```

Notice we have a variable for the Rectangle called `hit`. This way we can keep track of whether or not the circle has hit a particular rectangle and change its fill color accordingly. By default, the value is set to `false`.

We have just one `Circle`, but we create an `ArrayList` of `Rectangle` objects. To run everything, here's what our main `draw()` loop looks like:

```javascript
function draw() {
    background(255);

    // go through all rectangles...
    for (var i = 0; i < rects.length; i++) {
        rects[i].checkCollision(mouseCircle); // check for collision
        rects[i].display(); // and draw
    }

    // update circle's position and draw
    mouseCircle.update();
    mouseCircle.display();
}
```

So how do we test if the circle has hit something? Let's create a *method* (an internal function) of the Rectangle class called `checkCollision()`. We'll pass the `Circle` object as an argument, then do a basic [Circle/Rectangle](circle-rect.php) collision test.

```javascript
function checkCollision(c) {
    hit = circleRect(c.x, c.y, c.r, x, y, w, h);
}
```

The result of `circleRect()` sets `hit` to be `true` or `false`, which in turn changes the fill color. Now we just add the test to the `draw()` loop:

```javascript
for (Rectangle r : rects) {
    r.checkCollision(circle);  // check for collision
    r.display();               // and draw
}
```

Pretty cool! Here's the full code:

```javascript
{{ code }}
```

Note that our code is a bit long with all the classes, so the actual Processing file is broken up into separate tabs. This would be a good idea for projects that require several collision functions. You could name the tab "CollisionFunctions" and keep all the code there.

You can see another, more complex example of object-oriented collision in the [Introduction](index.php). It uses a class for circles, rectangles, and lines.
