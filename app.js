var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

var simulation = d3
  .forceSimulation()
  .force(
    "link",
    d3.forceLink().id(function (d) {
      return d.id;
    })
  )
  .force(
    "charge",
    d3.forceManyBody().strength(-100).theta(0.6).distanceMax(120)
  )
  .force(
    "collide",
    d3
      .forceCollide(35)
  )
  .force("center", d3.forceCenter(width / 2, height / 2));

const graph = {
  nodes: [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },

  ],
  links: [],
};

var link, node, label;

function run(graph) {
  link = svg
    .append("g")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .style("stroke", function (d) {
      if (d.value === 1) return "#0000ff";
      else return "#ff0000";
    })
    .attr("stroke-width", 3);


  node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("r", 2)
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  label = svg
    .append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(graph.nodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .text(function (d) {
      return d.id;
    });

  simulation.nodes(graph.nodes).on("tick", ticked);
  simulation.force("link").links(graph.links);
}
// s: source node id, t: target node id, v: value
function ticked() {
  link
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });

  node
    .attr("r", 16)
    .style("fill", "#ffff99")
    .style("stroke", "#424242")
    .style("stroke-width", "3px")
    .attr("cx", function (d) {
      return d.x + 5;
    })
    .attr("cy", function (d) {
      return d.y - 3;
    })
    .attr("r", 30);

  label
    .attr("x", function (d) {
      return d.x;
    })
    .attr("y", function (d) {
      return d.y;
    })
    .style("font-size", "15px")
    .style("fill", "#333");
}

function update() {

  node = node.data(graph.nodes, function (d) {
    return d.id;
  });



  node
    .attr("r", 16)
    .style("fill", "#efefff")
    .style("stroke", "#424242")
    .style("stroke-width", "1=5px")
    .attr("cx", function (d) {
      return d.x + 5;
    })
    .attr("cy", function (d) {
      return d.y - 3;
    });


  link
    .transition()
    .attr("stroke-opacity", 0)
    .attrTween("x1", function (d) {
      return function () {
        return d.source.x;
      };
    })
    .attrTween("x2", function (d) {
      return function () {
        return d.target.x;
      };
    })
    .attrTween("y1", function (d) {
      return function () {
        return d.source.y;
      };
    })
    .attrTween("y2", function (d) {
      return function () {
        return d.target.y;
      };
    })
    .style("stroke", function (d) {
      if (d.value === 1) return "#0000ff";
      else return "#ff0000";
    })
    .attr("stroke-width", 3)
    .remove();

  link = svg
    .append("g")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .style("stroke", function (d) {
      if (d.value === 1) return "#0000ff";
      else return "#ff0000";
    })
    .attr("stroke-width", 3);

  // Update and restart the simulation.

  simulation.nodes(graph.nodes);
  simulation.force("link").links(graph.links);
  simulation.alpha(1).restart();
}

/*
function updatelinks(s, t, v) {
  if (v == 1) {
    graph.links.push({ source: s, target: t, value: 1 });
  }
  if (v == 2) {
    graph.links.push({ source: s, target: t, value: 2 });
  }
}
*/

//
function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  if (!d3.event.active) simulation.alphaTarget(0);
}

var button1 = document
  .getElementById("button1")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "2", value: 2 });
    update();
  });
var button2 = document
  .getElementById("button2")
  .addEventListener("click", function () {
    graph.links.push({ source: "2", target: "3", value: 1 });
    update();
  });
var button3 = document
  .getElementById("button3")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "3", value: 2 });
    update();
  });
var button4 = document
  .getElementById("button4")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "5", value: 2 });
    update();
  });
var button5 = document
  .getElementById("button5")
  .addEventListener("click", function () {
    graph.links.push({ source: "5", target: "6", value: 1 });
    update();
  });
var button6 = document
  .getElementById("button6")
  .addEventListener("click", function () {
    graph.links.push({ source: "3", target: "4", value: 1 });
    update();
  });
function game() {

  run(graph);

}



game(graph);
