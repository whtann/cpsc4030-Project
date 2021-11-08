//scatterplot template
function scatterplot() {
    d3.csv("SteamGames_New.csv").then(function(dataset) {

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

        var svg = d3.select("#scatterplot1")
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

        var colors = dataset.map(d => d.Name)
        
        var color = d3.scaleOrdinal()
            .domain(colors)
            .range(d3.schemeCategory10)

        var dots = svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(xAccessor(d)))
            .attr("cy", d => yScale(yAccessor(d)))
            .attr("fill", d => color(d.Genre))
            .attr("r", 3)

        var xAxisgen = d3.axisBottom().scale(xScale)
        var yAxisgen = d3.axisLeft().scale(yScale)

        var xAxis = svg.append("g")
            .call(xAxisgen)
            .style("Transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

        var yAxis = svg.append("g")
            .call(yAxisgen)
            .style("transform", `translateX(${dimensions.margin.left}px)`)

    })
}

// function barchart() {
//     //barchart template
//     d3.csv("SteamGames_New.csv").then(function(dataset) {

//         dimensions = {
//             width: 50000,
//             height: 800,
//             margin: {
//                 top: 50,
//                 bottom: 50,
//                 right: 10,
//                 left: 50
//             }
//         }

//         var svg = d3.select("#barchart")
//             .style("width", dimensions.width)
//             .style("height", dimensions.height)

//         var names = dataset.map(d => d.Name)
        
//         var xScale = d3.scaleBand()
//             .domain(names) 
//             .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
//             .padding(0.2)


//         var yScale = d3.scaleLinear()
//             .domain([0, 100000])
//             .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])


//         var dots = svg.selectAll("rect")
//             .data(dataset)
//             .enter()
//             .append("rect")
//             .attr("x", d => xScale(d.Name))
//             .attr("y", d => yScale(d.TNRAT))
//             .attr("width", xScale.bandwidth())
//             .attr("height", d => dimensions.height - dimensions.margin.top - yScale(d.TNRAT))
//             .attr("fill", "#FF007F");


//         var xAxisgen = d3.axisBottom().scale(xScale)
//         var yAxisgen = d3.axisLeft().scale(yScale)


//         var xAxis = svg.append("g")
//             .call(xAxisgen)
//             .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`) 
//             .selectAll("text")
//             .attr("y", 0)
//             .attr("x", "-15em")
//             .attr("transform", "rotate(-65)")
//             .style("font-size", "6px")


//         var yAxis = svg.append("g")
//             .call(yAxisgen.ticks(22))
//             .style("transform", `translateX(${dimensions.margin.left}px)`)


//         svg.append("text")
//             .attr("x", (dimensions.width / 2))             
//             .attr("y", 20)
//             .attr("text-anchor", "middle")  
//             .style("font-size", "24px") 
//             .style("text-decoration", "underline")  
//             .text("Steam Bar Graph");

//     })
// }

//forces template
d3.csv("SteamGames_New.csv").then(function(dataset) {

    var dimensions = {
        width: 1500,
        height: 1000,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 50
        }
    }

    var colors = dataset.map(d => d.ID)
    
    var color = d3.scaleOrdinal()
        .domain(colors)
        .range(d3.schemeCategory10)

    var svg = d3.select("#areachart")
        .style("width", dimensions.width)
        .style("height", dimensions.height)

    var nodes = dataset.map(function(d) {
        return {
            r: d.TNRATRev,
            i: d.ID,
        }
    });

    var layout = d3.forceSimulation(nodes)
        .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
        //.force('charge', d3.forceManyBody().strength(30))
        .on('tick', ticked)

    var node = svg.append("g")
        .selectAll("circle")
        .data(nodes).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", d => color(d.i))
        .attr("opacity", .5)
        .attr("r", d => d.r)
      
    function ticked(){
        svg.selectAll("circle")
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
    }
})

// Genre / Number Reviews
function barchart() {
    //barchart template
    d3.csv("SteamGames_New.csv").then(function(dataset) {

        dimensions = {
            width: 6000,
            height: 800,
            margin: {
                top: 50,
                bottom: 100,
                right: 10,
                left: 80
            }
        }

        var svg = d3.select("#barchart")
            .style("width", dimensions.width)
            .style("height", dimensions.height)

        var genres = dataset.map(d => d.Genre)
        
        var xScale = d3.scaleBand()
            .domain(genres) 
            .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
            .padding(0.2)


        var yScale = d3.scaleLinear()
            .domain([0, 3500000])
            .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])


        var dots = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.Genre))
            .attr("y", d => yScale(d.TNRAT))
            .attr("width", xScale.bandwidth())
            .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d.TNRAT))
            .attr("fill", "#FF007F");


        var xAxisgen = d3.axisBottom().scale(xScale)
        var yAxisgen = d3.axisLeft().scale(yScale)


        var xAxis = svg.append("g")
            .call(xAxisgen)
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`) 
            .selectAll("text")
            .attr("y", 0)
            .attr("x", "-15em")
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
            .text("Steam Bar Graph");

    })
}

// //heatmap template
// d3.csv("SteamGames_New.csv").then(function(dataset) {

//     console.log(dataset)

//     var dimensions = {
//         width: 1500,
//         height: 800,
//         margin: {
//             top: 10,
//             bottom: 50,
//             right: 10,
//             left: 50
//         }
//     }

//     var svg = d3.select("#my_dataviz")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//     var x = d3.scaleBand()
//         .range([ 0, width ])
//         .domain(/* */)
//         .padding(0.01)

//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
      
    
//     var y = d3.scaleBand()
//         .range([height, 0])
//         .domain(/* */)
//         .padding(0.01)

//     svg.append("g")
//         .call(d3.axisLeft(y));
      
    
//     var myColor = d3.scaleLinear()
//         .range(["white", "#69b3a2"])
//         .domain([1,100])

//     // svg.selectAll()
//     //     .data(data, function(d) {return d.group+':'+d.variable;})
//     //     .enter()
//     //     .append("rect")
//     //     .attr("x", function(d) { return x(d.group) })
//     //     .attr("y", function(d) { return y(d.variable) })
//     //     .attr("width", x.bandwidth() )
//     //     .attr("height", y.bandwidth() )
//     //     .style("fill", function(d) { return myColor(d.value)} )
// })

// // //I want to try something here
// d3.csv("SteamGames_New.csv").then(function(dataset) {

//     console.log(dataset)

//     var dimensions = {
//         width: 1500,
//         height: 800,
//         margin: {
//             top: 10,
//             bottom: 50,
//             right: 10,
//             left: 50
//         }
//     }

//     var svg = d3.select("#bubblechart")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     var x = d3.scaleLinear()
//         .domain([0, 45000])
//         .range([ 0, width]);
    
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x).ticks(3));

//     var y = d3.scaleLinear()
//         .domain([35, 90])
//         .range([ height, 0]);
    
//     svg.append("g")
//         .call(d3.axisLeft(y));

//     var z = d3.scaleSqrt()
//         .domain([200000, 1310000000])
//         .range([2, 30]);

//     var colors = dataset.map(d => d.TNRAT)
//     var nodes = dataset.map(d => d.PerPosRevAT)

//     var color = d3.scaleOrdinal()
//         .domain(colors)
//         .range(d3.schemeCategory10);

//     svg.append('g')
//         .selectAll("dot")
//         .data(nodes)
//         .enter()
//         .append("circle")
//         .attr("cx", d => d.x)
//         .attr("cy", d => d.y)
//         .attr("r", 10)
//         .style("fill", d => color(d.Developer))
// })

// //Memory Size and Price
d3.csv("SteamGames_New.csv").then(function(dataset) {

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

    var svg = d3.select("#scatterplot2")
        .style("width", dimensions.width)
        .style("height", dimensions.height)

    var xAccessor = d => d.Price
    var yAccessor = d => d.Storage
    var xAccessorNew = d => d.Name

    var xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor)) 
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    var colors = dataset.map(d => d.Name)
    console.log(colors)
    
    var color = d3.scaleOrdinal()
        .domain(colors)
        .range(d3.schemeCategory10)

    var dots = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("fill", d => color(d.Genre))
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
})

function scatterplot() {
    d3.csv("SteamGames_New.csv").then(function(dataset) {

        var dimensions = {
            width: 2000,
            height: 800,
            margin: {
                top: 10,
                bottom: 50,
                right: 10,
                left: 50
            }
        }

        var svg = d3.select("#scatterplot3")
            .style("width", dimensions.width)
            .style("height", dimensions.height)

        var xAccessor = d => d.ID
        var yAccessor = d => d.Price
        var xAccessorNew = d => d.Genre

        var xScale = d3.scaleLinear()
            .domain(d3.extent(dataset, xAccessor))
            .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        var yScale = d3.scaleLinear()
            .domain(d3.extent(dataset, yAccessor)) 
            .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

        var colors = dataset.map(d => d.Price)
        
        var color = d3.scaleOrdinal()
            .domain(colors)
            .range(d3.schemeCategory10)

        var dots = svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(xAccessor(d)))
            .attr("cy", d => yScale(yAccessor(d)))
            .attr("fill", d => color(d.Developer))
            .attr("r", 3)

        var xAxisgen = d3.axisBottom().scale(xScale)
        var yAxisgen = d3.axisLeft().scale(yScale)

        var xAxis = svg.append("g")
            .call(xAxisgen)
            .style("Transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

        var yAxis = svg.append("g")
            .call(yAxisgen)
            .style("transform", `translateX(${dimensions.margin.left}px)`)

    })
}

//final area/grid chart
d3.csv("SteamGames_New.csv").then(function(dataset) {

    var dimensions = {
        width: 1500,
        height: 1000,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 50
        }
    }

    var colors = dataset.map(d => d.ID)
    
    var color = d3.scaleOrdinal()
        .domain(colors)
        .range(d3.schemeCategory10)

    var svg = d3.select("#scatterplot")
        .style("width", dimensions.width)
        .style("height", dimensions.height)

    var nodes = dataset.map(function(d) {
        return {
            r: d.TNRATRev,
            i: d.All,
        }
    });

    var layout = d3.forceSimulation(nodes)
        .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
        .on('tick', ticked)


        var node = svg.append("g")
            .selectAll("circle")
            .data(nodes).enter()
            .append("circle")
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr("fill", d => d.i)
            .attr("opacity", .5)
            .attr("r", d => d.r)
      
    function ticked(){
        svg.selectAll("circle")
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
    }
})

//second area chart
d3.csv("SteamGames_New.csv").then(function(dataset) {

    var dimensions = {
        width: 1500,
        height: 1000,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 50
        }
    }

    var colors = dataset.map(d => d.ID)
    
    var color = d3.scaleOrdinal()
        .domain(colors)
        .range(d3.schemeCategory10)

    var svg = d3.select("#areachart2")
        .style("width", dimensions.width)
        .style("height", dimensions.height)

    var nodes = dataset.map(function(d) {
        return {
            r: d.Mac*10,
            i: d.TNRATRev,
        }
    });

    var nodes2 = dataset.map(function(d) {
        return {
            r: d.Windows*10,
            ii: d.TNRATRev,
        }
    });

    var nodes3 = dataset.map(function(d) {
        return {
            r: d.SteamLinux*10,
            iii: d.TNRATRev,
        }
    });

    var nodes4 = dataset.map(function(d) {
        return {
            r: d.MacWindows*10,
            iv: d.TNRATRev,
        }
    });

    var nodes5 = dataset.map(function(d) {
        return {
            r: d.MacSteam*10,
            v: d.TNRATRev,
        }
    });

    var nodes6 = dataset.map(function(d) {
        return {
            r: d.WindowsSteam*10,
            vi: d.TNRATRev,
        }
    });

    var nodes7 = dataset.map(function(d) {
        return {
            r: d.All*10,
            vii: d.TNRATRev
        }
    });

    //console.log(nodes7)

    var layout = d3.forceSimulation(nodes)
        .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
        //.force('charge', d3.forceManyBody().strength(30))
        .on('tick', ticked)

    var layout2 = d3.forceSimulation(nodes2)
        .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
        //.force('charge', d3.forceManyBody().strength(30))
        .on('tick', ticked)

    var layout3 = d3.forceSimulation(nodes3)
        .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
        //.force('charge', d3.forceManyBody().strength(30))
        .on('tick', ticked)

    var layout4 = d3.forceSimulation(nodes4)
        .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
        //.force('charge', d3.forceManyBody().strength(30))
        .on('tick', ticked)

    var layout5 = d3.forceSimulation(nodes5)
        .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
        //.force('charge', d3.forceManyBody().strength(30))
        .on('tick', ticked)

    var layout6 = d3.forceSimulation(nodes6)
        .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
        //.force('charge', d3.forceManyBody().strength(30))
        .on('tick', ticked)

    var layout7 = d3.forceSimulation(nodes7)
        .force('center', d3.forceCenter(dimensions.width/2, dimensions.height/2))
        .force('collisions', d3.forceCollide().radius(function(d) {return d.TNRATRev}))
        //.force('charge', d3.forceManyBody().strength(30))
        .on('tick', ticked)

    var node = svg.append("g")
        .selectAll("circle")
        .data(nodes).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", "brown")
        .attr("opacity", .5)
        .attr("r", d => d.r)

    var node2 = svg.append("g")
        .selectAll("circle")
        .data(nodes2).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", "purple")
        .attr("opacity", .5)
        .attr("r", d => d.r)

    var node3 = svg.append("g")
        .selectAll("circle")
        .data(nodes3).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", "orange")
        .attr("opacity", .5)
        .attr("r", d => d.r)

    var node4 = svg.append("g")
        .selectAll("circle")
        .data(nodes4).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", "red")
        .attr("opacity", .5)
        .attr("r", d => d.r)

    var node5 = svg.append("g")
        .selectAll("circle")
        .data(nodes5).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", "yellow")
        .attr("opacity", .5)
        .attr("r", d => d.r)

    var node6 = svg.append("g")
        .selectAll("circle")
        .data(nodes6).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", "green")
        .attr("opacity", .5)
        .attr("r", d => d.r)

    var node7 = svg.append("g")
        .selectAll("circle")
        .data(nodes7).enter()
        .append("circle")
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("fill", "blue")
        .attr("opacity", .5)
        .attr("r", d => d.r)
      
    function ticked(){
        svg.selectAll("circle")
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
    }
})

// Genre / Number Reviews
function barchart() {
    //barchart template
    d3.csv("SteamGames_New.csv").then(function(dataset) {

        dimensions = {
            width: 6000,
            height: 800,
            margin: {
                top: 50,
                bottom: 100,
                right: 10,
                left: 80
            }
        }

        var svg = d3.select("#barchart")
            .style("width", dimensions.width)
            .style("height", dimensions.height)

        var genres = dataset.map(d => d.Genre)
        
        var xScale = d3.scaleBand()
            .domain(genres) 
            .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
            .padding(0.2)


        var yScale = d3.scaleLinear()
            .domain([0, 3500000])
            .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])


        var dots = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.Genre))
            .attr("y", d => yScale(d.TNRAT))
            .attr("width", xScale.bandwidth())
            .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d.TNRAT))
            .attr("fill", "#FF007F");


        var xAxisgen = d3.axisBottom().scale(xScale)
        var yAxisgen = d3.axisLeft().scale(yScale)


        var xAxis = svg.append("g")
            .call(xAxisgen)
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`) 
            .selectAll("text")
            .attr("y", 0)
            .attr("x", "-15em")
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
            .text("Steam Bar Graph");

    })
}

window.onload = scatterplot();