// var scatterDiv = document.getElementById("scatterplot");
// var barDiv = document.getElementById("barchart");
// var areaDiv = document.getElementById("areachart");

//HeatMap
d3.csv("HeatMap.csv").then(function(dataset) {

    var margin = {top: 80,
            bottom: 30,
            right: 25,
            left: 200
        },
        width = 900 - margin.left - margin.right, //scatterDiv.clientWidth,
        height = 900 - margin.top - margin.bottom; //scatterDiv.clientHeight,
    

// append the svg object to the body of the page
    var svg = d3.select("#scatterplot")
        .append("svg")
        .style("width", width + margin.left + margin.right)
        .style("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            // .attr("width", dimensions.width)
            // .attr("height", dimensions.height)

// Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
var myGroups = d3.map(dataset, function(d){return d.Price})
var myVars = d3.map(dataset, function(d){return d.Genre})

// Build X scales and axis:
var x = d3.scaleBand()
  .range([0, width])
  .domain(myGroups)
  .padding(0.05);
svg.append("g")
  .style("font-size", 15)
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickSize(0))
  .select(".domain").remove()

// Build Y scales and axis:
var y = d3.scaleBand()
  .range([height, 0 ])
  .domain(myVars)
  .padding(0.05);
svg.append("g")
  .style("font-size", 15)
  .call(d3.axisLeft(y).tickSize(0))
  .select(".domain").remove()

// Build color scale
var myColor = d3.scaleSequential()
  .interpolator(d3.interpolateYlOrRd)
  .domain([1,100])

// create a tooltip
var tooltip = d3.select("#scatterplot")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")

//Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
  tooltip
    .style("opacity", 1)
  d3.select(this)
    .style("stroke", "red")
    .style("opacity", 1)
}
var mousemove = function(event, d) {
  tooltip
    .html("The number of games in<br>this price range is: " +d.Value)
    .style("left", (event.x)/2 + "px")
    .style("top", (event.y)/2 + "px")
}
var mouseleave = function(d) {
  tooltip
    .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 0.8)
}

// add the squares
svg.selectAll("rect")
  .data(dataset, function(d) {return d.Genre+':'+d.Price;})
  .enter()
  .append("rect")
    .attr("x", function(d) {return x(d.Price) })
    .attr("y", function(d) {return y(d.Genre) })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth() )
    .attr("height", y.bandwidth() )
    .style("fill", function(d) {return myColor(d.Value)})
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8)
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)


// Add title to graph
svg.append("text")
      .attr("x", 0)
      .attr("y", -50)
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .text("A Heatmap of Games ");

// Add subtitle to graph
svg.append("text")
      .attr("x", 0)
      .attr("y", -20)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("A short description of the take-away message of this chart.");

})


























d3.csv("SteamGamesLarger3.csv").then(function(dataset) {

    var newData = dataset

    var genreSelected = "Action"
    var priceRangeSelected = "$<1"
    
    function filter(newData, criteria) {
        return newData.filter(function(obj) {
          return Object.keys(criteria).every(function(c) {
            return obj[c] == criteria[c];
          });
        });
      }
   
    var graph = filter(newData, {Genre: genreSelected, PriceRange: priceRangeSelected})
    console.log(graph)

    var bargraphs = d3.map(graph, function(d){
        return {
            Name: d.Name,
            Reviews: d.TNRAT
        }
    })

    dimensions2 = {
        width: 1000,
        height: 1000,
        margin: {
            top: 50,
            bottom: 50,
            right: 50,
            left: 80
        }
    }

    var names = d3.map(graph, function(d){
        return d.Name
    })

    var colors = d3.map(graph, function(d){
        return d.OpSys
    })

    var color = d3.scaleOrdinal()
        .domain(colors)
        .range(d3.schemeCategory10)

    const tooltip = d3.select("#barchart")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .attr("class", "tooltip")
        .style("color", "red")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "10px")
        .style("padding", "10px")

    var svg = d3.select("#barchart")
        .style("width", dimensions2.width)
        .style("height", dimensions2.height)
        .append("svg")
            //.attr("transform", "translate(" + dimensions2.margin.left + "," + dimensions2.margin.top + ")");
            .attr("width", dimensions2.width)
            .attr("height", dimensions2.height)

    var xScale = d3.scaleBand()
        .domain(names) 
        .range([dimensions2.margin.left, dimensions2.width - dimensions2.margin.right])
        .padding(0.2)

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(d3.map(graph, function(d){return d.TNRAT}), s => +s)]) 
        .range([dimensions2.height - dimensions2.margin.bottom, dimensions2.margin.top])

    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)

    var xAxis = svg.append("g")
        .call(xAxisgen)
        .style("transform", `translateY(${dimensions2.height - dimensions2.margin.bottom}px)`) 
        .selectAll("text")
        .attr("y", 7)
        .attr("x", 0)
        .attr("transform", "rotate(-65)")
        .style("font-size", "20px")

    var yAxis = svg.append("g")
        .call(yAxisgen.ticks(22))
        .style("transform", `translateX(${dimensions2.margin.left}px)`)
        .style("font-size", "16px")

    //var elements = [{x: graph.Name, y: graph.PerPosRevAT}, {x: "Positivity Ratio Past 30 Days", y: newData.PerPosRev30}]

    var bars = svg.selectAll("rect")
        .data(graph)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.Name)) //xScale(function(){return d.x}
        .attr("y", d => yScale(d.TNRAT)) //yScale(function(){return d.y}
        .attr("width", xScale.bandwidth())
        .attr("height", d => dimensions2.height - dimensions2.margin.bottom - yScale(d.TNRAT))
        .attr("fill", d => color(d.OpSys))
        .on('mouseover', function(event, d){
            d3.select(this)
                .attr("stroke-width", 1)
                .attr("stroke", "black")
            tooltip.html(`${d.Name} <br> Total Reviews All Time: ${d.TNRAT} <br> Rating All Time: ${d.PerPosRevAT} <br> Last 30 Days: ${d.TNR30} <br> Rating Last 30 Days: ${d.PerPosRev30}`)
                .style("left", (event.pageX+30) + "px")
                .style("top", (event.pageY-28) + "px")
                .style("visibility", "visible")
        })
        .on('mouseout', function(event, d){
            d3.select(this)
                .attr("stroke-width", 0)
                .attr("stroke", "black")
            tooltip.transition()
                .style("visibility", "hidden")
        })

        d3.select("#scatterplot").on('click', function(event, d) {

            d3.select("#barchart")
                .selectAll("rect")
                .remove()

            d3.csv("HeatMap.csv").then(function(dataset) {

            var genreSelected = d3.map(dataset, d => d.Genre)
            var priceRangeSelected = d3.map(dataset, d => d.Price)

            var graph = filter(newData, {Genre: genreSelected, PriceRange: priceRangeSelected})
            console.log(graph)
            })

        })
})



















d3.csv("SteamGamesLarger3.csv").then(function(dataset) {

    var newData = dataset

    var genreSelected = "Action"
    var priceRangeSelected = "$<1"
    
    function filter(newData, criteria) {
        return newData.filter(function(obj) {
          return Object.keys(criteria).every(function(c) {
            return obj[c] == criteria[c];
          });
        });
      }
   
    var graph = filter(newData, {Genre: genreSelected, PriceRange: priceRangeSelected})
    console.log(graph)

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 20, bottom: 30, left: 50},
        width = 700 - margin.left - margin.right,
        height = 620 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#areachart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
        .domain([1, 5])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain([0, 120])
        .range([0.001, 100]);

    var names = d3.map(dataset, d => d.Name)

    // Add a scale for bubble color
    var myColor = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemeCategory10);

    // Add dots
    var dots = svg//.append('g')
        .selectAll("circle")
        .data(graph)
        .enter()
        .append("circle")
            .attr("cx", d => x(d.Price))//function (d) { return x(d.Price); } )
            .attr("cy", d => y(d.PerPosRevAT))//function (d) { return y(d.PerPosRevAT); } )
            .attr("r", d => z(d.Storage))//function (d) { return z(d.Memory); } )
            .style("fill", d => myColor(d.OpSys))//function (d) { return myColor(d.OpSys); } )
            .style("opacity", "0.5")
            .attr("stroke", "black")
            .style("stroke-width", "2px")
})
