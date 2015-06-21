---
title: "UVa 10855: Rotated Square"
tags: uva 2d-array brute-force implementation
source: downloads/uva/10855.cpp
---
[Rotated Square](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=1796) is a great problem to tackle if you want practice implementing and manipulating 2D arrays.  <!--more--> Simplified problem statement: Given a larger square grid of uppercase letters and a smaller square grid of lowercase letters, count all the times the smaller grid appears in the larger grid in all of its rotated forms. For some reason, there are no stated bounds on `n` in this problem, which makes it hard to determine whether your solution is sufficiently fast, but in this case the brute-force approach is accepted! This is why I say it is a good implementation practice problem. The algorithm itself isn't difficult to come up with, so all of the errors I received while solving this problem had to do with how I was representing the data in the array. At first, I tried using `vector<string>`s, but this lead to difficulties in rotating the small square, so my AC code uses `char[][]`, which I believe is much simpler to think about. Here is my solution:

{% highlight c++ %}

{% include_relative {{ page.source }} %}

{% endhighlight %}
