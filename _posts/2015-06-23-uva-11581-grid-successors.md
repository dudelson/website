---
title: "UVa 11581: Grid Successors"
tags: uva implementation 2d-array
---
I really liked UVa 11581 [Grid Successors](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=2628) because it is a perfect example of the good things that can happen if you don't let the problem statement scare you. <!--more--> Perhaps if you have not studied functions formally you may think that this problem is beyond your reach, but in fact beyond the mumbo-jumbo is a straightforward implementation problem. If you play around with the function in question, which sets each cell to the value of the adjacent cells XOR'd together, you'll find that all the examples in the sample input become a grid of all 0s in just a few iterations. This is important because when you apply the function to the "zero grid", you get the zero grid back, which means that k_g of the zero grid is infinite. This begs the question of whether *all* possible grids eventually reduce to the zero grid. If this is the case, then the problem could be solved by finding the index at which each input grid becomes the zero grid and returning that index minus one. I opted to write a program to check every grid instead of trying to prove the result on paper, because a) there are only 2^9 = 512 grids to check, and b) the checker program is very similar to the problem solution (I only had to change about 5 lines). I found that every grid tends to the zero grid in four iterations or less, which meant it was ok to go ahead with the naive solution of simulating the problem. I almost opted not to solve this problem because it looked quite difficult at first glance, but I'm glad I gave it a shot. My solution:

{% highlight cpp %}
{% include_relative downloads/uva/11581.cpp %}
{% endhighlight %}