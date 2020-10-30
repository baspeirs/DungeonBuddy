// create two arrays, one to put the random values in, one to apply values to abilities
var generatedStats = [];
var consolidatedStats = [];
const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]

// create click event for the button "generate stats"
$("#generateStats").on("click", function () {
    // change the attribute of the button and the text contents
    $("#generateStats").text("Clear")
    // set attribute of "new" button
    $("#generateStats").attr("id", "clearAppliedStats");
    // prevent new stats from being generated (NO CHEATING)
    if (generatedStats.length > 0) return;
    if (consolidatedStats.length > 0) return;

    // lets loop 6 times
    for (let i = 0; i < 6; i++) {
        // empty array for loop storage
        let tempArray = []
        for (let j = 0; j < 4; j++) {
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
        var statValue = arr => arr.reduce((a, b) => a + b, 0)
        // push them to the generate stats array 
        generatedStats.push(statValue(tempArray))
    }
    // generate stat buttons
    generateStatButtons(generatedStats);
});

const generateStatButtons = (array) => {
    for (let i = 0; i < array.length; i++) {
        // create a div each time
        let statDiv = $("<div>")
        // apply attributes
        statDiv.attr("class", "col-2")
        // create a button each time
        var statButton = $("<button>");
        // apply attributes
        statButton.attr("class", "statButton");
        // apply the text
        statButton.text(array[i]);
        // append the button to the div
        statDiv.append(statButton)
        // append the div to the page
        $("#addStatButton").append(statDiv);
    }
}

// Get the modal
const modal = document.getElementById("apply-stat-modal");

// Get the button that opens the modal
var btn = document.getElementById("addStatButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const reWorkStatArrays = (array, stat) => {
    let tempStatArray = [];

    for (let i = 0; i < array.length; i++) {
        console.log("generated stats array: ")
        console.log(array)
        if (array[i] != stat) {
            tempStatArray.push(array[i]);
            console.log("temp stats first condition")
            console.log(tempStatArray)
        } 
        else if (array[i] == stat) {
            consolidatedStats.push(stat);
            for (let j = i + 1; j < array.length; j++) {
                console.log("temp stats second condition")
                console.log(tempStatArray)
                console.log("j: " + j)
                console.log("array lenth: " + array.length)
                tempStatArray.push(array[j]);
            };
            return generateStatButtons(tempStatArray);
        }
    };
}

$("#addStatButton").on("click", ".statButton", function () {
    $("#addStatButton").empty();
    let stat = ($(this).text());
    modal.style.display = "block";
    $("#stat-value").text(stat);

    reWorkStatArrays(generatedStats, stat);


    $("#strength").on("click", () => {
        console.log("strength")
        $("#strValue").text(stat);
    });
    $("#dexterity").on("click", () => {
        console.log("dexterity")
        $("#dexValue").text(stat);
    });
    $("#constitution").on("click", () => {
        console.log("constitution")
        $("#conValue").text(stat);
    });
    $("#intelligence").on("click", () => {
        console.log("intelligence")
        $("#intValue").text(stat);
    });
    $("#wisdom").on("click", () => {
        console.log("wisdom")
        $("#wisValue").text(stat);
    });
    $("#charisma").on("click", () => {
        console.log("charisma")
        $("#chrValue").text(stat);
    });
});

// repace it with a button that adds values back into the generated stats array
// this prevents people from just generating a new set of stats... Sometimes you can't change your attribues.. thats life, and D&D
$("#actionButtonDiv").on("click", "#clearAppliedStats", function () {
    console.log("generating stats: ")
    console.log(generatedStats)
    console.log(consolidatedStats)
    // add the items of consolidated array to generated stats array
    generatedStats = generatedStats.concat(consolidatedStats);
    // remove all items from consolidated stats
    consolidatedStats.splice(0);
    // clear the field
    $("#addStatButton").empty();
    $(".col-4").empty()
    // append the values to the page
    for (let i = 0; i < generatedStats.length; i++) {
        let statDiv = $("<div>");
        statDiv.attr("class", "col-2")
        let statButton = $("<button>");
        statButton.attr("class", "statButton")
        statButton.text(generatedStats[i]);
        statDiv.append(statButton);
        $("#addStatButton").append(statDiv);
    }
});