let hotelData1;

const jsonFilePath1 = 'data/hotel_final.json';

// Define the price range labels
const priceRangeText = [
    "$1-300",
    "$301-600",
    "$601-900",
    "$901-1200",
    "$1201-1500",
    ">$1500"
];

d3.json(jsonFilePath1).then(function(data) {
    hotelData1 = data;

    // Call updateBar here, after the data has been loaded
    updateBubble(0);
}).catch(function(error) {
    console.error('Error loading the JSON file:', error);
});

function updateBubble(selectedCity) {
    // Filter data for the selected city
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
    let bubbleData = [];
    let priceRanges = [0, 300, 600, 900, 1200, 1500, Number.POSITIVE_INFINITY];
    let bubbleColors = ["rgb(0, 0, 255)", "rgb(0, 128, 0)", "rgb(255, 165, 0)", "rgb(255, 0, 0)", "rgb(128, 0, 128)", "rgb(0, 0, 0)"];

    for (let i = 0; i < priceRanges.length - 1; i++) {
        let count = 0;
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
    Plotly.newPlot("priceRangeBubble", bubbleData, bubbleLayout);

    function optionChanged(newValue) {
        // Call updateBubble when the dropdown value changes
        updateBubble(newValue);
    }
    
    // Call the init function 
    init()

}

