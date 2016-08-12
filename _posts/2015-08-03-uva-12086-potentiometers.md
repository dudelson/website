---
title: "UVa 12086: Potentiometers"
tags: uva fenwick-tree
---
[UVa 12086: Potentiometers](https://uva.onlinejudge.org/external/120/p12086.pdf) is a classic [Fenwick Tree](https://en.wikipedia.org/wiki/Fenwick_tree) problem.
<!--more-->
This was my first time solving a problem using a fenwick tree, so I have two things for people who are new to this data structure to keep in mind. First, be mindful of the fact that the fenwick tree requires 1-based indexing. If you pass any of the fenwick tree functions an index of 0, your program will end up inside an infinite loop. Second, in this particular problem, you are given a value to *set* the potentiometer to. This is different from what the fenwick tree function `adjust` does, because `adjust` takes an index and an *increment*. Thus, an vector or array is needed to store the values of the potentiometers so that an increment can be passed to the `adjust` function.

Source:
{% highlight cpp %}
{% include_relative downloads/uva/12086.cpp %}
{% endhighlight %}
