// D3GraphBulle.jsx
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import styles from './D3GraphBulle.css'; // Importez les styles

const createBubbleChart = (data, svg, width, height) => {
  // set the dimensions and margins of the graph
  // ... (code D3 existant)

  // Initialize the circle: all located at the center of the svg area
  var node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", function (d) { return size(d.value) })
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", function (d) { return color(d.region) })
    .style("fill-opacity", 0.8)
    .attr("stroke", "black")
    .style("stroke-width", 1)
    .on("mouseover", mouseover) // What to do when hovered
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .call(d3.drag() // call specific function when circle is dragged
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.2).radius(function (d) { return (size(d.value) + 3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
    .nodes(data)
    .on("tick", function (d) {
      node
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
    });

  // What happens when a circle is dragged?
  // function dragstarted(d) {
  //   if (!d3.event.active) simulation.alphaTarget(.03).restart();
  //   d.fx = d.x;
  //   d.fy = d.y;
  // }
  // function dragged(d) {
  //   d.fx = d3.event.x;
  //   d.fy = d3.event.y;
  // }
  // function dragended(d) {
  //   if (!d3.event.active) simulation.alphaTarget(.03);
  //   d.fx = null;
  //   d.fy = null;
  // }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

  // Three function that change the tooltip when user hover / move / leave a cell
  function mouseover(d) {
    Tooltip
      .style("opacity", 1);
  }
  function mousemove(d) {
    Tooltip
      .html('<u>' + d.key + '</u>' + "<br>" + d.value + " inhabitants")
      .style("left", (d3.mouse(this)[0] + 20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px");
  }
  function mouseleave(d) {
    Tooltip
      .style("opacity", 0);
  }

  // create a tooltip
  var Tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // Color palette for continents?
  var color = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Africa", "Oceania", "Americas"])
    .range(d3.schemeSet1);

  // Size scale for countries
  var size = d3.scaleLinear()
    .domain([0, 1400000000])
    .range([7, 55]);  // circle will be between 7 and 55 px wide
};

const D3GraphBulle = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // set the dimensions and margins of the graph
    const width = 460;
    const height = 460;

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Read data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv", function (csvData) {
      // Filter data
      const filteredData = csvData.filter(function (d) { return d.value > 10000000 });
      setData(filteredData);

      createBubbleChart(filteredData, svg, width, height);
    });
  }, []); // Empty dependency array ensures the effect runs once on mount

  return <div id="my_dataviz" className={styles.graphContainer}></div>;
};

export default D3GraphBulle;