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
var dateInput = d3.select("#datetime");
var filterButton = d3.select("#filter-btn");
var allButton = d3.select("#all-btn");
var clearButton = d3.select("#clear-btn");

var countryDropdown = d3.select("#country-dropdown");
var stateDropdown = d3.select("#state-dropdown");
var cityDropdown = d3.select("#city-dropdown");
var shapeDropdown = d3.select("#shape-dropdown");

// ___FILTERS___

// Country filter
var countries = tableData.map(sight => sight.country);
var uniqueCountries = countries.filter(uniqueFilter).sort();
uniqueCountries.forEach(countryAbb => {
    countryDropdown.append("li").append("a").attr("id", "country-dropdown-item").text(countryAbb);
});
console.log(uniqueCountries);

// State filter
var states = tableData.map(sight => sight.state);
var uniqueStates = states.filter(uniqueFilter).sort();
uniqueStates.forEach(stateName => {
    stateDropdown.append("li").append("a").attr("id", "state-dropdown-item").text(stateName);
});
console.log(uniqueStates);

// City filter
var cities = tableData.map(sight => sight.city);
var uniqueCities = cities.filter(uniqueFilter).sort();
uniqueCities.forEach(cityName => {
    cityDropdown.append("li").append("a").attr("id", "city-dropdown-item").text(cityName);
});
console.log(uniqueCities);

// Shape filter
var shapes = tableData.map(sight => sight.shape);
var uniqueShapes = shapes.filter(uniqueFilter).sort();
uniqueShapes.forEach(shapeName => {
    shapeDropdown.append("li").append("a").attr("id", "country-dropdown-item").text(shapeName);
});
console.log(uniqueShapes);

// ___FUNCTIONS___

// Select the button
var button = d3.select("#filter-btn");
var cityDropdownItem = d3.selectAll("#city-dropdown-item");
var stateDropdownItem = d3.selectAll("#state-dropdown-item");
var countryDropdownItem = d3.selectAll("#country-dropdown-item");
var shapeDropdownItem = d3.selectAll("#shape-dropdown-item");

// Select the form
var form = d3.select("#form");


// Function runFilter()
function runfilter() {
    d3.event.preventDefault();

    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");

    var cityInput = d3.select("#city-button").text();
    var stateInput = d3.select("#state-button").text();
    var countryInput = d3.select("#country-button").text();
    var shapeInput = d3.select("#shape-button").text();

    var filterItems = {"datetime":inputValue, "city":cityInput, "state":stateInput, "country":countryInput, "shape":shapeInput};
    var filteredResults = tableData;
    Object.entries(filterItems).forEach(([key, value]) => {
        if (value !== 0 && value !== "" && value !== "City" && value !== "State" && value !== "Country" && value !== "Shape") {
            filteredResults = filteredResults.filter(sight => sight[key] === value);
        }
    })
    if (filteredResults === tableData) {
        clearFilters();
        filterButton.attr("class", "btn btn-warning");
        var sightTbody = d3.select("#sight-tbody");
        sightTbody.html("");
        ufoTbody.append("h3").text(`You have not selected any filter`);
        allButton.attr("class", "btn btn-default");
    } else if (filteredResults.length !== 0) {
        filterButton.attr("class", "btn btn-success");
        dataPrinter(filteredResults);
        allButton.attr("class", "btn btn-default");
    } else {
        runError();
    }
};

// Function printTableHeaders()
function printTableHeaders() {
    d3.select('#thead').html("");
    var thead = d3.select("#thead").append("tr");
    thead.append("th").text("Date").attr("class", "table-head");
    thead.append("th").text("City").attr("class", "table-head");
    thead.append("th").text("State").attr("class", "table-head");
    thead.append("th").text("Country").attr("class", "table-head");
    thead.append("th").text("Shape").attr("class", "table-head");
    thead.append("th").text("Duration").attr("class", "table-head");
    thead.append("th").text("Comments").attr("class", "table-head");
};

// Function runError()
function runError() {
    d3.select('#thead').html("");
    filterButton.attr("class", "btn btn-danger");
    var sightTbody = d3.select("#sight-tbody");
    sightTbody.html("");
    sight.Tbody.append("h3").text(`No data for the selected filters`);
};

// Function runClear()
function runclear() {
    var sightTbody = d3.select("#sight-tbody");
    sightTbody.html("");
    clearFilters();
};

// Function runCities()
function runCities() {
    var inputSelected = d3.select(this);
    var selectedCity = inputSelected.text();
    d3.select("#city-button").text(selectedCity).style("text-transform", "capitalize").attr("class", "btn btn-info");
    allButton.attr("class", "btn btn-default");
};

// Function runStates()
function runStates() {
    var inputSelected = d3.select(this);
    var selectedState = inputSelected.text();
    d3.select("#state-button").text(selectedState).style("text-transform", "capitalize").attr("class", "btn btn-info");
    allButton.attr("class", "btn btn-default");
};

// Function runCountries()
function runCountries() {
    var inputSelected = d3.select(this);
    var selectedCountry = inputSelected.text();
    d3.select("#country-button").text(selectedCountry).style("text-transform", "capitalize").attr("class", "btn btn-info");
    allButton.attr("class", "btn btn-default");
};

// Function uniqueFilter()
function uniqueFilter(value, index, self) {
    return self.indexOf(value) === index;
};

// Function clearFilters()
function clearFilters() {
    d3.select("#city-button").text("City").attr("class", "btn btn-default");
    d3.select("#state-button").text("State").attr("class", "btn btn-default");
    d3.select("#country-button").text("Country").attr("class", "btn btn-default");
    d3.select("#shape-button").text("Shape").attr("class", "btn btn-default");
    allButton.attr("class", "btn btn-default");
    filterButton.attr("class", "btn btn-default");
    clearButton.attr("class", "btn bnt-default");
    d3.select("#datetime").property("value", "");
    d3.select("#thead").html("");
};

// Function dataPrinter()
function dataPrinter(list) {
    printTableHeaders();
    var sightTbody = d3.select("#sight-tbody");
    sightTbody.html("");
    list.forEach(sight => {
        var row = sightTbody.append("tr");
        row.append("td").text(sight.datetime);
        row.append("td").text(sight.country.toUpperCase());
        row.append("td").text(sight.state.toUpperCase());
        row.append("td").text(firstCap(sight.city));
        row.append("td").text(firstCap(sight.shape));
        row.append("td").text(sight.durationMinutes);
        row.append("td").text(sight.comments);
    })
};

// Function firstCap()
function firstCap(text) {
    textSplit = text.split(" ");
    for(var i=0; i<textSplit.length; i++) {
        textSplit[i] = textSplit[i].charAt(0).toUpperCase() + textSplit[i].slice(1);
    }
    return textSplit.join(" ");
};

clearFilters();






























// // Create event handlers for clicking the button or pressing the enter key
// button.on("click", runEnter);
// form.on("submit", runEnter);

// // Create the function to run for both events
// function runEnter() {
//     // Prevent the page from refreshing
//     d3.event.preventDefault();
    
//     // Select the input element and get the raw HTML node
    
    
//     // Get the value property of the input element
    
    
//     // Print the value to the console
//     console.log(inputValue);

//     // Filter data
//     if (inputValue === "") {
//         var filteredData = tableData;
//     } 
//     else {
//         var filteredData = tableData.filter(sight => sight.datetime === inputValue);
//     }

//     // Console filtered data
//     console.log(filteredData);

//     // get a reference to the table body
//     var tbody = d3.select("tbody");

//     // Clean the existing data to print the new serch
//     tbody.html("");
    
//     // table
//     filteredData.forEach((sight) => {
//         var row = tbody.append("tr");
//         Object.entries(sight).forEach(([key, value]) => {
//             var cell = row.append("td");
//             cell.text(value);
//         });
//     });

// };

// // ___FUNCTIONS___

// // Unique filter function
// function uniqueFilter(value, index, self) {
//     return self.indexOf(value) === index;
// };


