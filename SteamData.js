d3.csv("SteamGames_Test.csv").then(function(dataset) {

    console.log(dataset)

    var dimensions = {
        width: 1500,
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
    var yAccessor = d => d.PerPosRevAT
    var xAccessorNew = d => d.Name

    var xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor)) 
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
    
    // var color = d3.scaleOrdinal()
    //     .domain()
    //     .range(d3.schemeCategory10)

    var dots = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("fill", "red")
        .attr("r", 3)

    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)

    var xAxis = svg.append("g")
        .call(xAxisgen)
        .style("Transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

    var yAxis = svg.append("g")
        .call(yAxisgen)
        .style("transform", `translateX(${dimensions.margin.left}px)`)

    console.log(dataset)



    dimensions = {
        width: 15000,
        height: 800,
        margin: {
            top: 50,
            bottom: 50,
            right: 10,
            left: 50
        }
    }

    var svg = d3.select("#barchart")
        .style("width", dimensions.width)
        .style("height", dimensions.height)

    var names = dataset.map(d => d.Name)
    
    var xScale = d3.scaleBand()
        .domain(names) 
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
        .padding(0.2)


    var yScale = d3.scaleLinear()
        .domain([0, 1000000])
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])


    var dots = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.Name))
        .attr("y", d => yScale(d.TNRAT))
        .attr("width", xScale.bandwidth())
        .attr("height", d => dimensions.height - dimensions.margin.top - yScale(d.TNRAT))
        .attr("fill", "#FF007F");


    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)


    var xAxis = svg.append("g")
        .call(xAxisgen)
        .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`) 
        .selectAll("text")
        .attr("y", 0)
        .attr("x", -10)
        .attr("transform", "rotate(-65)")
        .style("font-size", "8px")


    var yAxis = svg.append("g")
        .call(yAxisgen.ticks(22))
        .style("transform", `translateX(${dimensions.margin.left}px)`)


    svg.append("text")
        .attr("x", (dimensions.width / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text("Steam Bar Graph");

    
    //next graph
    var svg = d3.select("#forces")
        .style("width", width)
        .style("height", height)

    var layout = d3.forceSimulation(/* */)
        .force('center', d3.forceCenter(width/2, height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {
          return /* */
        }))
        .on('tick', ticked)

    let node = svg.append("g")
        .selectAll("circle")
        .data(/* */).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", "black")
        .attr("opacity", 0.4)
        .attr("r", d => d.r)
      
    function ticked(){
        svg.selectAll("circle")
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
    }

})

    