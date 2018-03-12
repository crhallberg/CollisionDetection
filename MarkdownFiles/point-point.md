<figcaption>Use your mouse to collide the two points!</figcaption>

# POINT/POINT

The easiest collision to test is between two points. To test if they are touching, we simply check to see if their X and Y coordinates are the same!

    if (x1 == x2 && y1 == y2) {
    	// points are in the same place: collision!
    }
    else {
    	// not colliding
    }

We can then wrap this up in a function to make the code more usable. As arguments, we pass the X/Y coordinates for both points. The function returns a boolean value of `true` or `false`, depending on whether there is a collision or not.

    boolean pointPoint(float x1, float y1, float x2, float y2) {
    	if (x1 == x2 && y1 == y2) {
    		return true;
    	}
    	return false;
    }

Note the bit of shorthand above: we could specify `else { return true; }`, but our code does the same thing! Our version is a little easier to read, once you get used to it. Think of the `return false;` as the default value to be sent back, unless certain conditions are met.

With our very first collision detection function in hand, we can build a useful example. The gray point is controlled by your mouse (it's drawn with a thicker `strokeWeight` so you can see it). Try bumping into the other point and watch the background change color!

    float px, py;           // point controlled by the mouse
    float targetX = 300;    // target point coordinates
    float targetY = 200;


    void setup() {
      size(600, 400);
      noCursor();

      strokeWeight(5);    // thicker stroke = easier to see
    }


    void draw() {

      // update point position to mouse coordinates
      px = mouseX;
      py = mouseY;

      // check for collision!
      // if hit, make background orange; if not, make it white
      boolean colliding = pointPoint(px, py, targetX, targetY);
      if (colliding) {
        background(255, 150, 0);
      }
      else {
        background(255);
      }

      // draw the two points
      stroke(0,150,255);
      point(targetX, targetY);

      stroke(0,150);
      point(px, py);
    }


    // POINT/POINT
    boolean pointPoint(float x1, float y1, float x2, float y2) {

      // are the two points in the same location?
      if (x1 == x2 && y1 == y2) {
        return true;
      }
      return false;
    }

Congrats, you've written your first program using collision! This basic structure will be the same in all the examples we'll build. Of course, we could add some improvements to this algorithm. Try the [challenge prompts](section_1_challenges.php) at the end of this section and see if you can make it work better.
