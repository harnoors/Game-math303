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
  .force("charge", d3.forceManyBody().strength(-200))
  .force(
    "charge",
    d3.forceManyBody().strength(-100).theta(0.6).distanceMax(120)
  )
  .force(
    "collide",
    d3
      .forceCollide()
      .radius((d) => 35)
      .iterations(2)
  )
  .force("center", d3.forceCenter(width / 2, height / 2));
// 0 = blue
// 1 = red
const graph = {
  nodes: [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ],
  links: [],
};

var link, node, label;

var ctr = 0; // start with color blue

function run(graph) {
  link = svg
    .append("g")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .style("stroke", function (d) {
      if (d.value === 0) return "#0000ff";
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

  var allBlue = document.getElementsByClassName("addLink");
  for (var i = 0; i < allBlue.length; i++) {
    allBlue[i].style.boxShadow = " 1px 1px 15px #0ab8f7";
  }
}

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

function checkGraph() {
  // check for a graph if contains a triangle diplay somethings
}

function update() {
  checkGraph();

  svg.selectAll("*").remove();
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

  link = svg
    .append("g")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .style("stroke", function (d) {
      if (d.value === 0) return "#0000ff";
      else return "#ff0000";
    })
    .attr("stroke-width", 3);

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

  simulation.nodes(graph.nodes);
  simulation.force("link").links(graph.links);
  simulation.alpha(1).restart();
  ctr += 1;
  if (ctr % 2 == 0) {
    var all = document.getElementsByClassName("addLink");
    for (var i = 0; i < all.length; i++) {
      all[i].style.boxShadow = " 1px 1px 15px #0ab8f7";
    }
  } else {
    var all = document.getElementsByClassName("addLink");
    for (var i = 0; i < all.length; i++) {
      all[i].style.boxShadow = " 1px 1px 15px #ff0000";
    }
  }
}

function updatelinks(s, t, v) {
  if (v == 1) {
    graph.links.push({ source: s, target: t, value: 1 });
  }
  if (v == 2) {
    graph.links.push({ source: s, target: t, value: 2 });
  }
}

var button1 = document
  .getElementById("button1")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "2", value: ctr % 2 });
    update();
    document.getElementById("button1").style.visibility = "hidden";
  });
var button2 = document
  .getElementById("button2")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "3", value: ctr % 2 });
    update();
    document.getElementById("button2").style.visibility = "hidden";
  });
var button3 = document
  .getElementById("button3")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "4", value: ctr % 2 });
    update();
    document.getElementById("button3").style.visibility = "hidden";
  });
var button4 = document
  .getElementById("button4")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "5", value: ctr % 2 });
    update();
    document.getElementById("button4").style.visibility = "hidden";
  });
var button5 = document
  .getElementById("button5")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "6", value: ctr % 2 });
    update();
    document.getElementById("button5").style.visibility = "hidden";
  });
var button6 = document
  .getElementById("button6")
  .addEventListener("click", function () {
    graph.links.push({ source: "2", target: "3", value: ctr % 2 });
    update();
    document.getElementById("button6").style.visibility = "hidden";
  });

var button7 = document
  .getElementById("button7")
  .addEventListener("click", function () {
    graph.links.push({ source: "2", target: "4", value: ctr % 2 });
    update();
    document.getElementById("button7").style.visibility = "hidden";
  });

var button8 = document
  .getElementById("button8")
  .addEventListener("click", function () {
    graph.links.push({ source: "2", target: "5", value: ctr % 2 });
    update();
    document.getElementById("button8").style.visibility = "hidden";
  });

var button9 = document
  .getElementById("button9")
  .addEventListener("click", function () {
    graph.links.push({ source: "2", target: "6", value: ctr % 2 });
    update();
    document.getElementById("button9").style.visibility = "hidden";
  });

var button10 = document
  .getElementById("button10")
  .addEventListener("click", function () {
    graph.links.push({ source: "3", target: "4", value: ctr % 2 });
    update();
    document.getElementById("button10").style.visibility = "hidden";
  });

var button11 = document
  .getElementById("button11")
  .addEventListener("click", function () {
    graph.links.push({ source: "3", target: "5", value: ctr % 2 });
    update();
    document.getElementById("button11").style.visibility = "hidden";
  });

var button12 = document
  .getElementById("button12")
  .addEventListener("click", function () {
    graph.links.push({ source: "3", target: "6", value: ctr % 2 });
    update();
    document.getElementById("button12").style.visibility = "hidden";
  });

var button13 = document
  .getElementById("button13")
  .addEventListener("click", function () {
    graph.links.push({ source: "4", target: "5", value: ctr % 2 });
    update();
    document.getElementById("button13").style.visibility = "hidden";
  });

var button14 = document
  .getElementById("button14")
  .addEventListener("click", function () {
    graph.links.push({ source: "4", target: "6", value: ctr % 2 });
    update();
    document.getElementById("button14").style.visibility = "hidden";
  });

var button15 = document
  .getElementById("button15")
  .addEventListener("click", function () {
    graph.links.push({ source: "5", target: "6", value: ctr % 2 });
    update();
    document.getElementById("button15").style.visibility = "hidden";
  });

function game() {
  run(graph);
}

game(graph);
