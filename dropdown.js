const jsonFilePath = 'data/hotel_final.json';

function init() {
    let dropdownMenu = d3.select("#destinationSelect");
    const cities = new Set()
    d3.json(jsonFilePath).then((data) => {
        data.forEach((hotel) => {
            cities.add(hotel.city);
        });
        const cityArray = Array.from(cities)
        cityArray.sort()
        cityArray.forEach((city) => {
            dropdownMenu.append("option").text(city).property("value", city);
        });
    }).catch(function(error) {
        console.error('Error loading the JSON file:', error);
    });
};

init();