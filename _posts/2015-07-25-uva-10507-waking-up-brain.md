---
title: "UVa 10507: Waking up brain"
tags: uva adjacency-list
---
[UVa 10507: Waking up brain](https://uva.onlinejudge.org/external/105/p10507.pdf) simplified problem statement: There are several areas of the brain, each of which is connected to other areas of the brain. All the regions but 3 are "asleep", but if a region is connected to 3 awake regions for a year, that region wakes up. Given the connections between various parts of the brain and the 3 regions that are initially awake, determine how long the entire brain takes to wake up.
<!--more-->
I solved this problem using an adjacency list, since in this problem, the brain can be represented as a graph. I also kept a bitset, which recorded whether each section of the brain was awake or asleep. To figure out how long the brain takes to wake up, I processed the adjacency list in iterations, looking to see how many sleeping areas of the brain were connected to 3 awake areas each iteration. Those areas would "wake up" this timestep, so I put them in a vector (one mistake I made initially was updating the bitset immediately, which is not correct because the regions of the brain must be processed in discrete timesteps, that is, the state from the beginning of each timestep must be preserved until the entire data structure has been processed, then it gets updated all at once). If this vector was empty after processing the adjacency list, it meant that no new areas of the brain had woken up this year, and therefore the brain would never wake up (I also make the mistake of returning from the main method in this case, when instead I should have skipped to the next test case). Otherwise, the bitset of awake regions of the brain would be updated. This loop is terminated when the number of awake regions in the brain equals the number of total regions.

Once again I have noticed that even a small number of mistakes/typos (in this case I counted two, as described above) can take a long time to debug. Practice makes perfect.

Source:
{% highlight cpp %}
{% include_relative downloads/uva/10507.cpp %}
{% endhighlight %}
