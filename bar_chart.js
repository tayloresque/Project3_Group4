// Fetch the JSON data and assign it to the variables

let hotelData;

const jsonFilePath = 'data/hotel_final.json';

// Load JSON data
d3.json(jsonFilePath).then(function(data) {
    //console.log(data)
    hotelData = data.name; 

    // Create bar chart with first city
    updateBar(0);

    //Populate the dropdown menu with the city name
    d3.select('#destinationSelect')
    .selectAll('option')
    .data(hotelData)
    .enter()
    .append('option')
    .text(name => name)
    .property('value', name => name)

  }).catch(function(error) {
    console.error('Error loading the JSON file:', error);
});

 // This function 'updatePlotly' is called when a dropdown menu item is selected
// function updatePlotly(index) {
//   let hotelValues =hotelData[index].
// }


// Create bar chart
function updateBar(index) {
// create dictionaries to store buckets of ratings rounded to nearest whole number & count of hotels with each rating
  let ratingBuckets = {};
  let ratingCounts = {};
  hotelData.forEach(property => {
    let wholeRating = Math.floor(property.guestrating); // Round to nearest whole number
    if (ratingBuckets[wholeRating]) {
      ratingBuckets[wholeRating].push(property);
    } else {
      ratingBuckets[wholeRating] = [property];
    }

    if (ratingCounts[wholeRating]) {
      ratingCounts[wholeRating]++;
    } else {
      ratingCounts[wholeRating] = 1;
    }
  });


  let trace1 = {
    x: Object.keys(ratingBuckets).map(Number), // Convert keys to numbers
    y: Object.values(ratingCounts),
    type: 'bar'
  };

  let layout = {
    title: 'Hotel Guest Ratings by City',
    xaxis: {
      title: 'Guest Rating'
    },
    yaxis: {
      title: 'Number of Hotels'
    }
  }

  Plotly.newPlot('bar', [trace1], layout)
}

