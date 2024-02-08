import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as d3 from "d3";
import React, { useEffect, useMemo, useRef, useState } from "react";

const BubbleRecurrentWords = ({ allRecurrentWords }) => {
  const svgRef = useRef(null);
  const [currentLegend, setCurrentLegend] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [graphTitle, setGraphTitle] = useState("");

  const data = useMemo(() => {
    setIsEmpty(false);
    setCurrentLegend([]);
    let newData = [];
    let legends = [];
    let maxPercentage = 0;

    const recurrentWords = {
      Conjugaison: [],
      Ponctuation: [],
      Grammaire: [],
    };

    for (const pos in allRecurrentWords) {
      const percentage = allRecurrentWords[pos];
      switch (pos) {
        case "NOUN":
        case "ADJ":
        case "PROPN":
        case "PRON":
        case "ADP":
        case "PART":
        case "SCONJ":
          recurrentWords.Grammaire.push({ [pos]: percentage });
          break;

        case "VERB":
        case "AUX":
          recurrentWords.Conjugaison.push({ [pos]: percentage });
          break;

        case "PUNCT":
          recurrentWords.Ponctuation.push({ [pos]: percentage });
          break;

        default:
          break;
      }
    }

    for (const category in recurrentWords) {
      const categoryArray = recurrentWords[category];
      categoryArray.forEach((wordObject) => {
        const percentage = Object.values(wordObject)[0]; // Récupérer le pourcentage
        if (percentage > maxPercentage) {
          maxPercentage = percentage;
        }
      });
    }

    const MAX_SIZE = 50;
    const scale = MAX_SIZE / maxPercentage;

    if (recurrentWords) {
      const categories = Object.keys(recurrentWords);
      categories.forEach((category) => {
        const categoryArray = recurrentWords[category];
        categoryArray.forEach((wordObject) => {
          const word = Object.keys(wordObject)[0];
          console.log(word);
          const percentage = wordObject[word];
          console.log(percentage);
          newData.push({
            name: word,
            group: category,
            size: percentage * scale,
          });
        });
        legends.push(category);
      });

      setGraphTitle("Distribution des mots par récurrence :");
    }

    if (newData.length === 0) {
      setIsEmpty(true);
    }

    setCurrentLegend(legends);
    return newData;
  }, [allRecurrentWords]);

  useEffect(() => {
    const width = 600;
    const height = 450;

    const color = d3
      .scaleOrdinal()
      .domain([1, 2, 3])
      .range(["#A1CDF1","#FFB5A7","#CF97C4",   ]);

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
      .attr("transform", () => `translate(${width / 2}, ${height / 2})`);

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
      <Typography
        variant="h5"
        style={{
          textDecoration: "underline",
          marginTop: "0.5vh",
          marginLeft: "0.5vw",
        }}
      >
        {graphTitle}
      </Typography>
      {!isEmpty ? (
        <div style={{ display: "flex" }}>
          <div id="my_dataviz"></div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Légende :
            </Typography>
            {console.log("legende" + currentLegend)}

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

export default BubbleRecurrentWords;
