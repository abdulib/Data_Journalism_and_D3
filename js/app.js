// var svgWidth = 850;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);


// // create a scatter plot between two of the data variables
// // Healthcare vs. Age or Smokers vs. Poverty.

// // Load data from csv



// // Initial Params
// var chosenXAxis = "hair_length";

// // function used for updating x-scale var upon click on axis label
// function xScale(data, chosenXAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(data, d => d[chosenXAxis]),
//       d3.max(data, d => d[chosenXAxis])
//     ])
//     .range([0, width]);

//   return xLinearScale;

// }









// d3.csv("data/data.csv", function(error, data) {
//   if (error) return console.warn(error);
//   console.log(data[1]);


//   // parse data
//   data.forEach(function(data) {
//     data.healthcare = +data.healthcare;
//     data.age = +data.age
//     data.smokers = +data.smokers
//     data.poverty = +data.poverty
    
//   })
//   // console.log(data)

//   var healthcare = data.map(data => data.healthcare)
//   var age = data.map(data => data.age)
//   var smokers = data.map(data => data.smokers)
//   var poverty = data.map(data => data.poverty)

//   // console.log("healthcare:", healthcare)


//   // scale x to chart width
//   var xLinearScale = d3.scaleLinear()
//   .domain([d3.min(age) - 0.5, d3.max(age)])
//   .range([0, width]);

//   // scale y to chart height
//   var yLinearScale = d3.scaleLinear()
//   .domain([d3.min(healthcare) - 1, d3.max(healthcare)])
//   .range([height, 0]);


//   // console.log(xLinearScale.bandwidth());

//   // Set up the y-axis domain
//   // create axes
//   var yAxis = d3.axisLeft(yLinearScale);
//   var xAxis = d3.axisBottom(xLinearScale);


//   // set x to the bottom of the chart
//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(xAxis);

//   // set y to the y axis
//   var g = chartGroup.append("g");
//   yAxis(g);


//   // Append Data to chartGroup
//   var scattterChart  = chartGroup.selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.age))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", 8)
//     .attr("fill", "turquoise")
//     .attr("opacity", ".5");





//   console.log(scattterChart)


  
// });

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

// Initial Params
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]),
      d3.max(data, d => d[chosenXAxis])
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "poverty") {
    var label = "Poverty:";
  }
  else {
    var label = "Age";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.poverty}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("data/data.csv", function(err, data) {
  if (err) throw err;

  // parse data
  data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.obesity = +data.obesity;
    data.income = +data.income;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(data, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.obesity)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", 8)
    .attr("fill", "turquoise")
    .attr("opacity", ".5");

  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("Poverty");

  var incomeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Income");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Obesity (%)");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "income") {
          incomeLabel
            .classed("active", true)
            .classed("inactive", false);
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
          povertyLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
});



