// // Load JSON data and assing to a variable

// let hotelData;

// const jsonFilePath = 'data/hotel_final.json';

// d3.json(jsonFilePath).then(function(data) {
//     hotelData = data;

//     // Call updateBar here, after the data has been loaded
//     updateBar(0);
// }).catch(function(error) {
//     console.error('Error loading the JSON file:', error);
// });

// function updateBar(index) {
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

//   Plotly.newPlot('bar', [trace1], layout);
// }

// Fetch the JSON data and assign it to the variables
let hotelData;

const jsonFilePath = 'data/hotel_final.json';

// Load JSON data
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

  const labels = Object.keys(ratingBuckets).map(Number);
  const dataValues = Object.values(ratingCounts);

  const ctx = document.getElementById('barChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Number of Hotels',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Guest Rating'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Hotels'
          }
        }
      },
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Guest Rating Distribution'
        }
      }
    }
  });
}