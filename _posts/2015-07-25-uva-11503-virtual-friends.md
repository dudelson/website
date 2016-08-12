---
title: "UVa 11503: Virtual Friends"
tags: uva ufds
---
[UVa 11503: Virtual Friends](https://uva.onlinejudge.org/external/115/p11503.pdf) simplified problem statement: Several people are friending each other on social media. Every time two people become friends, print out the current size of their social network.
<!--more-->
This is a classic ufds problem. That is, the friend groups of the people involved can be modeled as disjoint sets. Every time a pair of people friend each other, we join their sets and print its size. It is necessary to replace the arrays that would be used in an integer UFDS with maps in order to accomodate the strings.

Source:
{% highlight cpp %}
{% include_relative downloads/uva/11503.cpp %}
{% endhighlight %}
