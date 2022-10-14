---
title: "UVa 978: Lemmings Battle!"
tags: uva implementation
---
I solved [UVa 978: Lemmings Battle!](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=919) with a multiset. A multiset has the same underlying implementation as a regular STL set ([BST](https://en.wikipedia.org/wiki/Binary_search_tree)), but it can store multiple copies of the same value, which makes it perfect for modelling these lemmings.<!--more--> Once we know how to utilize the properties of the multiset to help us solve this problem, it's all about writing out the simulation. One minor implementation detail I will mention here because it tripped me up: It's important to preserve the state from the beginning of each round until the round is over. For this, I created two vectors `gw` and `bw` that kept track of the lemmings which returned from battle. Then after all the battles were finished, I pushed the elements of `gw` and `bw` into the green multiset and the blue multiset, respectively.

{% include "gist" url="https://gist.github.com/dudelson/10ac6dccf795ab360552a50deef34502" %}
