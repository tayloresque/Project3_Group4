const url = "Data/hotel_price.csv";
const url2= 'https://api.json-generator.com/templates/eAX6PQ7qD8mW/data?access_token=68rhjxsz1p2xylbr8oqpqnl06cdcvmghz3318giq';


d3.json(url2).then(function(data) {
   
  //console.log(data);
}).catch(function(error) {
  console.error('Error loading the JSON file:', error);
});

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
 };
   
  function createScatter() {
  
    
    d3.json(url2).then(function(data)  {
        
        
        let labels = [];
        let values = [];
        let names = [];
        
        for (i = 0; i < length; i++) {
          labels.push(data[i].city);
          values.push(data[i].price);
          names.push(data[i].name);

        }
          console.log(values);
          console.log(labels);
        
        let trace1 = {
            x: labels,
            y: values,
            text: names,
            mode: "markers",
            marker: {
                size: (values /2),
                color: 'pink',
                colorscale: "Earth"
            }
        };
        
        let layout = {
          title: "Hotel Price Per City",
          hovermode: 'closest'
        };
  
          
      Plotly.newPlot("bubble", [trace1], layout)
      });
  
    }
  //function optionChanged(newValue) { 
  
    
  //console.log(newValue); 
  
  //createScatter(newValue)
    //createBar(newValue)
    //createSummary(newValue)
  //};
  
  
init();  