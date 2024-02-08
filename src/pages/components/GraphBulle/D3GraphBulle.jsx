import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as d3 from "d3";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectRecurrentErrors } from "../../../features/exercices/exerciceSelector";

const ForceDirectedGraph = ({ tab, wordErrors, reccurentWords }) => {
  const svgRef = useRef(null);
  const recurrentErrors = useSelector(selectRecurrentErrors);
  const [currentLegend, setCurrentLegend] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [graphTitle, setGraphTitle] = useState("");

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

  const convertWordToObject = (words) => {
    const result = [];

    if (words) {
      for (const category in words) {
        const categoryObject = {};
        const posCounts = {};
        if (words[category]) {
          words[category].map((word) => {
            const { pos } = word;
            posCounts[pos] = (posCounts[pos] || 0) + 1;
          });

          categoryObject[category] = posCounts;
          result.push(categoryObject);
        }
      }
    }

    return result;
  };

  const data = useMemo(() => {
    setIsEmpty(false);
    setCurrentLegend([]);
    let newData = [];
    let legends = [];
    if (tab === "tab2") {
      wordErrors = convertToObjectArray(wordErrors);
      let maxPercentage = 0;

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
        legends.push(category);
      });

      setGraphTitle("Erreurs récurrentes :");
    } else if (tab === "tab1") {
      reccurentWords = convertWordToObject(reccurentWords);
      let maxPercentage = 0;

      reccurentWords.forEach((reccurentWord) => {
        const category = Object.keys(reccurentWord)[0];
        const words = Object.values(reccurentWord[category]);
        words.forEach((percentage) => {
          if (percentage > maxPercentage) {
            maxPercentage = percentage;
          }
        });
      });

      const MAX_SIZE = 70;
      const scale = MAX_SIZE / maxPercentage;

      reccurentWords.forEach((reccurentWord, index) => {
        const category = Object.keys(reccurentWord)[0];
        const words = Object.entries(reccurentWord[category]);
        words.forEach(([word, percentage]) => {
          const newSize = percentage * scale;
          newData.push({
            name: word,
            group: index + 1,
            size: newSize,
          });
        });
        legends.push(category);
      });

      setGraphTitle("Mots par récurrence :");
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
      setGraphTitle("Temps de réflexion par mot :");
    }
    if (newData.length == 0) {
      setIsEmpty(true);
    }

    setCurrentLegend(legends);
    return newData;
  }, [tab, recurrentErrors, wordErrors]);

  useEffect(() => {
    const width = 600;
    const height = 450;

    const x = d3
      .scaleOrdinal()
      .domain([1, 2, 3, 4, 5, 6, 7, 8])
      .range([50, 150, 250, 350, 450, 550, 650, 750]);

    const color = d3
      .scaleOrdinal()
      .domain([1, 2, 3, 4, 5, 6, 7, 8])
      .range(["#A1CDF1", "#FFB5A7", "#CF97C4"]);

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
      .attr("transform", (d) => `translate(${width / 2}, ${height / 2})`);

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
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05))
      .force(
        "center",
        d3
          .forceCenter()
          .x(width / 2)
          .y(height / 2)
      )
      .force("charge", d3.forceManyBody().strength(-50))
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
      <Typography variant="h5" style={{ textDecoration: "underline", marginBottom:"5vh" }}>
        {graphTitle}
      </Typography>
      {!isEmpty ? (
        <div style={{ display: "flex" }}>
          <div id="my_dataviz"></div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Légende :
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#CF97C4",
                  border: "2px solid black",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              ></Box>
              <Typography variant="body1">{currentLegend[2]}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#b1d5f4",
                  border: "2px solid black",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              ></Box>
              <Typography variant="body1">{currentLegend[0]}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#ffb5a7",
                  border: "2px solid black",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              ></Box>
              <Typography variant="body1">{currentLegend[1]}</Typography>
            </Box>
          </Box>
        </div>
      ) : (
        <Typography variant="h6">Aucune erreur référencée</Typography>
      )}
    </div>
  );
};

export default ForceDirectedGraph;
