// Define the function to update hotel data based on the selected city
async function updateHotelData(selectedCity) {
  try {
      const response = await fetch('data/hotel_final.json'); 
      const jsonData = await response.json();
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

document.addEventListener('DOMContentLoaded', () => {
  const citySelect = document.getElementById('citySelect');

  citySelect.addEventListener('change', () => {
      const selectedCity = citySelect.value;
      updateHotelData(selectedCity);
  });

  // Initial data load (show all cities initially)
  updateHotelData('');
});