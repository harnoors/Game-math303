var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

//var margin  = {top: 10, right: 5, bottom: 10, left: 100},
// width   = 1400-margin.left-margin.right,
// height  = 900-margin.top-margin.bottom;
//used d3 simulation
var simulation = d3
  .forceSimulation()
  .force(
    "link",
    d3.forceLink().id(function (d) {
      return d.id;
    })
  )
  .force("charge", d3.forceManyBody().strength(-100))
  .force("charge", d3.forceManyBody().strength(-200).theta(0.8).distanceMax(80))
  .force(
    "collide",
    d3
      .forceCollide()
      .radius((d) => 5)
      .iterations(2)
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
  ],
  links: [
    //{"source": "1", "target": "2", "value": 1},
    //{"source": "2", "target": "4", "value": 1},
    // {"source": "4", "target": "5", "value": 1},
  ],
};


function run(graph) {
  var link = svg
    .append("g")
    //.style("stroke",  function(d) {if (d.value === 1) return "#0000ff"; else return "#ff0000"})
    //.attr("stroke-width", 3)
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .style("stroke",  function(d) {if (d.value === 1) return "#0000ff"; else return "#ff0000"})
    .attr("stroke-width", 3);

  var node = svg
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

  var label = svg
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
      .style("fill", "#efefff")
      .style("stroke", "#424242")
      .style("stroke-width", "1=5px")
      .attr("cx", function (d) {
        return d.x + 5;
      })
      .attr("cy", function (d) {
        return d.y - 3;
      });

    label
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      })
      .style("font-size", "10px")
      .style("fill", "#333");
  }
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

// function run updates graph
// function game is to add new elements to the graph
//      -- sill need to add color to edges in graph

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

function game() {
  graph.links.push({ source: "4", target: "3", value: 2 });

  graph.links.push({ source: "4", target: "6", value: 1 });

  //graph.links.push({"source": "4", "target": "2", "value": 1})
  run(graph);
}

//graph.links.append(li)
game(graph);
