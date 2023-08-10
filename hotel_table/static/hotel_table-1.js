document.addEventListener('DOMContentLoaded', async () => {
    const citySelect = document.getElementById('citySelect');
    let jsonData= []; // Declare jsonData in a higher scope
  
    // Create a function to update the hotel table
    async function updateHotelData(selectedCity) {
      try {
            const response = await fetch('data/hotel_final.json');
            jsonData= await response.json(); // Update jsonData
            console.log('Updated jsonData:', jsonData); // Log jsonData for debugging
            const tableBody = document.querySelector('#hotelTable tbody');
        
        // Clear existing table rows
        tableBody.innerHTML = '';
  
        jsonData.forEach(hotel => {
            let hotelCity = hotel.city;
            if (selectedCity === '' || hotelCity === selectedCity) {
                let hotelName = hotel.name;
                let city = hotel.city;
                let price = hotel.price;
                let guestRating = hotel.guestrating;
  
                // Create a new row and cells for each Hotel 
                let newRow = tableBody.insertRow();
                let nameCell = newRow.insertCell();
                let cityCell = newRow.insertCell();
                let priceCell = newRow.insertCell();
                let ratingCell = newRow.insertCell();
  
                // Populate the cells for each hotel with extracted data 
                nameCell.textContent = hotelName;
                cityCell.textContent = city;
                priceCell.textContent = `$${price}`;
                ratingCell.textContent = guestRating;
            }
        });
      } catch (error) {
        console.error('Error reading JSON:', error);
      }
    }
  
    // Create a function to initialize the chart
    function initChart(cityData) {
      const chartData = generateChartData(cityData);
  
      if (window.myChart) {
        window.myChart.destroy();
      }
  
      const ctx = document.getElementById('chart').getContext('2d');
      window.myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      });
    }
  
    // Create a function to generate chart data
    // Create a function to generate the data for the bar chart
 function generateChartData(cityData) {
    const labels = cityData.map(hotel => hotel.name);
    const ratings = cityData.map(hotel => hotel.guestrating);
    
    return {
      labels: labels,
      datasets: [{
        label: 'Guest Ratings',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        data: ratings,
      }]
    };
  }
  // Create a function to initialize the price chart
function initPriceChart(cityData) {
    const priceData = cityData.map(hotel => hotel.price);
  
    if (window.myPriceChart) {
      window.myPriceChart.destroy();
    }
  
    const ctx = document.getElementById('priceChart').getContext('2d');
    window.myPriceChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: cityData.map(hotel => hotel.name),
        datasets: [{
          label: 'Hotel Prices',
          backgroundColor: 'rgba(192, 75, 75, 0.2)',
          borderColor: 'rgba(192, 75, 75, 1)',
          borderWidth: 1,
          data: priceData,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }

    // Event listener for city selection change
    citySelect.addEventListener('change', async () => {
        const selectedCity = citySelect.value;
        console.log('Selected city:', selectedCity); // Log selectedCity for debugging
        await updateHotelData(selectedCity);
        initChart(jsonData); // Initialize guest rating chart
        initPriceChart(jsonData); // Initialize price chart
    });
    
    // Initial data load (show all cities initially)
    await updateHotelData('');
    console.log('Initial jsonData:', jsonData); // Log initial jsonData for debugging
    initChart(jsonData); // Initialize guest rating chart
    initPriceChart(jsonData); // Initialize price chart
    
});