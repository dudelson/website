---
title: "Visualizing My Sleep Patterns"
---
Okay so I will be visualizing my sleep patterns in this post.
<!--more-->

Here they are!

<script src="http://d3js.org/d3.v4.min.js"></script>
<script src="http://dimplejs.org/dist/dimple.v2.3.0.min.js"></script>
<div id="chartContainer"></div>
<script type="text/javascript">
    // based on this post
    // https://hackernoon.com/visualizing-data-in-javascript-with-d3-js-and-dimple-7395681c4b74
    var svg = dimple.newSvg("#chartContainer", 600, 400);
    d3.csv("/static/content/2018/sleep_data.csv", function(data) {
        var chart = new dimple.chart(svg, data);
        chart.addCategoryAxis("x", "date");
        chart.addMeasureAxis("y", "time");
        chart.addSeries("test", dimple.plot.bar);
        chart.draw();
    });
</script>

Pretty cool, right?
