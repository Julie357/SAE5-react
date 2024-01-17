import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectRecurrentErrors } from "../../../features/exercices/exerciceSelector";

const CombinedComponent = () => {
  const svgRef = useRef(null);
  const recurrentErrors = useSelector(selectRecurrentErrors);

  useEffect(() => {
    const width = 400;
    const height = 300;

    const svg = d3.select("#my_dataviz");

    // Remove existing SVG elements
    svg.selectAll('*').remove();

    // Append SVG
    const newSvg = svg
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const color = d3.scaleOrdinal()
      .domain([1, 2, 3, 4, 5]) // Replace with the actual domain of your data
      .range(["#FFE6E2", "#D8ECFC", "#FFB5A7", "#3D6787", "#A1CDF1", "#D8ECFC"]);

    const node = d3.select(newSvg.node()).selectAll("g")
      .data(recurrentErrors.map((error, index) => {
        return {
          index: index,
          name: Object.keys(error)[0],
          group: error.someProperty, // Replace with the actual property you want to use
        };
      }))
      .enter()
      .append("g")
      .attr("transform", d => `translate(${width / 2}, ${height / 2})`); // Centered

    // Add a circle to each group
    node.append("circle")
      .attr("r", 20) // Replace with the actual property you want to use
      .style("fill", d => color(d.group))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 4);

    // Add centered text to each group
    node.append("text")
      .text(d => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "black");

    const simulation = d3.forceSimulation(node)
      .force("x", d3.forceX().strength(0.05)) // Horizontal force
      .force("y", d3.forceY().strength(0.05)) // Vertical force
      .force("center", d3.forceCenter().x(width / 2).y(height / 2))
      .force("charge", d3.forceManyBody().strength(-50)) // Repulsion force, adjust the strength here
      .force("collide", d3.forceCollide().strength(0.1).radius(d => d.size || 32).iterations(1));

    simulation
      .on("tick", function () {
        node.attr("transform", d => `translate(${d.x || width / 2}, ${d.y || height / 2})`);
      });
  }, [recurrentErrors]);

  return (
    <div>
      <h2>Nombre erreur (test)</h2>
      <div id="my_dataviz"></div>
      <Box
        component="section"
        sx={{
          backgroundColor: "#ffffff5f",
          borderRadius: "0.6vw",
          height: "62%",
          width: "90%",
          margin: "auto",
          marginTop: "2%",
          padding: "0.8vh 1vw",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.6vh",
            marginBottom: "2vh",
          }}
        >
          Erreurs récurrentes
        </Typography>

        {recurrentErrors.map((recurrentError, index) => (
          <div key={index}>
            <Typography variant="h6" sx={{ marginBottom: "1vh" }}>
              {Object.keys(recurrentError)[0]}
            </Typography>
            <ul>
              {Object.entries(recurrentError[Object.keys(recurrentError)[0]]).map(([key, value]) => (
                <li key={key} style={{ position: "relative", listStyle: "none", marginTop: "1vh" }}>
                  <Typography>
                    {key}: {value}%
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default CombinedComponent;
