// create two arrays, one to put the random values in, one to apply values to abilities
var generatedStats = [];
var consolidatedStats = [];

// create click event for the button "generate stats"
$("#generateStats").on("click", function() {
    // change the attribute of the button and the text contents
    $("#generateStats").text("Clear")
    // set attribute of "new" button
    $("#generateStats").attr("id", "clearAppliedStats");
    // prevent new stats from being generated (NO CHEATING)
    if (generatedStats.length > 0) return;
    if (consolidatedStats.length > 0) return;

    // lets loop 6 times
    for (let i=0; i < 6; i++) {
        // empty array for loop storage
        let tempArray = []
        for (let j = 0; j < 4; j ++) {
            // push 4 numbers to previously empy array
            tempArray.push(Math.floor(Math.random() * 6 + 1))
        }
        // find the smallest number of the array
        var minimum = Math.min.apply(null, tempArray)
        // grab the first occurance of the smallest number 
        var indexMin = tempArray.indexOf(minimum)
        // remove it
        delete tempArray[indexMin]
        // find sum of remaining numbers 
        var statValue = arr => arr.reduce((a,b) => a + b, 0)
        // push them to the generate stats array 
        generatedStats.push(statValue(tempArray)) 
    }
    // loop through array
    for (let i = 0; i <generatedStats.length; i++) {
        // create a button each time
        var statButton = $("<button>");
        // apply attributes
        statButton.attr("class", "col-2 statButton");
        // apply the text
        statButton.text(generatedStats[i]);
        // append the button
        $("#addStatButton").append(statButton);
    }
})

// create a click event for the generated buttons
$("#addStatButton").on("click", ".statButton", function() {
    // clear the field 
    $("#addStatButton").empty();
    $(".col-4").empty()
    // add value of genereated buttons to the end of new array
    consolidatedStats.push(($(this).text()))
    // grab the integer values of selected button
    let integerOfClick = parseInt($(this).text())
    // find the index of selected button
    let indexClick = generatedStats.indexOf(integerOfClick);
    // remove number at that index
    generatedStats.splice(indexClick, 1);
    // loop and re-append remaning buttons
    for (let i = 0; i <generatedStats.length; i++) {
        var statButton = $("<button>");
        statButton.attr("class", "col-2 statButton");
        statButton.text(generatedStats[i]);
        $("#addStatButton").append(statButton);
    }
    // apply consolidated stats array indexes to the stats
    $("#strValue").append(consolidatedStats[0])
    $("#dexValue").append(consolidatedStats[1])
    $("#conValue").append(consolidatedStats[2])
    $("#intValue").append(consolidatedStats[3])
    $("#wisValue").append(consolidatedStats[4])
    $("#chrValue").append(consolidatedStats[5])
    
})
// repace it with a button that adds values back into the generated stats array
// this prevents people from just generating a new set of stats... Sometimes you can't change your attribues.. thats life, and D&D
$("#actionButtonDiv").on("click", "#clearAppliedStats", function() {
    // add the items of consolidated array to generated stats array
    generatedStats = generatedStats.concat(consolidatedStats);
    // remove all items from consolidated stats
    consolidatedStats.splice(0);
    // clear the field
    $("#addStatButton").empty();
    $(".col-4").empty()
    // append the values to the page
    for (let i = 0; i <generatedStats.length; i++) {
        var statButton = $("<button>");
        statButton.attr("class", "col-2 statButton");
        statButton.text(generatedStats[i]);
        $("#addStatButton").append(statButton);
    }
})
// find a way to remove numbers from an array by index, without leaving a "null"