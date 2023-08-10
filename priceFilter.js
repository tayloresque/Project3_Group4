let jsonData = []; // Declare an empty array for the data
        let priceChart = null; // Store the chart instance
    
        // Fetch the JSON data
        fetch('data/hotel_final.json')
          .then(response => response.json())
          .then(data => {
            jsonData = data;
          })
          .catch(error => console.error("Error fetching data:", error));
    
          function filterHotels() {
  const minPrice = parseFloat(document.getElementById("minPriceFilter").value);
  const maxPrice = parseFloat(document.getElementById("priceFilter").value);
  const filteredHotels = [];
    
          for (const hotel of jsonData) {
              const hotelPrice = parseFloat(hotel.price);
              if (hotelPrice >= minPrice && hotelPrice <= maxPrice) {
                filteredHotels.push(hotel);
              }
            }
    
            populateTable(filteredHotels);
            updatePriceChart(filteredHotels);
        }
    
        function populateTable(filteredHotels) {
          const tableBody = document.getElementById("hotelTableBody");
          tableBody.innerHTML = "";
    
          for (const hotel of filteredHotels) {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${hotel.name}</td>
              <td>${hotel.city}</td>
              <td>${hotel.state}</td>
              <td>${hotel.price}</td>
              <td>${hotel.guestrating}</td>
            `;
            tableBody.appendChild(row);
          }
        }
  // adding .destroy so that we can reuse canvas on another search 
  function updatePriceChart(filteredHotels) {
  if (priceChart) {
    priceChart.destroy(); // Destroy the existing chart
  }

  const ctx = document.getElementById("priceChart").getContext("2d");

  const hotelNames = filteredHotels.map(hotel => hotel.name);
  const hotelPrices = filteredHotels.map(hotel => parseFloat(hotel.price));

  console.log(hotelNames); // Check if hotelNames and hotelPrices arrays have data
  console.log(hotelPrices);

  priceChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: hotelNames,
      datasets: [
        {
          label: "Price",
          data: hotelPrices,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}