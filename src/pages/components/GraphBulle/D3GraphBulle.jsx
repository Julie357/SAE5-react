import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSelector } from "react-redux";
import { selectRecurrentErrors } from "../../../features/exercices/exerciceSelector";

const ForceDirectedGraph = () => {
  const svgRef = useRef(null);
  const recurrentErrors = useSelector(selectRecurrentErrors);

  useEffect(() => {
    const width = 600;
    const height = 450;

    const x = d3.scaleOrdinal()
      .domain([1, 2, 3, 4, 5])
      .range([50, 150, 250, 350, 450]);

    const color = d3.scaleOrdinal()
      .domain([1, 2, 3, 4, 5])
      .range(["#A1CDF1", "#FFB5A7", "#FFE6E2", "#3D6787", "#A1CDF1", "#D8ECFC"]);

    const data1 = [{ "name": "nom", "group": 1, "size": 20 }, { "name": "conjugaison", "group": 2, "size": 60 }, { "name": "be + ing", "group": 3, "size": 40 }, { "name": "pronom", "group": 4, "size": 50 }, { "name": "adjectif", "group": 5, "size": 30 }, { "name": "verbe", "group": 6, "size": 40 }];

    const data = [];
    recurrentErrors.forEach((recurrentError, index) => {
      const category = Object.keys(recurrentError)[0];
      const errors = Object.entries(recurrentError[category]);

      errors.forEach(([error, percentage]) => {
        data.push({
          name: error,
          group: index + 1,
          size: percentage,
        });
      });
    });

    console.log("Data:", data);
    const svg = d3.select("#my_dataviz");

    // Remove existing SVG elements
    svg.selectAll('*').remove();

    // Append SVG
    const newSvg = svg
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svgRef.current = newSvg.node();

    const node = d3.select(svgRef.current).selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${width / 2}, ${height / 2})`); // Centered

    // Ajouter le cercle à chaque groupe
    node.append("circle")
      .attr("r", d => (d.size || 29) * 1.3)
      .style("fill", d => color(d.group))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 4);

    // Ajouter le texte centré à chaque groupe
    node.append("text")
      .text(d => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "black")
      .style("font-size", d => {
        // Calculer la taille de police en fonction de la taille de la bulle
        const fontSize = Math.min(2 * (d.size || 29), 20);
        return `${fontSize}px`;
      })
      .style("pointer-events", "none") // Empêcher le texte d'interférer avec les événements de la souris sur la bulle
      .call(wrapText); // Appeler la fonction wrapText pour gérer le texte long

      function wrapText(selection) {
        selection.each(function(d) {
          const text = d3.select(this);
          const radius = (d.size || 29) * 1.3;
          const maxWidth = radius * 2; // Largeur maximale pour le texte
          const lineHeight = 1.2; // Hauteur de ligne
          const words = d.name.split(/\s+/).reverse();
          let word;
          let line = [];
          let lineNumber = 0;
          const y = text.attr("y");
          const dy = parseFloat(text.attr("dy"));
          let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > maxWidth && line.length > 1) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }
      
      const simulation = d3.forceSimulation(data)
      .force("x", d3.forceX().strength(0.05)) // Force horizontale
      .force("y", d3.forceY().strength(0.05)) // Force verticale
      .force("center", d3.forceCenter().x(width / 2).y(height / 2))
      .force("charge", d3.forceManyBody().strength(-50)) // Force de répulsion, ajustez la force ici
      .force("collide", d3.forceCollide().strength(0.1).radius(d => (d.size || 29) * 1.3).iterations(1));


    simulation
      .nodes(data)
      .on("tick", function () {
        node.attr("transform", d => `translate(${d.x || width / 2}, ${d.y || height / 2})`);
      });
  }, []);

  return <div><h2>Erreurs récurrentes :</h2><div id="my_dataviz"></div></div>;
};

export default ForceDirectedGraph;
