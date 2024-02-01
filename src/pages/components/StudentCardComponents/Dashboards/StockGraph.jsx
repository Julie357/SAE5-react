import * as d3 from "d3";
import { useEffect, useState } from "react";

function LineChart({ studentExercises }) {
  const width = 500;
  const height = 300;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    } else {
      fetchData();
    }
  }, [data]);

  const fetchData = () => {
    const dateMap = {};
    const LEVEL_TO_INT = {
      0: 0,
      A1: 1,
      A2: 2,
      B1: 3,
      B2: 4,
      C1: 5,
      C2: 6,
    };

    const INT_TO_LEVEL = {
      0: 0,
      1: "A1",
      2: "A2",
      3: "B1",
      4: "B2",
      5: "C1",
      6: "C2",
    };

    studentExercises.forEach((exercice) => {
      const date = exercice.date;
      const value = exercice.exercisesSkillLevel;
      const levelINT = LEVEL_TO_INT[value];
      console.log(levelINT);

      if (dateMap[date]) {
        dateMap[date].totalValue += levelINT;
        dateMap[date].totalCount += 1;
      } else {
        dateMap[date] = {
          totalValue: levelINT,
          totalCount: 1,
        };
      }
    });

    const chartData = Object.keys(dateMap).map((date) => {
      console.log(date);

      const dateObject = new Date(date); // Convert the date string to a Date object

      return {
        label: `${dateObject.getDate()}/${
          dateObject.getMonth() + 1
        }/${dateObject.getFullYear()}`,
        value: dateMap[date].totalCount
          ? INT_TO_LEVEL[
              Math.round(dateMap[date].totalValue / dateMap[date].totalCount)
            ]
          : 0,
        date: dateObject,
      };
    });

    chartData.sort((a, b) => a.date - b.date);

    setData(chartData);
  };

  const drawChart = () => {
    const margin = { top: 10, right: 50, bottom: 50, left: 50 };

    const yValues = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const yMinValue = 0;
    const yMaxValue = 5;

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + 20)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top + 20})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([yMinValue, yMaxValue])
      .range([height, 0]);

    // var Tooltip = d3
    //   .select("#container")
    //   .append("div")
    //   .style("opacity", 0)
    //   .attr("class", "tooltip")
    //   .style("background-color", "white")
    //   .style("border", "solid")
    //   .style("border-width", "2px")
    //   .style("border-radius", "5px")
    //   .style("padding", "5px");

    // // Three function that change the tooltip when user hover / move / leave a cell
    // var mouseover = function (d) {
    //   Tooltip.style("opacity", 1);
    // };
    // var mousemove = (event, d) => {
    //   Tooltip.html(`Exact value: ${d.value}`)
    //   .style("top", d3.event.pageX)
    //   .style("left", d3.event.pageY)
    // };
    // var mouseleave = function (d) {
    //   Tooltip.style("opacity", 0);
    // };

    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#ccc")
      .attr("stroke-opacity", 0.3);

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#ccc")
      .attr("stroke-opacity", 0.3);

    svg
      .append("g")
      .attr("class", "x-axis")
      .call(d3.axisTop().scale(xScale).tickSize(7))
      .attr("transform", `translate(0,0)`);

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(
        d3
          .axisLeft(yScale)
          .tickValues(yValues.map((_, i) => i))
          .tickFormat((d) => yValues[d])
      );

    const line = d3
      .line()
      .x((d) => xScale(d.label) + xScale.bandwidth() / 2)
      .y((d) => yScale(yValues.indexOf(d.value)));

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#f6c3d0")
      .attr("stroke-width", 4)
      .attr("d", line);

    svg
      .selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.label) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(yValues.indexOf(d.value)))
      .attr("r", 5)
      .attr("fill", "#f6c3d0")
      // .on("mouseover", mouseover)
      // .on("mousemove", mousemove)
      // .on("mouseleave", mouseleave);
  };

  return (
    <div>
      <div id="container" />
    </div>
  );
}

export default LineChart;
