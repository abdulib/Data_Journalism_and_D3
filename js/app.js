var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// create a scatter plot between two of the data variables
// Healthcare vs. Age or Smokers vs. Poverty.

// Load data from csv

d3.csv("data/data.csv", function(error, data) {
  if (error) return console.warn(error);
  console.log(data[1]);


  // parse data
  data.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.age = +data.age
    data.smokers = +data.smokers
    data.poverty = +data.poverty
    
  })
  // console.log(data)

  var healthcare = data.map(data => data.healthcare)
  var age = data.map(data => data.age)
  var smokers = data.map(data => data.smokers)
  var poverty = data.map(data => data.poverty)

  // console.log("healthcare:", healthcare)

  //  Create the scales for the chart

  var healthMin = d3.min(healthcare)
  console.log(healthMin)

  var healthMax = d3.max(healthcare)
  console.log(healthMax)


  var ageMin = d3.min(age)
  console.log(ageMin)

  var ageMax = d3.max(age)
  console.log(ageMax)

  // scale x to chart width
  var xLinearScale = d3.scaleLinear()
  .domain([d3.min(age) - 0.5, d3.max(age)])
  .range([0, width]);

  // scale y to chart height
  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(healthcare) - 1, d3.max(healthcare)])
  .range([height, 0]);


  // console.log(xLinearScale.bandwidth());

  // Set up the y-axis domain
  // create axes
  var yAxis = d3.axisLeft(yLinearScale);
  var xAxis = d3.axisBottom(xLinearScale);


  // set x to the bottom of the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  // set y to the y axis
  var g = chartGroup.append("g");
  yAxis(g);


  // Append Data to chartGroup
  var scattterChart  = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 10)
    .attr("fill", "green")
    .attr("opacity", ".5");





  console.log(scattterChart)


  











});



