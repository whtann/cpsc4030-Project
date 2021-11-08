function switchVisible(graph) {
    if (graph == "sp") {
        document.getElementById('scatterplot').style.display = 'block';
        document.getElementById('barchart').style.display = 'none';
        document.getElementById('areachart').style.display = 'none';
        document.getElementById('barchart2').style.display = 'none';
        document.getElementById('scatterplot2').style.display = 'none';
        document.getElementById('scatterplot3').style.display = 'none';
        document.getElementById('areachart2').style.display = 'none';
        document.getElementById('areachart3').style.display = 'none';
    }
    else if (graph == "bar") {
        document.getElementById('scatterplot').style.display = 'none';
        document.getElementById('barchart').style.display = 'block';
        document.getElementById('areachart').style.display = 'none';
        document.getElementById('barchart2').style.display = 'none';
        document.getElementById('scatterplot2').style.display = 'none';
        document.getElementById('scatterplot3').style.display = 'none';
        document.getElementById('areachart2').style.display = 'none';
        document.getElementById('areachart3').style.display = 'none';
    }
    else if (graph == "area") {
        document.getElementById('scatterplot').style.display = 'none';
        document.getElementById('barchart').style.display = 'none';
        document.getElementById('areachart').style.display = 'block';
        document.getElementById('barchart2').style.display = 'none';
        document.getElementById('scatterplot2').style.display = 'none';
        document.getElementById('scatterplot3').style.display = 'none';
        document.getElementById('areachart2').style.display = 'none';
        document.getElementById('areachart3').style.display = 'none';
    }
    else if (graph == "bar2") {
        document.getElementById('scatterplot').style.display = 'none';
        document.getElementById('barchart').style.display = 'none';
        document.getElementById('areachart').style.display = 'none';
        document.getElementById('barchart2').style.display = 'block';
        document.getElementById('scatterplot2').style.display = 'none';
        document.getElementById('scatterplot3').style.display = 'none';
        document.getElementById('areachart2').style.display = 'none';
        document.getElementById('areachart3').style.display = 'none';
    }
    else if (graph == "sp2") {
        document.getElementById('scatterplot').style.display = 'none';
        document.getElementById('barchart').style.display = 'none';
        document.getElementById('areachart').style.display = 'none';
        document.getElementById('barchart2').style.display = 'none';
        document.getElementById('scatterplot2').style.display = 'block';
        document.getElementById('scatterplot3').style.display = 'none';
        document.getElementById('areachart2').style.display = 'none';
        document.getElementById('areachart3').style.display = 'none';
    }
    else if (graph == "sp3") {
        document.getElementById('scatterplot').style.display = 'none';
        document.getElementById('barchart').style.display = 'none';
        document.getElementById('areachart').style.display = 'none';
        document.getElementById('barchart2').style.display = 'none';
        document.getElementById('scatterplot2').style.display = 'none';
        document.getElementById('scatterplot3').style.display = 'block';
        document.getElementById('areachart2').style.display = 'none';
        document.getElementById('areachart3').style.display = 'none';
    }
    else if (graph == "area2") {
        document.getElementById('scatterplot').style.display = 'none';
        document.getElementById('barchart').style.display = 'none';
        document.getElementById('areachart').style.display = 'none';
        document.getElementById('barchart2').style.display = 'none';
        document.getElementById('scatterplot2').style.display = 'none';
        document.getElementById('scatterplot3').style.display = 'none';
        document.getElementById('areachart2').style.display = 'block';
        document.getElementById('areachart3').style.display = 'none';
    }
    else if (graph == "area3") {
        document.getElementById('scatterplot').style.display = 'none';
        document.getElementById('barchart').style.display = 'none';
        document.getElementById('areachart').style.display = 'none';
        document.getElementById('barchart2').style.display = 'none';
        document.getElementById('scatterplot2').style.display = 'none';
        document.getElementById('scatterplot3').style.display = 'none';
        document.getElementById('areachart2').style.display = 'none';
        document.getElementById('areachart3').style.display = 'block';
    }
}