const url = "hotel_price.json"


d3.json(url).then(function(data) {
  console.log(data);
});

//function init() {

    
    //let dropdownMenu = d3.select("destinationSelect");
  
    
    //d3.json(url).then((data) => {
        
        
        //let names = data.names;
  
       
        //names.forEach((id) => {
  
            
            //console.log(id);
  
            //dropdownMenu.append("option").text(id).property("value",id);
       // });
  
        
      //let firstsamp = data.names[0];
  
         
        //console.log(firstsamp);
  
        
      createScatter(0);
       
  
    //});
  //};
  
  
  
 
function createScatter(bubble) {
  
    
    d3.json(url).then((data) => {
        
        
        let priceInfo = data.price;
  
        
        let value = priceInfo.filter(result => result.id == bubble);
  
         
        let valueData = value[0];
  
        
        let otu_ids = valueData.price;
        let otu_labels = valueData.name;
        let sample_values = valueData.city;
  
        
        console.log(otu_ids,otu_labels,sample_values);
        
        
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: otu_ids,
                color: sample_values,
                colorscale: "Earth"
            }
        };
        
        let layout = {
          title: "Hotel Price",
        };
  
          
          Plotly.newPlot("bubble", [trace1], layout)
      });
  };
  
  

  
  
function optionChanged(newValue) { 
  
    
    console.log(newValue); 
  
    
    createScatter(newValue)
    //createBar(newValue)
    //createSummary(newValue)
  };
  
  
//init();  