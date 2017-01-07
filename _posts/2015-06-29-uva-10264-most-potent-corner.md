---
title: "UVa 10264: The Most Potent Corner"
tags: uva bit-manipulation
gist: https://gist.github.com/dudelson/508f391aa800ec87fe67ee222f9dcfc4
---
I thought [UVa 10264: The Most Potent Corner](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=1205) was a fun problem. Short problem description: Given the weights of all of the corners of an n-dimensional unit cube (1 < n < 15), print the maximum sum of the "potencies" of two neighboring corners. <!--more--> The "potency" of a corner is the sum of the weights of its neighboring corners. Two corners are neighbors if they are connected by an edge of the cube. Furthermore, the corners of the cube are given in a certain order. For a 3D cube, the order is:

  - (0, 0, 0)
  - (0, 0, 1)
  - (0, 1, 0)
  - (0, 1, 1)
  - (1, 0, 0)
  - (1, 0, 1)
  - (1, 1, 0)
  - (1, 1, 1)

This looks just like counting from 0 to 7 in binary! Then we can establish a few thing that will help us solve this problem. An n-dimensional cube has 2^n corners. Additionally, two corners are neighbors if they share an edge. This means they will differ in exactly one coordinate. To check this, we can represent the coordinates as integers (e.g. (1, 0, 1) becomes 5) and xor them together. If they are neighbors, the result of the operation will contain exactly one "set" bit, which is another way of saying that it will be a power of two. We can check whether an integer is a power of two by taking a bitwise and of the integer and its negative and checking that the result is equal to the integer (this is a property of two's complements that I had to play around with for a while before I understood). This is where the function `neighbors` in my solution comes from. The rest of the code is straight-forward since there is enough time to get away with a O(n^2) solution. The only pitfall I encountered while solving this problem is operator precedence. The `==` operator has precendence over the `&` operator, so more parens were required in my `neighbors` function than I originally thought. Here's my code:
