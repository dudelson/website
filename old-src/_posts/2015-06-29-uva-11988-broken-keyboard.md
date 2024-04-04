---
title: "UVa 11988: Broken Keyboard"
tags: uva linked-list 
---
[UVa 11988: Broken Keyboard](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=3139) is a very rare linked list problem. <!--more--> It requires the `<list>` header. A linked list is best for this problem because the problem requires fast insertion at a particular node (either the front or the back of the list), but never requires direct access to an element by its index. My solution:

{% include gist.html url="https://gist.github.com/dudelson/4e86862910b66edcc74bc6d6b750256f" %}
