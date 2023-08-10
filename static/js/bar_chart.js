const jsonFilePath = 'data/hotel_final.json';
let hotelData; 

function init() {
    let dropdownMenu = d3.select("#destinationSelect");
    const cities = new Set();

    d3.json(jsonFilePath).then((data) => {
        hotelData = data; 
        data.forEach((hotel) => {
            cities.add(hotel.city);
        });

        const cityArray = Array.from(cities);
        cityArray.sort();

        cityArray.forEach((city) => {
            dropdownMenu.append("option").text(city).property("value", city);
        });

        // Call updateBar when the page loads
        updateBar(cityArray[0]);

        // Add an event listener to the dropdown menu
        dropdownMenu.on("change", function() {
            let selectedCity = this.value;
            updateBar(selectedCity);
        });
    }).catch(function(error) {
        console.error('Error loading the JSON file:', error);
    });
}

function updateBar(selectedCity) {
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
}

init();