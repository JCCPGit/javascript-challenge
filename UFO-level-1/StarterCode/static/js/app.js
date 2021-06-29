// From data.js
var tableData = data;

// Console log the sighting data from data.js
console.log(tableData);

// get a reference to the table body
var tbody = d3.select("tbody");

// table
tableData.forEach((sight) => {
    var row = tbody.append("tr");
    Object.entries(sight).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});

// Form

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
form.on("submit", runEnter);

// Create the function to run for both events
function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
    
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    
    // Print the value to the console
    console.log(inputValue);

    // Filter data
    if (inputValue === "") {
        var filteredData = tableData;
    } 
    else {
        var filteredData = tableData.filter(sight => sight.datetime === inputValue);
    }

    // Console filtered data
    console.log(filteredData);

    // get a reference to the table body
    var tbody = d3.select("tbody");

    // Clean the existing data to print the new serch
    tbody.html("");
    
    // table
    filteredData.forEach((sight) => {
        var row = tbody.append("tr");
        Object.entries(sight).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });

};
    


