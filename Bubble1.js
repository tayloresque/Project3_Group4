const url2= 'https://api.json-generator.com/templates/eAX6PQ7qD8mW/data?access_token=68rhjxsz1p2xylbr8oqpqnl06cdcvmghz3318giq';
//d3.json(url2).then(function(data) {
   
  //console.log(data);
//}).catch(function(error) {
 //console.error('Error loading the JSON file:', error);
//});

function init() {
    let dropdownMenu = d3.select("destinationSelect");
  
    
       d3.json(url2).then(function (data) {
        
        
        let priceData = data;
            
        priceData.forEach((id)=>{
            
            console.log(id);
  
            dropdownMenu.append("option").text(id).property("value",id);
        
        });        
  
        
        let firstsamp = priceData[0];
  
         
        //console.log(firstsamp);
  
        
        createScatter(firstsamp);
       
   });
    d3.json(url2).then(function(data) {
        let value = data[1]
            
    
            let bubbleTrace = {
                x: value.price,
                y: value.name,
                text: value.city,
                mode: "markers",
                marker: {
                    size: value.price,
                    color: 'red'
                }
            };
        console.log(bubbleTrace);
  
    // Create the data array for the bubble chart
            //let bubbleData = [bubbleTrace];
  
    // Define the layout for the bubble chart
            let bubbleLayout = {
            title: "Hotel Price",
            xaxis: { title: "Price" },
            yaxis: { title: "Hotels" }
            };
  
    // Plot the bubble chart to a div tag with id "bubble"
        Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
    })};
init();