import React, { useEffect, useRef, useMemo, useState } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { selectRecurrentErrors } from "../../../features/exercices/exerciceSelector";
import Box from "@mui/material/Box";

const ForceDirectedGraph = ({ tab, wordErrors }) => {
  const svgRef = useRef(null);
  const recurrentErrors = useSelector(selectRecurrentErrors);
  const [currentLegend, setCurrentLegend] = useState([]);

  const convertToObjectArray = (errors) => {
    const result = [];

    if (errors) {
      for (const category in errors) {
        const categoryObject = {};
        const formCounts = {};
        if (errors[category]) {
          errors[category].map((error) => {
            const { form } = error;
            formCounts[form] = (formCounts[form] || 0) + 1;
          });

          categoryObject[category] = formCounts;
          result.push(categoryObject);
        }
      }
    }

    return result;
  };

  const data = useMemo(() => {
    let newData = [];
    if (tab === "tab2") {
      wordErrors = convertToObjectArray(wordErrors);
      let maxPercentage = 0;
      let legends = [];

      wordErrors.forEach((wordError) => {
        const category = Object.keys(wordError)[0];
        const errors = Object.values(wordError[category]);
        errors.forEach((percentage) => {
          if (percentage > maxPercentage) {
            maxPercentage = percentage;
          }
        });
      });

      const MAX_SIZE = 80;
      const scale = MAX_SIZE / maxPercentage;

      wordErrors.forEach((wordError, index) => {
        const category = Object.keys(wordError)[0];
        const errors = Object.entries(wordError[category]);
        errors.forEach(([error, percentage]) => {
          const newSize = percentage * scale;
          newData.push({
            name: error,
            group: index + 1,
            size: newSize,
          });
        });
        legends.push({category});
      });

      setCurrentLegend('legends'+legends);
      console.log(currentLegend);
    } else if (tab === "tab1") {
      recurrentErrors.forEach((recurrentError, index) => {
        const category = Object.keys(recurrentError)[0];
        const errors = Object.entries(recurrentError[category]);

        errors.forEach(([error, percentage]) => {
          newData.push({
            name: error,
            group: index + 1,
            size: percentage,
          });
        });
      });
    } else {
      recurrentErrors.forEach((recurrentError, index) => {
        const category = Object.keys(recurrentError)[0];
        const errors = Object.entries(recurrentError[category]);

        errors.forEach(([error, percentage]) => {
          newData.push({
            name: error,
            group: index + 1,
            size: percentage,
          });
        });
      });
    }
    return newData;
  }, [tab, recurrentErrors, wordErrors]);

  useEffect(() => {
    console.log(data);

    const width = 600;
    const height = 450;

    const x = d3
      .scaleOrdinal()
      .domain([1, 2, 3, 4, 5])
      .range([50, 150, 250, 350, 450]);

    const color = d3
      .scaleOrdinal()
      .domain([1, 2, 3, 4, 5])
      .range([
        "#A1CDF1",
        "#FFB5A7",
        "#FFE6E2",
        "#3D6787",
        "#A1CDF1",
        "#D8ECFC",
      ]);

    const svg = d3.select("#my_dataviz");

    svg.selectAll("*").remove();

    const newSvg = svg
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svgRef.current = newSvg.node();

    const node = d3
      .select(svgRef.current)
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${width / 2}, ${height / 2})`); // Centered

    node
      .append("circle")
      .attr("r", (d) => (d.size || 29) * 1.3)
      .style("fill", (d) => color(d.group))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 4);

    node
      .append("text")
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "black");

    const simulation = d3
      .forceSimulation(data)
      .force("x", d3.forceX().strength(0.05)) // Force horizontale
      .force("y", d3.forceY().strength(0.05)) // Force verticale
      .force(
        "center",
        d3
          .forceCenter()
          .x(width / 2)
          .y(height / 2)
      )
      .force("charge", d3.forceManyBody().strength(-50)) // Force de répulsion, ajustez la force ici
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(0.1)
          .radius((d) => (d.size || 29) * 1.3)
          .iterations(1)
      );

    simulation.nodes(data).on("tick", function () {
      node.attr(
        "transform",
        (d) => `translate(${d.x || width / 2}, ${d.y || height / 2})`
      );
    });
  }, [data]);

  return (
    <div>
      <h2>Erreurs récurrentes :</h2>
      <div id="my_dataviz"></div>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <p>Légende :</p>
        <Box sx={{ display: "flex" }}>
          <Box>
            <p> </p>
          </Box>
          <Box
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#ffe6e2",
              border: "2px solid black",
              borderRadius: "50%",
            }}
          ></Box>
          <p>{currentLegend[0]}</p>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box>
            <p> </p>
          </Box>
          <Box
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#a1cdf1",
              border: "2px solid black",
              borderRadius: "50%",
            }}
          ></Box>
          <p>Conjugaison</p>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box>
            <p> </p>
          </Box>
          <Box
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#ffb5a7",
              border: "2px solid black",
              borderRadius: "50%",
            }}
          ></Box>
          <p>1 erreur</p>
        </Box>
      </Box>
    </div>
  );
};

export default ForceDirectedGraph;
