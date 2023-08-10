// // Fetch data from the API endpoint using d3.json()

// //const url = 'C:\Users\calei\OneDrive\Desktop\BC\Projects\Project3_Group4\Data\hotel_price.csv'        
    
// d3.json('hotel_price.json').then(function(data) {
//             // Use the fetched data for visualization
//     console.log(data); // Just an example, you can customize the visualization here
//     });
   
//         function createScatter(bubble) {
          
            
//             d3.json('hotel_price.json').then((data) => {
                
                
//                 let hotelInfo = data.name;
          
                
//                 let value = hotelInfo.filter(result => result.id == bubble);
          
                 
//                 let valueData = value[0];
          
                
//                 let price = valueData.price;
//                 let score_label = valueData.score;
//                 let city = valueData.city;
          
                
//                 console.log(price,score_label,city);
                
                
//                 let trace1 = {
//                     x: price,
//                     y: city,
//                     text: score_label,
//                     mode: "markers",
//                     marker: {
//                         size: price,
//                         color: city,
//                         colorscale: "Earth"
//                     }
//                 };
                
//                 let layout = {
//                   title: "Hotel Price",
//                 };
          
                  
//                 Plotly.newPlot("bubble", [trace1], layout)
//               });
//           };          
// init ();
        
// const url = "data/hotel_price.json";
// // const url2= 'https://api.json-generator.com/templates/eAX6PQ7qD8mW/data?access_token=68rhjxsz1p2xylbr8oqpqnl06cdcvmghz3318giq';
// const jsonFilePath = 'data/hotel_final.json';

// function init() {
//     let dropdownMenu = d3.select("#destinationSelect");
//     const cities = new Set()
//     d3.json(jsonFilePath).then((data) => {
//         data.forEach((hotel) => {
//             cities.add(hotel.city);
//         });
//         const cityArray = Array.from(cities)
//         cityArray.sort()
//         cityArray.forEach((city) => {
//             dropdownMenu.append("option").text(city).property("value", city);
//         });
//     }).catch(function(error) {
//         console.error('Error loading the JSON file:', error);
//         let firstsamp = priceData[0];
//         createScatter(firstsamp);
//     });
// };
   
// function createScatter(sample) {
//     d3.json(url).then((data) => {
//         let sampleData = data.samples;
//         let value = sampleData.filter(result => result.name == sample);
//         let dataValue = value[0];
//         let bubbleCity = dataValue.city;
//         let names = dataValue.name;
//         let priceHotels = dataValue.price;
//         // let labels = [];
//         // let values = [];
//         // let names = [];
        
//         // for (i = 0; i < length; i++) {
//           //let value = data.filter(result => result.city == bubble);
//           //console.log(value);
//         //   labels.push(data[i].city);
//         //   values.push(data[i].price);
//         //   names.push(data[i].name);
        
//         let trace1 = {
//             x: bubbleCity,
//             y: priceHotels,
//             text: names,
//             mode: "markers",
//             marker: {
//                 size: 20,
//                 color: 'pink',
//                 colorscale: "Earth"
//             }
//         };
        
//         let layout = {
//             title: "Hotel Price Per City",
//             hovermode: 'closest'
//         };
          
//         Plotly.newPlot("bubble", [trace1], layout)
//     });
// };

// function optionChanged(newValue) {
//     console.log(newValue); 
//     createScatter(newValue)
// };

// init();    

// const jsonFilePath = 'data/hotel_final.json';
// let hotelData; 

// function init() {
//     let dropdownMenu = d3.select("#destinationSelect");
//     const cities = new Set();

//     d3.json(jsonFilePath).then((data) => {
//         hotelData = data; 
//         data.forEach((hotel) => {
//             cities.add(hotel.city);
//         });

//         const cityArray = Array.from(cities);
//         cityArray.sort();

//         cityArray.forEach((city) => {
//             dropdownMenu.append("option").text(city).property("value", city);
//         });

//         // Call updateBar when the page loads
//         updateBar(cityArray[0]);

//         // Add an event listener to the dropdown menu
//         dropdownMenu.on("change", function() {
//             let selectedCity = this.value;
//             updateBar(selectedCity);
//         });
//     }).catch(function(error) {
//         console.error('Error loading the JSON file:', error);
//     });
// };

// function updateBar(selectedCity) {
  
//   let ratingBuckets = {};
//   let ratingCounts = {};

//   for (let i = 0; i < hotelData.length; i++) {
//     let property = hotelData[i];
//     let wholeRating = Math.floor(property.guestrating);

//     if (ratingBuckets[wholeRating]) {
//       ratingBuckets[wholeRating].push(property);
//     } else {
//       ratingBuckets[wholeRating] = [property];
//     }

//     if (ratingCounts[wholeRating]) {
//       ratingCounts[wholeRating]++;
//     } else {
//       ratingCounts[wholeRating] = 1;
//     }
//   }

//   let trace1 = {
//     x: Object.keys(ratingBuckets).map(Number),
//     y: Object.values(ratingCounts),
//     type: 'bar'
//   };

//   let layout = {
//     title: 'Guest Rating Distribution',
//     xaxis: {
//       title: 'Guest Rating'
//     },
//     yaxis: {
//       title: 'Number of Hotels'
//     }
//   };

//     Plotly.newPlot('bar', [trace1], layout)
// };

// function changeSelectedCity(value) {
//     updateBar(value);
// };

// init();

let hotelData1;

const jsonFilePath1 = 'data/hotel_final.json';

function init() {

  // Define the price range labels

  d3.json(jsonFilePath1).then(function(data) {
    hotelData1 = data;

    // Call updateBar here, after the data has been loaded
    updateBubble(0);
  }).catch(function(error) {
    console.error('Error loading the JSON file:', error);
  });
};

function updateBubble(selectedCity) {
    // Filter data for the selected city
  d3.json(jsonFilePath1).then((hotelData1) => {
    let filteredData = hotelData1.filter(item => item.city === selectedCity);
    let labels = filteredData.map(item => item.city);
    let values = filteredData.map(item => item.price);
    let names = filteredData.map(item => item.name);
    let trace1 = {
      x: labels,
      y: values,
      text: names,
      mode: "markers",
      marker: {
        size: 20,
        color: 'pink',
        colorscale: "Earth"
      }
    };
    let layout = {
      title: "Hotel Price Per City",
      hovermode: 'closest'
    };

    // Count hotels in price ranges and prepare for bubble
      const priceRangeText = [
      "$1-300",
      "$301-600",
      "$601-900",
      "$901-1200",
      "$1201-1500",
      ">$1500"
      ];
    
      let bubbleData = [];
      let priceRanges = [0, 300, 600, 900, 1200, 1500, Number.POSITIVE_INFINITY];
      let bubbleColors = ["rgb(0, 0, 255)", "rgb(0, 128, 0)", "rgb(255, 165, 0)", "rgb(255, 0, 0)", "rgb(128, 0, 128)", "rgb(0, 0, 0)"];

      for (let i = 0; i < priceRanges.length - 1; i++) {
        count = 0;
          values.forEach(price => {
              if (price >= priceRanges[i] && price < priceRanges[i + 1]) {
                  count++;
              }
          });
          let bubble = {
            x: [priceRangeText[i]],  // X-coordinate of bubble
            y: [count],             // Y-coordinate of bubble
            text: [priceRangeText[i]], 
            mode: "markers",
            marker: {
                size: count * 10,  // Adjust bubble size based on count
                color: bubbleColors[i],
                opacity: 0.7
            }
          };
          bubbleData.push(bubble);
      }
          let bubbleLayout = {
            title: "Hotel Count in Price Ranges (Bubble Chart)",
            xaxis: {
              title: "Price Range"
            },
            yaxis: {
              title: "Hotel Count"
            },
            showlegend: false
          };

      // Create a bubble chart for the price ranges
    Plotly.newPlot("bubbleChart", bubbleData, bubbleLayout)
  });
};

function optionChanged(newValue) {
        // Call updateBubble when the dropdown value changes
    updateBubble(newValue);
};

init();