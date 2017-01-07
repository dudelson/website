---
title: "UVa 12532: Interval Product"
tags: uva segment-tree
gist: https://gist.github.com/dudelson/11f9160cee9d1f3ff2d75584f64eee09
---
[UVa 12532: Interval Product](https://uva.onlinejudge.org/external/125/p12532.pdf) involves a clever application of segment trees. Abridged problem statement: You are given a list of integers and a number of queries. Each query can either change one integer in the list, or ask for the sign of the product between a range of indicies. Print out a string with the answers to all the queries concatenated together.
<!--more-->
This problem can be solved with a [segment tree](http://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/), which is quickly becoming one of my favorite data structures. Since each query wants only the sign of the product, taking the actual product is not necessary. Instead, each index in the segment tree will store the sign of the product of the range it represents as a single `char`. This is implemented as two extra functions in the `SegmentTree` class, `combine` and `getSign`. `combine` combines the signs of the products of the two child nodes into the sign of the product of the parent node, and is used in the `build`, `query` and `update` methods. `getSign` is used when a single value in the segment tree is changed; it converts an integer in a char representing its sign. 

When I wrote this solution this first time, I unknowningly did it with a buggy segment tree implementation, so my program often segfaulted in the beginning. However, once I debugged a few lines in the segment tree class, my only other issue was forgetting about the 1-based indexing used by the problem, a detail I seem to be forgetting a lot.
