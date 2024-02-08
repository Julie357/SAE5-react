import * as d3 from "d3";
import { useEffect, useState } from "react";

function LineChart({ studentExercises }) {
  const width = 500;
  const height = 300;
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("Jour");

  useEffect(() => {
    clearChart();
    if (data.length > 0) {
      drawChart();
    } else {
      fetchData();
    }
  }, [data, period]);

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

    studentExercises.forEach((exercise) => {
      const date = exercise.date;
      const value = exercise.exercisesSkillLevel;
      const levelINT = LEVEL_TO_INT[value];

      let key;
      if (period === "Jour") {
        key = date;
      } else if (period === "Mois") {
        key = date.slice(0, 7);
      } else if (period === "Année") {
        key = date.slice(0, 4);
      }

      if (dateMap[key]) {
        dateMap[key].totalValue += levelINT;
        dateMap[key].totalCount += 1;
      } else {
        dateMap[key] = {
          totalValue: levelINT,
          totalCount: 1,
        };
      }
    });

    const chartData = Object.keys(dateMap).map((key) => {
      const [year, month, day] = key.split("-").map(Number);
      const date =
        period === "Jour"
          ? new Date(year, month - 1, day)
          : new Date(year, month - 1);
      return {
        label:
          period === "Jour"
            ? `${day}/${month}/${year}`
            : period === "Mois"
            ? `${month}/${year}`
            : `${year}`,
        value: dateMap[key].totalCount
          ? INT_TO_LEVEL[
              Math.round(dateMap[key].totalValue / dateMap[key].totalCount)
            ]
          : 0,
        date: date,
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

    var Tooltip = d3
      .select("#container")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("width", "80%")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    var mouseover = function (d) {
      Tooltip.style("opacity", 1);
    };
    function mousemove(event, d) {
      const tooltipContent = `Date: ${d.label}, Niveau: ${d.value}`;

      const tooltipX = xScale(d.label) + xScale.bandwidth() / 2; 
      const tooltipY = yScale(yValues.indexOf(d.value)) - 10;

      Tooltip.style("left", tooltipX + "px");
      Tooltip.style("top", tooltipY + "px");

      Tooltip.html(tooltipContent);
    }

    var mouseleave = function (d) {
      Tooltip.style("opacity", 0);
    };

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
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
    setData([]);
  };

  const clearChart = () => {
    const svg = d3.select("#container");
    svg.selectAll("*").remove();
  };

  const getLabel = (period, year, month, day) => {
    if (period === "Jour") {
      return `${day}/${month}/${year}`;
    } else if (period === "Mois") {
      return `${month}/${year}`;
    } else if (period === "Année") {
      return year.toString();
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div id="container" />
      <div>
        <form style={{ marginTop: "2vh", marginLeft: "20px" }}>
          <label >
            Période :
            <select style={{ marginLeft: "5px" }} value={period} onChange={handlePeriodChange}>
              <option value="Jour">Jour</option>
              <option value="Mois">Mois</option>
              <option value="Année">Année</option>
            </select>
          </label>
        </form>
      </div>
    </div>
  );
}

export default LineChart;
