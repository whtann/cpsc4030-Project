d3.csv("SteamGames.csv").then(function(dataset) {
    var dimensions = {
        width: 800,
        height: 800,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 50
        }
    }
    var svg = d3.select("#scatterplot")
        .style("width", dimensions.width)
        .style("height", dimensions.height)

    var xAccessor = d => d.Price
    var yAccessor = d => d.PerPosAT

    var xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset,yAccessor))
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

/*    var dots = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("fill", "black")
        .attr("r", 3)
*/
    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)

    var xAxis = svg.append("g")
        .call(xAxisgen)
        .style("Transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

    var yAxis = svg.append("g")
        .call(yAxisgen)
        .style("transform", `translateX(${dimensions.margin.left}px)`)

    console.log(dataset);
})

    