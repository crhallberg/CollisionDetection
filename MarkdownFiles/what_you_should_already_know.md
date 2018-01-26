# WHAT YOU SHOULD ALREADY KNOW

This book's examples are written in [Processing](http://www.processing.org), a wrapper for the Java programming language. While you need only a little programming experience, you should understand how a basic Processing sketch is structured, how to use variables, how to draw shapes and get input from the mouse, and how `if/else` statements work.

It may be helpful to understand using `PVector` objects to store positions, but we'll cover the basics if you haven't used them before.

At the end, we will talk about using collision in object-oriented code. Understanding object-oriented programming will not be required to use this book, but it will be helpful for using these topics in larger projects with lots of objects hitting each other.


## FUNCTIONS
The core of the collision examples are *functions*, so you will need to be familiar with them to use this book. If you have never created a function, please read this section carefully; if you already understand this topic, you can skip ahead.

A function is a re-usable, self-contained piece of code. Functions are used for operations that you want to perform more than once, like checking for collision between two objects.

A function *returns* (sends back) a variable *type* (like `int` or `boolean`). For example, here's a function that returns the string "Hello!"

```javascript
function sayHi() {
    return "Hello!";
}
```

Note that when we declare the function, we list the variable type to be returned. The function does something useful, then sends data back using the `return` command. If the function doesn't need to return anything (for example, if all it does is draw a rectangle), the type is `void`. Sound familiar? The `setup()` and `draw()` sections of Processing are actually functions!

Functions can also receive *arguments*, or parameters that are fed into them. An argument is given a type and name (which exists only inside the function); multiple arguments are separated by commas. Here's a simple function that adds two numbers:

```javascript
function sum(a, b) {
    return a + b;
}
```

Once finished, you can use the function elsewhere in your code. For example, our `sum()` function above can be used like this:

```javascript
var result = sum(2, 2);
print(result);
```

```
>> 4
```

All of the examples in this book are functions. They are fed parameters of the objects to be tested (such as position or size) and return a `boolean` value whether or not a collision is happening. They could also be modified to return the position of the collision, such as in the [Line/Line](line-line.php) example. Be sure to look at the full code at the end of each example to see how the function is structured and called.
