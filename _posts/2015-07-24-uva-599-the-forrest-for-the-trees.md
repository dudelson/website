---
title: "UVa 599: The Forrest for the Trees"
tags: uva ufds
gist: https://gist.github.com/dudelson/6c2291ee9618436c1c73a38f05c1576d
---
When solving [UVa 599: The Forrest for the Trees](https://uva.onlinejudge.org/external/5/p599.pdf) I was introduced to a new data structure: the [UFDS](https://en.wikipedia.org/wiki/Disjoint-set_data_structure) 
<!--more-->
(cool education [visualization](http://visualgo.net/ufds.html)). UFDS stands for "union find disjoint set", which more-or-less describes the purpose of the data structure. A UFDS encapsulates information about some number of disjoint sets (sets that have no common elements). It can answer queries about whether two elements are in the same set as well as join two sets in constant time. This makes the UFDS good for problems that involve connected components of graphs.

Before I learned about the UFDS, I tried using an adjacency list plus a set of nodes in order to figure out which nodes were acorns. I kept the adjacency list sorted such that every node in the adjacency list mapped to a list of nodes that were strictly greater than it (alphabetically). This ensured that nodes were not iterated over twice. But this approach is flawed in the case where the parent node of a tree is the largest alphabetically. Thankfully, the UFDS solves this problem beautifully.

However, a plain ol' `vector<int>` UFDS is not sufficient to solve this problem because the nodes are not necessarily alphabetically contiguous (i.e. LMNOP is alphabetically contiguous but AQNX is not). Therefore it is necessary to use maps in place of vectors. This makes the runtime of the UFDS lookup and join operations increase from O(1) to O(logn) (where n is the size of the map), but that is not an issue for this problem. 

Lastly, I suffered from the usual beginner mistakes I am still learning to avoid. These included forgetting to clear the maps at the beginning of each test case, and small typos, most notably `return (p[i] == i) ? i : (p[i] = getSet(i))` in the UFDS function `getSet`, which lead to infinite recursion that took me a while to debug.
