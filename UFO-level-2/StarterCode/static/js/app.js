// ___DATA___

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

// ___VARIABLES FOR FILTERS___
var countryDropdown = d3.select("#city-dropdown");
var stateDropdown = d3.select("#state-dropdown");
var cityDropdown = d3.select("#country-dropdown");
var shapeDropdown = d3.select("#shape-dropdown");

// ___FILTERS___

// City filter
var cities = tableData.map(sight => sight.city);
var uniqueCities = cities.filter(uniqueFilter).sort();
uniqueCities.forEach(cityName => {
    cityDropdown.append("li").append("a").attr("id", "city-dropdown-item").text(cityName);
});
console.log(uniqueCities);

// State filter
var states = tableData.map(sight => sight.state);
var uniqueStates = states.filter(uniqueFilter).sort();
uniqueStates.forEach(stateName => {
    stateDropdown.append("li").append("a").attr("id", "state-dropdown-item").text(stateName);
});
console.log(uniqueStates);

// Country filter
var countries = tableData.map(sight => sight.country);
var uniqueCountries = countries.filter(uniqueFilter).sort();
uniqueCountries.forEach(countryAbb => {
    countryDropdown.append("li").append("a").attr("id", "country-dropdown-item").text(countryAbb);
});
console.log(uniqueCountries);

// Shape filter
var shapes = tableData.map(sight => sight.shape);
var uniqueShapes = shapes.filter(uniqueFilter).sort();
uniqueShapes.forEach(shapeName => {
    shapeDropdown.append("li").append("a").attr("id", "country-dropdown-item").text(shapeName);
});
console.log(uniqueShapes);

// ___FORM___

// Select the button
var button = d3.select("#filter-btn");
var cityDropdownItem = d3.selectAll("#city-dropdown-item");
var stateDropdownItem = d3.selectAll("#state-dropdown-item");
var countryDropdownItem = d3.selectAll("#country-dropdown-item");
var shapeDropdownItem = d3.selectAll("#shape-dropdown-item");

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

// ___FUNCTIONS___

// Unique filter function
function uniqueFilter(value, index, self) {
    return self.indexOf(value) === index;
};


