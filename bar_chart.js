let hotelData;

const jsonFilePath = 'hotel_final.json';

d3.json(jsonFilePath).then(function(data) {
    hotelData = data;

    // Call updateBar here, after the data has been loaded
    updateBar(0);
}).catch(function(error) {
    console.error('Error loading the JSON file:', error);
});

function updateBar(index) {
  let ratingBuckets = {};
  let ratingCounts = {};

  for (let i = 0; i < hotelData.length; i++) {
    let property = hotelData[i];
    let wholeRating = Math.floor(property.guestrating);

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
  }

  let trace1 = {
    x: Object.keys(ratingBuckets).map(Number),
    y: Object.values(ratingCounts),
    type: 'bar'
  };

  let layout = {
    title: 'Guest Rating Distribution',
    xaxis: {
      title: 'Guest Rating'
    },
    yaxis: {
      title: 'Number of Hotels'
    }
  };

  Plotly.newPlot('bar', [trace1], layout);
}