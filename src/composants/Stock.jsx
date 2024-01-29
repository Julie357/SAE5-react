import * as d3 from 'd3';
import { useEffect, useState } from 'react';

function LineChart(props) {
    const { width, height } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            drawChart();
        } else {
            generateData();
        }
    }, [data]);

    const generateData = () => {
        const chartData = [
            { label: "Jan", value: "A1", date: new Date(2023, 0, 2) },
            { label: "Jan", value: "A2", date: new Date(2023, 0, 24) },
            { label: "Feb", value: "A2", date: new Date(2023, 1, 15) },
            { label: "Mar", value: "B1", date: new Date(2023, 2, 10) },
            { label: "Apr", value: "B2", date: new Date(2023, 3, 5) },
            { label: "May", value: "C1", date: new Date(2023, 4, 20) },
            { label: "Jun", value: "C2", date: new Date(2023, 5, 8) },
            { label: "Jul", value: "A1", date: new Date(2023, 6, 3) },
            { label: "Aug", value: "A2", date: new Date(2023, 7, 18) },
            { label: "Sep", value: "B1", date: new Date(2023, 8, 12) },
            { label: "Oct", value: "B2", date: new Date(2023, 9, 7) },
            { label: "Nov", value: "C1", date: new Date(2023, 10, 22) },
            { label: "Dec", value: "C2", date: new Date(2023, 11, 17) },
        ];


        chartData.sort((a, b) => a.date - b.date);

        setData(chartData);
    };

    const drawChart = () => {
        const margin = { top: 10, right: 50, bottom: 50, left: 50 };

        const yValues = ["A1", "A2", "B1", "B2", "C1", "C2"];
        const yMinValue = d3.min(data, d => yValues.indexOf(d.value));
        const yMaxValue = d3.max(data, d => yValues.indexOf(d.value));

        const svg = d3
            .select('#container')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom + 20)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top + 20})`);

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([yMinValue, yMaxValue])
            .range([height, 0]);

        svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${height})`)
            .call(
                d3.axisBottom(xScale)
                    .tickSize(-height)
                    .tickFormat('')
            )
            .selectAll('line')
            .attr('stroke', '#ccc')
            .attr('stroke-opacity', 0.3);

        svg
            .append('g')
            .attr('class', 'grid')
            .call(
                d3.axisLeft(yScale)
                    .tickSize(-width)
                    .tickFormat('')
            )
            .selectAll('line')
            .attr('stroke', '#ccc')
            .attr('stroke-opacity', 0.3);

        svg
            .append('g')
            .attr('class', 'x-axis')
            .call(d3.axisTop().scale(xScale).tickSize(7))
            .attr('transform', `translate(0,0)`);

        // Créer l'axe y
svg
.append('g')
.attr('class', 'y-axis')
.call(
  d3.axisLeft(yScale)
    .tickValues(yValues.map((_, i) => i)) // Utiliser les indices de yValues comme valeurs d'axe
    .tickFormat(d => yValues[d])
);

        const line = d3
            .line()
            .x(d => xScale(d.label) + xScale.bandwidth() / 2)
            .y(d => yScale(yValues.indexOf(d.value)));

        svg
            .selectAll('.line')
            .data([data])
            .join('path')
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', '#f6c3d0')
            .attr('stroke-width', 4)
            .attr('d', line);

        // Ajouter des cercles pour chaque point sur la ligne
        svg
            .selectAll('.dot')
            .data(data)
            .join('circle')
            .attr('class', 'dot')
            .attr('cx', d => xScale(d.label) + xScale.bandwidth() / 2)
            .attr('cy', d => yScale(yValues.indexOf(d.value)))
            .attr('r', 5) // Rayon du cercle
            .attr('fill', '#f6c3d0');
    };

    return (
        <div>
            <div id="container" />
        </div>
    );
}

export default LineChart;
