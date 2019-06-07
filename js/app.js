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

  console.log("healthcare:", healthcare)

\
});



