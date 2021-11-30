var scatterDiv = document.getElementById("scatterplot");
var barDiv = document.getElementById("barchart");
var areaDiv = document.getElementById("areachart");

var newData = [];

//Scatterplots
d3.csv("SteamGamesLarger.csv").then(function(dataset) {

    //make buttons to chage to different graphs
    newData = dataset[0]
    console.log(newData)

    var selected = "PerPosRevAT"
    
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

    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)

    var xAxis = svg.append("g")
        .call(xAxisgen)
        .style("Transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
        .style("font-size", "16px")

    var yAxis = svg.append("g")
        .call(yAxisgen)
        .style("transform", `translateX(${dimensions.margin.left}px)`)
        .style("font-size", "16px")

    var dots = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
            .attr("cx", d => xScale(xAccessor(d)))
            .attr("cy", d => yScale(yAccessor(d)))
            .attr("fill", "red")
            .attr("r", 3)
            .style("opacity", 1)
        .on("mouseover", function(event, d) {
            d3.select(this).transition()
                .attr("r", 6)
                .style("opacity", .5)
                .attr("stroke-width", 1)
                .attr("stroke", "black")
            tooltip.html(`${d.Name} <br> Price: ${d.Price} <br> Rating: ${d.PerPosRevAT} <br> Size: ${d.Storage} GB`)
                .style("left", (event.pageX+15) + "px")
                .style("top", (event.pageY-28) + "px")
                .style("visibility", "visible")
        })
        .on("click", function(event, d) {
            tooltip.html(`${d.Name} <br> Price: ${d.Price} <br> Rating: ${d.PerPosRevAT} <br> Size: ${d.Storage} GB`)
                .style("left", (event.pageX+15) + "px")
                .style("top", (event.pageY-28) + "px")
                .style("visibility", "visible")

            newData = d;
            console.log(newData);
        })
        .on("mouseout", function(event, i) {
            d3.select(this).transition()
                .attr("r", 3)
                .style("opacity", 1)
                .attr("stroke-width", 0)
            tooltip.transition()
                .style("visibility", "hidden")
        })

    // var Input = window.prompt("Enter Scatterplot Scale")


    var changing_xaxis = svg.append("g")
        .attr("transform", "translate("+dimensions.height+ - +dimensions.margin.bottom+")")//,"+ dimensions.margin.top +"
        //.call(yAxisgen)

    var changing_yaxis = svg.append("g")
        .attr("transform", "translate("+dimensions.margin.left+")")//,"+ dimensions.margin.top +"
        //.call(yAxisgen)

    var text = svg.append("text")
        .attr("x", (dimensions.width / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text("Positivity Ratio All Time vs Price");

    d3.select('#PricePosAT').on('click', function() {

        var selected = "PerPosRevAT"

        yScale.domain([0, d3.max(dataset.map(function(d){return d["PerPosRevAT"]}), s => +s)])
            .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
                
        yAxis.call(yAxisgen.ticks(22))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
    
        changing_yaxis.transition()//.call(yAxis)
    
        dots.transition()
            .attr('cx', function(d) { return xScale(d.Price); })
            .attr('width', xScale.bandwidth)
            .attr('cy', function(d) { return yScale(d["PerPosRevAT"]); })
            .attr('height', function(d){return dimensions.height - dimensions.margin.bottom - yScale(d["PerPosRevAT"])})
            .duration(1000)
    
        text.attr("x", (dimensions.width / 2))             
            .attr("y", 20)
            .attr("text-anchor", "middle")  
            .style("font-size", "24px") 
            .style("text-decoration", "underline")  
            .text("Positivity Ratio All Time vs Price");
    })

    d3.select('#PricePos30').on('click', function() {

        var selected = "PerPosRev30"

        yScale.domain([0, d3.max(dataset.map(function(d){return d["PerPosRev30"]}), s => +s)])
            .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
                
        yAxis.call(yAxisgen.ticks(22))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
    
        changing_yaxis.transition()//.call(yAxis)
    
        dots.transition()
            .attr('cx', function(d) { return xScale(d.Price); })
            .attr('width', xScale.bandwidth)
            .attr('cy', function(d) { return yScale(d["PerPosRev30"]); })
            .attr('height', function(d){return dimensions.height - dimensions.margin.bottom - yScale(d["PerPosRev30"])})
            .duration(1000)
    
        text.attr("x", (dimensions.width / 2))             
            .attr("y", 20)
            .attr("text-anchor", "middle")  
            .style("font-size", "24px") 
            .style("text-decoration", "underline")  
            .text("Positivity Ratio over the Last 30 Days");
    })

    d3.select('#PriceMemory').on('click', function() {

        var selected = "Storage"

        yScale.domain([0, d3.max(dataset.map(function(d){return d["Storage"]}), s => +s)])
            .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
                
        yAxis.call(yAxisgen.ticks(22))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
    
        changing_yaxis.transition()//.call(yAxis)
    
        dots.transition()
            .attr('cx', function(d) { return xScale(d.Price); })
            .attr('width', xScale.bandwidth)
            .attr('cy', function(d) { return yScale(d["Storage"]); })
            .attr('height', function(d){return dimensions.height - dimensions.margin.bottom - yScale(d["Storage"])})
            .duration(1000)
    
        text.attr("x", (dimensions.width / 2))             
            .attr("y", 20)
            .attr("text-anchor", "middle")  
            .style("font-size", "24px") 
            .style("text-decoration", "underline")  
            .text("Storage Requirement vs Price");
    })

    d3.select('#MaxScale').on('click', function() {

        xScale.domain([0, d3.max(dataset.map(function(d){return d.Price}), s => +s)])
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        xAxis.call(xAxisgen.ticks(20))
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

        changing_xaxis.transition()//.call(xAxis)

        dots.transition()
            .attr('cx', function(d) { return xScale(d.Price); })
            .attr('width', xScale.bandwidth)
            .attr('cy', function(d) { return yScale(d[selected]); })
            .attr('height', function(d){return dimensions.height - dimensions.margin.bottom - yScale(d[selected])})
            .duration(1000)
    })

    d3.select('#Scale100').on('click', function() {

        xScale.domain([0, 100])
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        xAxis.call(xAxisgen.ticks(20))
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

        changing_xaxis.transition()

        dots.transition()
            .attr('cx', function(d) { return xScale(d.Price); })
            .attr('width', xScale.bandwidth)
            .attr('cy', function(d) { return yScale(d[selected]); })
            .attr('height', function(d){return dimensions.height - dimensions.margin.bottom - yScale(d[selected])})
            .duration(1000)
    })

    d3.select('#Scale10').on('click', function() {

        xScale.domain([0, 10])
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        xAxis.call(xAxisgen.ticks(20))
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

        changing_xaxis.transition()

        dots.transition()
            .attr('cx', function(d) { return xScale(d.Price); })
            .attr('width', xScale.bandwidth)
            .attr('cy', function(d) { return yScale(d[selected]); })
            .attr('height', function(d){return dimensions.height - dimensions.margin.bottom - yScale(d[selected])})
            .duration(1000)
    })

})

//Game total reviews
d3.csv("SteamGamesLarger.csv").then(function(dataset) {
    
    var elements = [{x: "Positivity Ratio All Time", y: newData.PerPosRevAT}, {x: "Positivity Ratio Past 30 Days", y: newData.PerPosRev30}]
    console.log(elements)

    dimensions2 = {
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
        .style("width", dimensions2.width)
        .style("height", dimensions2.height)
        .append("svg")
            .attr("width", dimensions2.width)
            .attr("height", dimensions2.height)

    var xScale = d3.scaleBand()
        .domain(["Positivity Ratio All Time", "Positivity Ratio Past 30 Days"]) 
        .range([dimensions2.margin.left, dimensions2.width - dimensions2.margin.right])
        .padding(0.2)

    var yScale = d3.scaleLinear()
        .domain([0, 100]) 
        .range([dimensions2.height - dimensions2.margin.bottom, dimensions2.margin.top])

    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)

    var xAxis = svg.append("g")
        .call(xAxisgen)
        .style("transform", `translateY(${dimensions2.height - dimensions2.margin.bottom}px)`) 
        .selectAll("text")
        .attr("y", 7)
        .attr("x", 0)
        //.attr("transform", "rotate(-65)")
        .style("font-size", "20px")

    var yAxis = svg.append("g")
        .call(yAxisgen.ticks(22))
        .style("transform", `translateX(${dimensions2.margin.left}px)`)
        .style("font-size", "16px")

    var bars = svg.selectAll("rect")
        .data(elements)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.x)) //xScale(function(){return d.x}
        .attr("y", d => yScale(d.y)) //yScale(function(){return d.y}
        .attr("width", xScale.bandwidth())
        .attr("height", d => dimensions2.height - dimensions2.margin.bottom - yScale(d.y))
        .attr("fill", "orange")//d => color(d.Genre)) FF007F
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

    var text = svg.append("text")
        .attr("x", (dimensions2.width / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text("Positivity Ratio of the Game Selected");

    d3.select("#scatterplot").on('mouseout', function() {
        
        d3.select("#barchart")
            .selectAll("rect")
            .remove();
    
        elements = [{x: "Positivity Ratio All Time", y: newData.PerPosRevAT}, {x: "Positivity Ratio Past 30 Days", y: newData.PerPosRev30}]
        console.log(elements)

        xScale = d3.scaleBand()
            .domain(["Positivity Ratio All Time", "Positivity Ratio Past 30 Days"]) 
            .range([dimensions2.margin.left, dimensions2.width - dimensions2.margin.right])
            .padding(0.2)

        yScale = d3.scaleLinear()
            .domain([0, 100]) 
            .range([dimensions2.height - dimensions2.margin.bottom, dimensions2.margin.top])

        xAxisgen = d3.axisBottom().scale(xScale)
        yAxisgen = d3.axisLeft().scale(yScale)

        bars = svg.selectAll("rect")
            .data(elements)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.x)) //xScale(function(){return d.x}
            .attr("y", d => yScale(d.y)) //yScale(function(){return d.y}
            .attr("width", xScale.bandwidth())
            .attr("height", d => dimensions2.height - dimensions2.margin.bottom - yScale(d.y))
            .attr("fill", "orange")//d => color(d.Genre)) FF007F
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
    })
})

d3.csv("SteamGamesLarger.csv").then(function(dataset) {
    //code for forces
    var areaDimensions = {
        width: areaDiv.clientWidth,
        height: areaDiv.clientHeight,
        margin: {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50
        }
    }

    var areaColors = d3.scaleOrdinal()
    .domain(["Mac", "Windows", "SteamLinux"])
    .range(d3.schemeCategory10)

    var svg = d3.select("#areachart")
        .style("width", areaDimensions.width)
        .style("height", areaDimensions.height)
        .append("svg")
            .attr("width", areaDimensions.width)
            .attr("height", areaDimensions.height)

    var text = svg
            .append('text')
            .attr("id", 'topbartext')
            .attr("x", 300)
            .attr("y", 20)
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("font-family", "sans-serif")
            .text("Green = Linux; Orange = Windows; Blue = Mac")

    var nodes = [{r: newData.Mac, i: "Mac"}, {r: newData.Windows, i: "Windows"}, {r: newData.SteamLinux, i: "SteamLinux"}]
    console.log(nodes)

    var layout = d3.forceSimulation(nodes)
        .force('center', d3.forceCenter(areaDimensions.width/2, areaDimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d => d.r}))
        .force('charge', d3.forceManyBody().strength(-30))
        .on('tick', ticked)

    var node = svg.append("g")
        .selectAll("circle")
        .data(nodes).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", d => areaColors(d.i))
        .attr("opacity", .5)
        .attr("r", d => d.r * 50)
        
    function ticked(){
        svg.selectAll("circle")
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
    }

    d3.select("#scatterplot").on('click', function() {
        d3.select("#areachart")
        .selectAll("circle")
        .remove();

        nodes = [{r: newData.Mac, i: "Mac"}, {r: newData.Windows, i: "Windows"}, {r: newData.SteamLinux, i: "SteamLinux"}]
        console.log(nodes)

        var layout = d3.forceSimulation(nodes)
        .force('center', d3.forceCenter(areaDimensions.width/2, areaDimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d => d.r}))
        .force('charge', d3.forceManyBody().strength(-30))
        .on('tick', ticked)

        var node = svg.append("g")
        .selectAll("circle")
        .data(nodes).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", d => areaColors(d.i))
        .attr("opacity", .5)
        .attr("r", d => d.r * 50)
    })
})