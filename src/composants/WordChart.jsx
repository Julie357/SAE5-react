import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getWordColor } from '../pages/Visu';

const WordChart = ({ words }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // on efface le truc d'avant    
    svg.selectAll('*').remove();

    const scale = d3.scaleLinear()
      .domain([0, words.length])
      .range([0, 1500]);

      const colorScale = d3.scaleLinear()
  .domain([0, 3])  // Temps en secondes
  .range(['red', 'blue']);

  const greenScale = d3.scaleLinear()
  .domain([0, 3]) 
  .range(['lightblue', 'darkblue']); 

    // ligne
    svg.selectAll('line')
      .data(words)
      .enter()
      .append('line')
      .attr('x1', (d, i) => scale(i))
      .attr('y1', 20)
      .attr('x2', (d, i) => scale(i + 1))
      .attr('y2', 20)
      .attr('stroke', d => getWordColor(d))
      .attr('stroke-width', 6); // Ajuste la largeur

    // text
    svg.selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .attr('x', (d, i) => scale(i) + scale(0.5))
      .attr('y', 40)
      .text(d => d.form)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('stroke', d => getWordColor(d));

      // ligne
    svg.selectAll('line2')
    .data(words)
    .enter()
    .append('line')
    .attr('x1', (d, i) => scale(i))
    .attr('y1', 80)
    .attr('x2', (d, i) => scale(i + 1))
    .attr('y2', 80)
    .attr('stroke', "black")
    .attr('stroke-width', d => d.time * 1 + 3);

       // ligne
       svg.selectAll('line3')
       .data(words)
       .enter()
       .append('line')
       .attr('x1', (d, i) => scale(i))
       .attr('y1', 120)
       .attr('x2', (d, i) => scale(i + 1))
       .attr('y2', 120)
       .attr('stroke', d => {
        return d.time > 8 ? 'black' : colorScale(d.time);
      })
       .attr('stroke-width', 6);

        // ligne
        svg.selectAll('line3')
        .data(words)
        .enter()
        .append('line')
        .attr('x1', (d, i) => scale(i))
        .attr('y1', 150)
        .attr('x2', (d, i) => scale(i + 1))
        .attr('y2', 150)
        .attr('stroke', d => {
         return d.time > 8 ? 'black' : colorScale(d.time);
       })
       .attr('stroke-width',d=> Math.log(d.time * 10 + 6) * 4);

       // ligne
       svg.selectAll('line4')
       .data(words)
       .enter()
       .append('line')
       .attr('x1', (d, i) => scale(i))
       .attr('y1', 180)
       .attr('x2', (d, i) => scale(i + 1))
       .attr('y2', 180)
       .attr('stroke', d => {
        return d.time > 8 ? 'grey' : greenScale(d.time);
      })
      .attr('stroke-width', 10 );

      // ligne
      svg.selectAll('line4')
      .data(words)
      .enter()
      .append('line')
      .attr('x1', (d, i) => scale(i))
      .attr('y1', 210)
      .attr('x2', (d, i) => scale(i + 1))
      .attr('y2', 210)
      .attr('stroke', d => {
        if (d.time > 5) {
          return 'grey';
        } else if (d.time <= 1.5) {
          return "lightBlue";
        } else {
          return 'darkblue';
        }
      })
     .attr('stroke-width',d=> Math.log(d.time * 10 + 6) * 4);

     // ligne
     svg.selectAll('line4')
     .data(words)
     .enter()
     .append('line')
     .attr('x1', (d, i) => scale(i))
     .attr('y1', 240)
     .attr('x2', (d, i) => scale(i + 1))
     .attr('y2', 240)
     .attr('stroke', d => {
       if (d.time > 5) {
         return 'grey';
       } else if (d.time <= 1.5) {
         return "lightBlue";
       } else {
         return 'darkblue';
       }
     })
    .attr('stroke-width', 6);
    }, [words]);

    

  return (
    <svg ref={svgRef} width={"100%"} height={"800px"}></svg>
  );
};

export default WordChart;
