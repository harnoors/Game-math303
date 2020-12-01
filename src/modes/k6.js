
//var person = prompt("Please enter your name");
//window.alert("Welcome! " + person + " Let's play");
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
player1 = 0;
player2 = 0;

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


function update() {


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


function check(s,t,v){

  update();
  var i = 0;
  var counterSource = 0;
  var counterTarget = 0;
  var targetLinkArray = [];
  var sourceLinkArray = [];
  graphSourceArray = [];
  graphTargetArray = [];
  graphValueArray = [];
  length = 0;


  for(i in graph.links){
    graphSourceArray.push(graph.links[i].source);

    graphTargetArray.push(graph.links[i].target);

    graphValueArray.push(graph.links[i].value);

    length++;

  }
  for (var i = 0; i < length-1; i++) {
    if (graphValueArray[i] == v) {
      if (graphSourceArray[i].id == s) {
        sourceLinkArray.push(graphTargetArray[i].id);
        counterSource++;
      }
      else if (graphTargetArray[i].id == s) {
        sourceLinkArray.push(graphSourceArray[i].id);
        counterSource++;
      }
      else if (graphSourceArray[i].id == t) {
        targetLinkArray.push(graphTargetArray[i].id);
        counterTarget++;
      }
      else if (graphTargetArray[i].id == t) {
        targetLinkArray.push(graphSourceArray[i].id);
        counterTarget++;
      }
    }
  }

  for (var k = 0; k< counterSource; k++) {
    for (var l = 0; l< counterTarget; l++) {
      if (targetLinkArray[l] == sourceLinkArray[k]) {

        if (v == 0) {
          window.alert("Hoooray!!  Red team wins. ");
          window.location.href = 'theory.html';
        } else {
          window.alert("Hoooray!!  Blue team wins. ");
        }
      }
    }
  }
  if (v == 0) {
    player1 += 1;
  } else {
    player2 += 1;
  }
}

var button1 = document
  .getElementById("button1")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "2", value: ctr % 2 });
    check(1,2,ctr % 2);
    document.getElementById("button1").style.visibility = "hidden";
  });
var button2 = document
  .getElementById("button2")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "3", value: ctr % 2 });
    check(1,3,ctr % 2);
    document.getElementById("button2").style.visibility = "hidden";
  });
var button3 = document
  .getElementById("button3")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "4", value: ctr % 2 });
    check(1,4,ctr % 2);
    document.getElementById("button3").style.visibility = "hidden";
  });
var button4 = document
  .getElementById("button4")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "5", value: ctr % 2 });
    check(1,5,ctr % 2);
    document.getElementById("button4").style.visibility = "hidden";
  });
var button5 = document
  .getElementById("button5")
  .addEventListener("click", function () {
    graph.links.push({ source: "1", target: "6", value: ctr % 2 });
    check(1,6,ctr % 2);
    document.getElementById("button5").style.visibility = "hidden";
  });
var button6 = document
  .getElementById("button6")
  .addEventListener("click", function () {
    graph.links.push({ source: "2", target: "3", value: ctr % 2 });
    check(2,3,ctr % 2);
    document.getElementById("button6").style.visibility = "hidden";
  });

var button7 = document
  .getElementById("button7")
  .addEventListener("click", function () {
    graph.links.push({ source: "2", target: "4", value: ctr % 2 });
    check(2,4,ctr % 2);
    document.getElementById("button7").style.visibility = "hidden";
  });

var button8 = document
  .getElementById("button8")
  .addEventListener("click", function () {
    graph.links.push({ source: "2", target: "5", value: ctr % 2 });
    check(2,5,ctr % 2);
    document.getElementById("button8").style.visibility = "hidden";
  });

var button9 = document
  .getElementById("button9")
  .addEventListener("click", function () {
    graph.links.push({ source: "2", target: "6", value: ctr % 2 });
    check(2,6,ctr % 2);
    document.getElementById("button9").style.visibility = "hidden";
  });

var button10 = document
  .getElementById("button10")
  .addEventListener("click", function () {
    graph.links.push({ source: "3", target: "4", value: ctr % 2 });
    check(3,4,ctr % 2);
    document.getElementById("button10").style.visibility = "hidden";
  });

var button11 = document
  .getElementById("button11")
  .addEventListener("click", function () {
    graph.links.push({ source: "3", target: "5", value: ctr % 2 });
    check(3,5,ctr % 2);
    document.getElementById("button11").style.visibility = "hidden";
  });

var button12 = document
  .getElementById("button12")
  .addEventListener("click", function () {
    graph.links.push({ source: "3", target: "6", value: ctr % 2 });
    check(3,6,ctr % 2);
    document.getElementById("button12").style.visibility = "hidden";
  });

var button13 = document
  .getElementById("button13")
  .addEventListener("click", function () {
    graph.links.push({ source: "4", target: "5", value: ctr % 2 });
    check(4,5,ctr % 2);
    document.getElementById("button13").style.visibility = "hidden";
  });

var button14 = document
  .getElementById("button14")
  .addEventListener("click", function () {
    graph.links.push({ source: "4", target: "6", value: ctr % 2 });
    check(4,6,ctr % 2);
    document.getElementById("button14").style.visibility = "hidden";
  });

var button15 = document
  .getElementById("button15")
  .addEventListener("click", function () {
    graph.links.push({ source: "5", target: "6", value: ctr % 2 });
    check(5,6,ctr % 2);
    document.getElementById("button15").style.visibility = "hidden";
  });

function game() {
  run(graph);
}

game(graph);
