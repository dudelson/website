---
title: "UVa 10258: Contest Scoreboard"
tags: uva 2d-array implementation
---
I did not think that [UVa 10258: Contest Scoreboard](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&category=24&problem=1199) was a well-written problem. The problem statement did not specify the expected behavior well. I imagine this problem was the subject of many clarification requests when it was used in competition. Then again, I probably just need to practice reading problem statements carefully.<!--more--> Things I got wrong in this problem included:

  - I initially assumed that those contestants who only submitted R, E, and U submissions were not to be included in the scoreboard.
  - I didn't realize that penalties are only incurred on solved problems; i.e. if there are several incorrect submissions to a problem but no correct submission, there is no time penalty.
  - I didn't realize that no additional time penalties are awarded after the first correct submission for a problem is received.
  - I wrongly assumed by the same token that subsequent correct submissions after the first are counted. In fact, you're supposed to ignore them.
    
While these things seem obvious in retrospect, it took me many WA attempts before I got AC. I am extremely grateful for [uDebug](http://www.udebug.com/UVa/10258). Without more complete tests to check my program against, I don't think I could have solved this problem.

The other thing that I thought was a little tricky in this problem was reading the input. Usually I try to avoid `stringstream` because I dislike how you have to instantiate another class just to parse ints from a string, but for this problem I found its use to be unavoidable. There must be a way to do this with `<cstdio>`, but I am not aware of it now. I will update if I find a better way to parse this problem's input.

Lastly, I have learned to be careful using `memset` on 2D arrays. Based on how `memset` works with 1D arrays, I thought the following code would be enough to zero my 2D arrays:

{% highlight c++ %}
    int array[n][m];
for(int i=0; i<n; i++) memset(array[i], 0, m);
{% endhighlight %}

Alas, this was not the way. Doing this results in random entries in the array not being zeroed or set to random values. Clearly I do not understand 2D arrays well enough yet. I will update this post when I know why this happens.

**UPDATE**: Don't use memset at all! It is better to use `fill_n` from the `<algorithm>` header, which takes a more intuitive length parameter the same as other STL functions. Initializing a 2D nxm array using fill_n looks like:
{% highlight c++ %}
    int array[n][m];
for(int i=0; i<n; i++) fill_n(array[i], m, 0);
{% endhighlight %}
Just like we would expect!

Here's my solution:

{% highlight c++ %}
{% include_relative downloads/uva/10258.cpp %}
{% endhighlight %}
