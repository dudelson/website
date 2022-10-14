---
title: "UVa 11991: Easy Problem from Rujia Liu?"
tags: uva
---
[UVa 11991: Easy Problem from Rujia Liu?](https://uva.onlinejudge.org/external/119/p11991.pdf) simplified problem statement: You are given an array of integers and asked to answer a series of queries. Each query is of the form: "What is the index in the array of the ith occurance of the number j?" 
<!--more-->
This is another good adjacency list practice problem. By keeping an adjacency list of the indexes at which each number can be found, the queries can be answered in constant time!

{% include "gist" url="https://gist.github.com/dudelson/13a5c58dda3a4a89b5c99b7d2aef5e04" %}
