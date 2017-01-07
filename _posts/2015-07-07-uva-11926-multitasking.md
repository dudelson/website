---
title: "UVa 11926: Multitasking"
tags: uva implementation
gist: https://gist.github.com/dudelson/5ae979ff839d85f7390acf62a24d6e68
---
I found [UVa 11926: Multitasking](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=3077) to be a tricky problem to get right. <!--more--> My first solution got TLE. However, when I rewrote the same solution from scratch, it passed, and was in the top 10 in terms of time! Between my two solutions, the algorithm is the same. The biggest differnce as far as I can tell is conciseness. The second time I typed up my solution, the code was much cleaner. This leads me to believe that I had a bug in my first solution that was causing an infinite loop, but I was having trouble finding it because my code was messy. When I typed it the second time, my code was cleaner and the bug went away! The lesson I'm taking from solving this problem is: Clean solutions lead to fewer bugs. It is one thing to know how to solve a problem (i.e. what algorithm or variation thereof to use), but it is quite another to implement it cleanly and *fast*! Practice makes perfect.

Another thing I want to mention before I show my solution is that like on some previous problems, I did a poor job bounds-checking my array operations at first, and I had poor test cases, so it took a while so me to catch this bug. Each UVa problem I solve reinforces more and more how important good test cases are.
