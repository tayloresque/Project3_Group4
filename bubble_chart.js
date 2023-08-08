function init(){
    let selector = d3.select("destinationSelect");
        d3.json("hotel_price.json").then(function(data) {
            console.log(data)
        //let names = data.price;

        //for(let i = 0; i < names.length; i++){
        // selector.append("option"). text(names[i]).property("value", namesames[i]);
       // }

        //let firstSample = names[0];
      //  buildCharts(firstSample);
        
    })  

   
}

//init();

    function buildCharts(price) {
        d3.json("hotel_price.json").then (function(data) {
            let priceData = data.price;
            let resultArray = priceData.filter((sampleDictionary) => sampleDictionary.name == price);
            let result = resultArray[0];

            let city = result.city;
            let name = result.name;
            let priceValues = result.price;

            let bubbleLayout = {
            title: "Hotel Price",
                margin: { t: 0}, 
                hovermode: "closest",
                xaxis: { title: "Hotel Price"},

            };
            let bubbleData = [
                {
                x: priceValues,
                y: city,
                text: name,
                mode: "markers",
                marker: {
                    size: priceValues,
                    color: city,
                    colorscale: "Earth"
                }
            }
        ]
        Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
    })};
init();