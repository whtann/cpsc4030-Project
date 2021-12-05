var scatterDiv = document.getElementById("scatterplot");
var barDiv = document.getElementById("barchart");
var heatDiv = document.getElementById("heatmap");

const Genre = ["Action", "Adventure", "Anime", "Casual", "Choose Your Own Adventure",
"Comedy", "Development/Educational", "Early Access", "Exploration/Open World",
"Fantasy", "Fighting", "Horror", "Indie", "Multiplayer", "Music/Rhythm/Great Soundtrack",
"Mystery", "N/A", "Narrative/Visual Novel/Story Rich", "Other", "Platformer", 
"Puzzle", "Racing", "RPG", "Sexual Content", "Shooter", "Simulation", "Sports", 
"Strategy", "Survival/Tactical", "Violent/Crime/War/Zombies"];
const GenreSet = new Set();

var newData = [];
var currentData = [];
var elements = [];

//Scatterplots
d3.csv("SteamGamesLarger3.csv").then(function(dataset) {

    //make buttons to chage to different graphs
    currentData = dataset[12]
    newData = dataset[7]

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
    var genreAccessor = d=> d.Genre

    var gameColor = (genre) => {
        switch(genre) {
            case "Action":
                return "#C0C0C0";
                break;
            case "Adventure":
                return "#808080"
                break;
            case "Anime":
                return "#000000"
                break;
            case "Casual":
                return "#FF0000"
                break;
            case "Choose Your Own Adventure":
                return "#800000"
                break;
            case "Comedy":
                return "#FFFF00"
                break;
            case "Development/Educational":
                return "#808000"
                break;
            case "Early Access":
                return "#00FF00"
                break;
            case "Exploration/Open World":
                return "#008000"
                break;
            case "Fantasy":
                return "#00FFFF"
                break;
            case "Fighting":
                return "#008080"
                break;
            case "Horror":
                return "#0000FF"
                break;
            case "Indie":
                return "#000080"
                break;
            case "Multiplayer":
                return "#FF00FF"
                break;
            case "Mystery":
                return "#800080"
                break;
            case "N/A":
                return "#F8B195"
                break;
            case "Narrative/Visual Novel/Story Rich":
                return "#F67280"
                break;
            case "Other":
                return "#C06C84"
                break;
            case "Platformer":
                return "#6C5B7B"
                break;
            case "Puzzle":
                return "#355C7D"
                break;
            case "Racing":
                return "#E5FCC2"
                break;
            case "RPG":
                return "#9DE0AD"
                break;
            case "Sexual Content":
                return "#45ADA8"
                break;
            case "Shooter":
                return "#547980"
                break;
            case "Simulation/VR":
                return "#594F4F"
                break;
            case "Sports":
                return "#FE4365"
                break;
            case "Strategy":
                return "#F26B38"
                break;
            case "Survival/Tactical":
                return "#2F9599"
                break;
            case "Violent/Crime/War/Zombies":
                return "#5c3c92"
                break;
            default:
                return "#F8B195"
                break;
        }
    }

    var filter_buttons = d3
        .select("#filteroptions")
        .selectAll("Genre")
        .data(Genre)
        .enter()
        .append("input")
        .attr("type", "button")
        .style("background-color", function(d) {
            return gameColor(d);
        })
        .attr("id", function(d) {
            return d;
        })
        .attr("value", function(d) {
            return d;
        })

    d3.select("#filterbuttons") 
        .selectAll("input")
        .on("click", function() {
            var button = d3.select(this);
            var genre = button.attr("id");
            if (GenreSet.has(genre)) {
                GenreSet.delete(genre)
            }
            else {
                GenreSet.add(genre)
            }
            d3.select("#filteroptions")
                .selectAll("input")
                .style("background-color", (d)=> {
                    if(GenreSet.has(d)) {
                        return myColor(d);
                    }
                    else {
                        return "gray";
                    }
                })
            dots
                .transition()
                .duration(200)
                .attr("r", (d)=> {
                    if(GenreSet.has(genreAccessor(d))) {
                        return 3;
                    }
                    else {
                        return 0;
                    }
                })
        })
    
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
            .attr("fill", d => gameColor(d.Genre))
            .attr("r", 3)
            .style("opacity", 1)
        .on("mouseover", function(event, d) {
            d3.select(this).transition()
                .attr("r", 6)
                .style("opacity", .5)
                .attr("stroke-width", 3)
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

            currentData = newData
            newData = d;
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

    var ylabel = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -(dimensions.height/2))
        .attr("y", 20)
        .attr("fill", "black")
        .text("% Positive Review All Time")
    
    var xlabel = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", dimensions.width / 2)
        .attr("y", dimensions.height - 5)
        .attr("fill", "black")
        .text("Price in USD")

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

        xlabel.text("Price in USD")
        ylabel.text("% Positive Review All Time")
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

        xlabel.text("Price in USD")
        ylabel.text("% Positive Review Over Last 30 Days")
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

        xlabel.text("Price in USD")
        ylabel.text("Size in GB")
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

















//barchart
d3.csv("SteamGamesLarger3.csv").then(function(dataset) {
    
    var elements = [
        {key: "Number Reviews All Time",
        values: 
            [
                {Game: currentData.Name, height: currentData.TNRAT},
                {Game: newData.Name, height: newData.TNRAT}
            ]
        },
        {key: "Number Reviews Last 30 Days",
        values: 
            [
                {Game: currentData.Name, height: currentData.TNR30},
                {Game: newData.Name, height: newData.TNR30}
            ]
        }
    ]

    dimensions2 = {
        width: barDiv.clientWidth,
        height: barDiv.clientHeight,
        margin: {
            top: 50,
            bottom: 50,
            right: 50,
            left: 70
        }
    }

    var labels = d3.map(elements, d => d.key)

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
            .attr("width", dimensions2.width + dimensions2.margin.left + dimensions2.margin.right)
            .attr("height", dimensions2.height + dimensions2.margin.left + dimensions2.margin.right)
        
    
    var xScale = d3.scaleBand()
        .domain(labels) 
        .range([dimensions2.margin.left, dimensions2.width - dimensions2.margin.right])
        .padding(0.2)

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(elements[0].values.map(function(d){return d.height}))]) 
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
        .style("font-size", "8px")

    var yAxis = svg.append("g")
        .call(yAxisgen.ticks(10))
        .style("transform", `translateX(${dimensions2.margin.left}px)`)
        .style("font-size", "8px")

    var xSubgroup = d3.scaleBand()
        .domain(elements[0].values.map(function(d){return d.Game}))
        .range([0, xScale.bandwidth()])
        .padding([0.05])

    var colors = d3.map(elements, function(d){
        return d.Game
    })
    
    var color = d3.scaleOrdinal()
        .domain(colors)
        .range(["blue", "red"])

    var bars = svg.selectAll("rect")
        .data(elements)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + xScale(d.key) + ",0)"; })

        bars.selectAll("rect")
        .data(function(d){return d.values})
            .enter().append("rect")
            .attr("width", xSubgroup.bandwidth())
            .attr("x", d => xSubgroup(d.Game)) //xScale(function(){return d.x}
            .attr("y", d => yScale(d.height)) //yScale(function(){return d.y}
        .attr("height", d => dimensions2.height - dimensions2.margin.bottom - yScale(d.height))
        .attr("fill", d => color(d.Game)) //FF007F
        .on('mouseover', function(event, d){
            d3.select(this)
                .attr("stroke-width", 1)
                .attr("stroke", "black")
            tooltip.html(`${d.Game} <br> Total Reviews All Time: ${d.height}`)// <br> Rating All Time: ${newData.PerPosRevAT} <br> Last 30 Days: ${newData.TNR30} <br> Rating Last 30 Days: ${newData.PerPosRev30}`)
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

    var text = svg.append("text")
        .attr("x", (dimensions2.width / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("text-decoration", "underline")  
        .text("Reviews of Selected Games")

    var text2 = svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", dimensions2.width - dimensions2.margin.left - dimensions2.margin.right)
        .attr("y", dimensions2.height - 6)
        .text("Ratings of the Selected Games")
        .style("font-size", "15px")

    var text3 = svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("x", -250)
        .attr("y", 8)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Number of Reviews")
        .style("font-size", "15px")

    // leg1 = svg.append("circle").attr("cx",dimensions2.margin.left-90).attr("cy",35).attr("r", 6).style("fill", "blue")
    // leg2 = svg.append("circle").attr("cx",dimensions2.margin.left).attr("cy",35).attr("r", 6).style("fill", "red")
    // legt1 = svg.append("text").attr("x", dimensions2.margin.left-80).attr("y", 37).text(elements[0].values[0].Game).style("font-size", "9px").attr("alignment-baseline","middle")
    // legt2 = svg.append("text").attr("x", dimensions2.margin.left+10).attr("y", 37).text(elements[0].values[1].Game).style("font-size", "9px").attr("alignment-baseline","middle")

    d3.select("#scatterplot").on('click', function() {
        
        d3.select("#barchart")
            .selectAll("rect")
            .remove()
    
        var elements = [
            {key: "Number Reviews \n All Time",
            values: 
                [
                    {Game: currentData.Name, height: currentData.TNRAT},
                    {Game: newData.Name, height: newData.TNRAT}
                ]
            },
            {key: "Number Reviews \n Last 30 Days",
            values: 
                [
                    {Game: currentData.Name, height: currentData.TNR30},
                    {Game: newData.Name, height: newData.TNR30}
                ]
            }
        ]

        var xScale = d3.scaleBand()
            .domain(labels) 
            .range([dimensions2.margin.left, dimensions2.width - dimensions2.margin.right])
            .padding(0.2)

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(elements[0].values.map(function(d){return d.height}))]) 
            .range([dimensions2.height - dimensions2.margin.bottom, dimensions2.margin.top])

        var xAxisgen = d3.axisBottom().scale(xScale)
        var yAxisgen = d3.axisLeft().scale(yScale)

        var xSubgroup = d3.scaleBand()
            .domain(elements[0].values.map(function(d){return d.Game}))
            .range([0, xScale.bandwidth()])
            .padding([0.05])

        svg.selectAll("rect")
        .data(elements)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + xScale(d.key) + ",0)"; })

        bars.selectAll("rect")
        .data(function(d){return d.values})
            .enter().append("rect")
            .attr("width", xSubgroup.bandwidth())
            .attr("x", d => xSubgroup(d.Game)) //xScale(function(){return d.x}
            .attr("y", d => yScale(d.height)) //yScale(function(){return d.y}
        .attr("height", d => dimensions2.height - dimensions2.margin.bottom - yScale(d.height))
        .attr("fill", d => color(d.Game)) //FF007F
        .on('mouseover', function(event, d){
            d3.select(this)
                .attr("stroke-width", 1)
                .attr("stroke", "black")
                tooltip.html(`${d.Game} <br> Total Reviews: ${d.height}`)// <br> Rating All Time: ${newData.PerPosRevAT} <br> Last 30 Days: ${newData.TNR30} <br> Rating Last 30 Days: ${newData.PerPosRev30}`)
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

        // leg1.append("circle").attr("cx",10).attr("cy",35).attr("r", 6).style("fill", "blue")
        // leg2.append("circle").attr("cx",150).attr("cy",35).attr("r", 6).style("fill", "red")
        // legt1.append("text").attr("x", 20).attr("y", 37).text(elements[0].values[0].Game).style("font-size", "10px").attr("alignment-baseline","middle")
        // legt2.append("text").attr("x", 160).attr("y", 37).text(elements[0].values[1].Game).style("font-size", "10px").attr("alignment-baseline","middle")
    })
})
















d3.csv("HeatMap.csv").then(function(dataset) {
    
    var areaDimensions = {
        width: heatDiv.clientWidth,
        height: heatDiv.clientHeight,
        margin: {
            top: 5,
            bottom: 20,
            right: 10,
            left: 155 //change for space on left
        }
    }

    var svg = d3.select("#heatmap")
        .style("width", areaDimensions.width)
        .style("height", areaDimensions.height)
        .append("svg")
            .attr("width", areaDimensions.width)
            .attr("height", areaDimensions.height)
        .append("g")
            .attr("transform", `translate(${areaDimensions.margin.left}, ${areaDimensions.margin.top})`);

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var myGroups = d3.map(dataset, function(d){return d.Price})
    var myVars = d3.map(dataset, function(d){return d.Genre})

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([0, areaDimensions.width-areaDimensions.margin.left-areaDimensions.margin.right]) // change for x scaling
        .domain(myGroups)
        .padding(0.05);
        svg.append("g")
            .style("font-size", 10)
            .attr("transform", "translate(0," + (areaDimensions.height-areaDimensions.margin.bottom-areaDimensions.margin.top) + ")")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([areaDimensions.height-areaDimensions.margin.bottom-areaDimensions.margin.top, 0 ])
        .domain(myVars)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 10)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

    // Build color scale
    var myColor = d3.scaleSequential()
        .interpolator(d3.interpolate("white", "black"))
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
    // .text("A Heatmap of Games ");

    // Add subtitle to graph
    svg.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
    // .text("A short description of the take-away message of this chart.");

})