function switchVisible(graph) {
    if (graph == "sp") {
        document.getElementById('scatterplot').style.display = 'block';
        document.getElementById('barchart').style.display = 'none';
    }
    else if (graph == "bar") {
        document.getElementById('scatterplot').style.display = 'none';
        document.getElementById('barchart').style.display = 'block';
    }
}