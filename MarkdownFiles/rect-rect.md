# RECTANGLE/<wbr>RECTANGLE
Moving from [Point/Rectangle](point-rect.php) to two rectangles is easy, but the if statements start to get pretty long. Let's say we have two squares, `r1` and `r2`, with positions and sizes set like the last example. We now have to check:

```
Is the RIGHT edge of r1 to the RIGHT of the LEFT edge of r2?
Is the LEFT edge of r1 to the LEFT of the RIGHT edge of r2?
Is the BOTTOM edge of r1 BELOW the TOP edge of r2?
Is the TOP edge of r1 ABOVE the BOTTOM edge of r2?
```

Yeah, not so intuitive 😖. A picture will probably help:

![Testing rectangle overlap](images/rect-rect.jpg)

To start, let's test the right edge of `r1` with the left edge of `r2`:

```javascript
var r1RightEdge = r1x + r1w;
if (r1RightEdge >= r2x) {
    // right edge of r1 is past left edge of r2
}
```

We can expand this idea, checking all four edges:

```javascript
if (
    r1x + r1w >= r2x && // r1 right edge past r2 left
    r1x <= r2x + r2w && // r1 left edge past r2 right
    r1y + r1h >= r2y && // r1 top edge past r2 bottom
    r1y <= r2y + r2h // r1 bottom edge past r2 top
) {
    return true;
}
```

While the math here is simple addition, this is the trickiest collision for most people to get used to. With practice, you'll be able to picture this in your head. Of course, building a re-usable function makes checking for collisions much easier! In the meantime, it may help to map things out on a piece of paper when you're writing your code.

Here's a full example:

```javascript
{{ code }}
```

It's worth noting two important things here. First, the last two examples use squares, but any rectangle will work with this code. Second, this algorithm assumes you're using the default `rectMode(CORNER)`, which draws rectangles from the top corner and specifies width/height. If you want to use `rectMode(CENTER)`, you'll need to modify this algorithm (see the [Challenge Questions](section_2_challenges.php) at the end of this section).

![Example of a bounding box](images/bounding-box.jpg)

Similar to the [Circle/Circle](circle-circle.php) example, **Rectangle/Rectangle** collision can be used to draw "bounding boxes" around more complex shapes. However, what you gain in performance you lose in accuracy. If you've ever played a game and frustratedly shouted "I totally hit you!" you have probably experienced bounding boxes that don't quite line up with their objects. Find the right balance between actually being correct and what feels right for the user.
