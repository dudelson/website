---
title: "UVa 793: Network Connections"
tags: uva ufds
---
[UVa 793: Network Connections](https://uva.onlinejudge.org/external/7/p793.pdf) is a good UFDS implementation practice problem.
<!--more-->
This problem can be solved efficiently by using a UFDS (if you are not familiar with the UFDS, I wrote more about it [here](http://udelson.me/blog/2015/07/24/uva-599-the-forrest-for-the-trees/)).

I did make one big mistake while solving this problem which involved how I read the input. I read the integer ids of the computers to be connected like this: `int a = s[2]-'0'`, where `s` is the entire line of input I had just read in. But this only works for one-digit numbers! Even worse, there's no explicit error thrown when the numbers are greater than 1 digit; it just means that I more than likely end up reading some character that isn't a number, which results in bizarre and intractible errors. I have to admit that I dislike using stringstream...

{% include gist.html url="https://gist.github.com/dudelson/a53d77bdcd8e09c3302b892893b61de3" %}
