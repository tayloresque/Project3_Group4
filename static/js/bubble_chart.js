// Fetch data from the API endpoint using d3.json()

//const url = 'C:\Users\calei\OneDrive\Desktop\BC\Projects\Project3_Group4\Data\hotel_price.csv'        
    
d3.json('hotel_price.json').then(function(data) {
            // Use the fetched data for visualization
    console.log(data); // Just an example, you can customize the visualization here
    });
   
        function createScatter(bubble) {
          
            
            d3.json('hotel_price.json').then((data) => {
                
                
                let hotelInfo = data.name;
          
                
                let value = hotelInfo.filter(result => result.id == bubble);
          
                 
                let valueData = value[0];
          
                
                let price = valueData.price;
                let score_label = valueData.score;
                let city = valueData.city;
          
                
                console.log(price,score_label,city);
                
                
                let trace1 = {
                    x: price,
                    y: city,
                    text: score_label,
                    mode: "markers",
                    marker: {
                        size: price,
                        color: city,
                        colorscale: "Earth"
                    }
                };
                
                let layout = {
                  title: "Hotel Price",
                };
          
                  
                Plotly.newPlot("bubble", [trace1], layout)
              });
          };          
init ();
        
          
          
         