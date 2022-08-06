import React from "react";
import * as d3 from "d3";
 
const MultilineChart = ({ data, dimensions }) => {
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  // var color = d3.scale.category20();
  React.useEffect(() => {
    let xmax=[]
    let xmin=[]
    let ymax=[]
    let ymin=[]
    for (var i=0 ;i<data.length;i++){
     let tempxmax=d3.max(data[i].items, (d) => d.X) 
      xmax.push(tempxmax)
    let  tempymax=d3.max(data[i].items, (d) => d.Y) 
      ymax.push(tempymax)


      let tempxmin=d3.min(data[i].items, (d) => d.X) 
      xmin.push(tempxmin)
    let  tempymin=d3.min(data[i].items, (d) => d.Y) 
      ymin.push(tempymin)


    }
    console.log(xmin)
    console.log(xmin)
    console.log(xmin)
    console.log(xmin)
    const xScale = d3.scaleLinear()
   
    .domain([ d3.min(xmin),d3.max(xmax) +Math.abs(d3.min(xmin))])
    // .domain([
    //   d3.min(data[0].items, (d) => d.X)  ,
    //   d3.max(data[0].items, (d) => d.X) 

    // ])
    // .domain(d3.extent(data[0].items, (d) => d.X))

      // .domain([
      //   d3.min(data[0].items, (d) => d.date) - d3.max(data[0].items, (d) => d.date)/3 ,
      //   d3.max(data[0].items, (d) => d.date) + d3.max(data[0].items, (d) => d.date)/3
      // ])
      .range([0, width]);
    const yScale = d3.scaleLinear()
    //   .domain([
    //     d3.min(data[0].items, (d) => d.Y)  ,
    //     d3.max(data[0].items, (d) => d.Y) 
      
    //   ])
    .domain([ d3.min(ymin),d3.max(ymax)+Math.abs(d3.min(ymin)) ])
      .range([height, 0]);
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
   // Add X grid lines with labels
   const xAxis = d3.axisBottom(xScale)
     .ticks(10)
     .tickSize(-height )
     .tickFormat((val) => `${val}`);
   const xAxisGroup = svg.append("g")
     .attr("transform", `translate(0, ${height })`)
     .call(xAxis)
     .attr("opacity", 0.5);

   const yAxis = d3.axisLeft(yScale)
     .ticks(10)
     .tickSize(-width)
     .tickFormat((val) => `${val}`);
   const yAxisGroup = svg.append("g")
   .attr("opacity", 0.5)
   .call(yAxis);
   


 

    const line = d3.line()
      .x((d) => xScale(d.X))
      .y((d) => yScale(d.Y))
      // .curve(d3.curveCardinal);
    svg.selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width",2)
 
      .attr("d", (d) => line(d.items));
  }, [data]); // Redraw chart if data changes
 
  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};
 
export default MultilineChart;





