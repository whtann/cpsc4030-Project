var scatterDiv = document.getElementById("scatterplot");
var barDiv = document.getElementById("barchart");
var areaDiv = document.getElementById("areachart");

//Scatterplots
d3.csv("SteamGamesLarger.csv").then(function(dataset) {

    //make buttons to chage to different graphs
    
    var dimensions = {
        width: scatterDiv.clientWidth,
        height: scatterDiv.clientHeight,
        margin: {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50
        }
    }
    
    var svg = d3.select("#scatterplot")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)

    var xAccessor = d => d.Price
    var yAccessor = d => d.PerPosRevAT
    var xAccessorNew = d => d.Name

    var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset.map(function(d){return d.Price}), s => +s)])//d3.extent(dataset, xAccessor))
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor)) 
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    const tooltip = d3.select("#scatterplot")
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

    var colors = dataset.map(d => d.Name)

    var color = d3.scaleOrdinal()
        .domain(colors)
        .range(d3.schemeCategory10)

    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)

    var xAxis = svg.append("g")
        .call(xAxisgen)
        .style("Transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

    var yAxis = svg.append("g")
        .call(yAxisgen)
        .style("transform", `translateX(${dimensions.margin.left}px)`)

    var dots = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
            .attr("cx", d => xScale(xAccessor(d)))
            .attr("cy", d => yScale(yAccessor(d)))
            .attr("fill", d => color(d.Genre))
            .attr("r", 3)
            .style("opacity", 0.3)
        .on("mouseover", function(event, d) {
            d3.select(this).transition()
                .attr("r", 10)
            tooltip.html(`${d.Name} <br> Price: ${d.Price} <br> Rating: ${d.PerPosRevAT}`)
                .style("left", (event.x) + 10 + "px")
                .style("top", (event.y) + 15 + "px")
                .style("visibility", "visible")
        })
        .on("mouseout", function(event, i) {
            d3.select(this).transition()
                .attr("r", 3)
            tooltip.transition()
                .style("visibility", "hidden")
        })

})

//Game total reviews
d3.csv("SteamGamesLarger.csv").then(function(dataset) {

    var chartSelected = "GenreTot"

    dimensions = {
        width: barDiv.clientWidth,
        height: barDiv.clientHeight,
        margin: {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50
        }
    }

    var svg = d3.select("#barchart")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)

    var names = dataset.map(d => d.Genre)

    var colors = dataset.map(d => d.Name)

    var color = d3.scaleOrdinal()
        .domain(colors)
        .range(d3.schemeCategory10)

    var xScale = d3.scaleBand()
        .domain(names) 
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
        .padding(0.2)

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset.map(function(d){return d.AvgNRAT}), s => +s)])
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    var dots = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.Genre))
        .attr("y", d => yScale(d.AvgNRAT))
        .attr("width", xScale.bandwidth())
        .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d.AvgNRAT))
        .attr("fill", d => color(d.Genre)) //"#FF007F"
        .on('mouseover', function(d, i){
            d3.select(this)
                .attr("stroke-width", 1)
                .attr("stroke", "black")
        })
        .on('mouseout', function(d, i){
            d3.select(this)
                .attr("stroke-width", 0)
                .attr("stroke", "black")
        })


    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)

    var xAxis = svg.append("g")
        .call(xAxisgen)
        .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`) 
        .selectAll("text")
        .attr("y", 0)
        .attr("x", "-4em")
        .attr("transform", "rotate(-65)")
        .style("font-size", "6px")

    var yAxis = svg.append("g")
        .call(yAxisgen.ticks(22))
        .style("transform", `translateX(${dimensions.margin.left}px)`)

    svg.append("text")
        .attr("x", (dimensions.width / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text("Average Number of Reviews per Genre of Game");

    // d3.select('#GenreTot').on('click', function() {
        
    // })

    // d3.select("#linda").on('click', function(){
    //     nameSelected = "Linda"
    
    //     //added
    //     yScale = d3.scaleLinear()
    //         .domain([0, d3.max(data.map(function(d){return d[nameSelected]}), s => +s)])
    //         .range([dimensions.boundedHeight,0]);

    //     //added
    //     yAxis = d3.axisLeft(yScale)

    //     //added
    //     changing_axis.transition().call(yAxis)

    //     bars.transition()
    //         .attr('x', function(d) { return xScale(d.year); })
    //         .attr('width', xScale.bandwidth)
    //         .attr('y', function(d) { return yScale(d[nameSelected]); })
    //         .attr('height', function(d){return dimensions.boundedHeight - yScale(d[nameSelected])})
    //         .style("fill", "steelblue")
        
    // })
})

//developer total reviews
// d3.csv("SteamGamesLarger.csv").then(function(dataset) {

//     var dimensions = {
//         width: areaDiv.clientWidth,
//         height: areaDiv.clientHeight,
//         margin: {
//             top: 50,
//             bottom: 50,
//             right: 50,
//             left: 50
//         }
//     }

//     var colors = dataset.map(d => d.ID)
    
//     var color = d3.scaleOrdinal()
//         .domain(colors)
//         .range(d3.schemeCategory10)

//     var svg = d3.select("#areachart")
//         .style("width", dimensions.width)
//         .style("height", dimensions.height)
//         .append("svg")
//             .attr("width", dimensions.width)
//             .attr("height", dimensions.height)

//     var nodes = dataset.map(function(d) {
//         return {
//             r: d.TNRATRev,
//             i: d.ID,
//         }
//     });

//     var layout = d3.forceSimulation(nodes)
//         .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
//         .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
//         .on('tick', ticked)

//     var node = svg.append("g")
//         .selectAll("circle")
//         .data(nodes).enter()
//         .append("circle")
//         .attr('cx', d => d.x)
//         .attr('cy', d => d.y)
//         .attr("fill", d => color(d.i))
//         .attr("opacity", .5)
//         .attr("r", d => d.r)
      
//     function ticked(){
//         svg.selectAll("circle")
//             .attr('cx', d => d.x)
//             .attr('cy', d => d.y)
//     }
// })
