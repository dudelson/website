---
title: "UVa 11933: Splitting Numbers"
tags: uva implementation
---
[UVa 11933: Splitting Numbers](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=3084) problem summary: Given a number n, print out a and b, where a is the number constructed from every other set bit of n and b is constructed from the other half of the set bits. This problem is simple to implement, but in my case I screwed the implementation up and made things a lot harder for myself. <!--more--> The source of my pain was an overflow error, and I learned that there is a difference between this:

{% highlight cpp %}
    while(1<<i < n)
{% endhighlight %}

and this:

{% highlight cpp %}
    while(1LL<<i < n)
{% endhighlight %}

In the first snippet, `1<<i` is of type `int`, and overflows when i>=31. In the second snippet, care is taken to explicitly cast 1 to type `long long`, so the result of the bitshift is also a `long long` and we're good!

When I read the problem description, I saw that the input was guaranteed to be less than 2^31 - 1, and I immediately assumed that overflow wouldn't be an issue. I wrote my solution using `int`s, and for input larger than 2^30, the overflow error described above occurred, resulting in an infinite loop and a mysterious TL verdict. What's worse, this took me the better part of an hour to debug because of my incorrect assumption. I think the moral is: Always test on the largest input!

My solution:

{% include "gist" url="https://gist.github.com/dudelson/ccc52050195c5e3fd0225e8bd0ec15f9" %}
