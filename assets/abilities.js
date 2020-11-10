// create two arrays, one to put the random values in, one to apply values to abilities
let generatedStats = [];
let consolidatedStats = [];
const attributes = {
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: ""
}

// ===== Get the modal =====
const modal = document.getElementById("apply-stat-modal");
// Get the button that opens the modal
var btn = document.getElementById("addStatButton");
// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
$(".modal-header").on("click", ".close", function () {
    modal.style.display = "none";
});
$(".modal-body").on("click", ".add-stat-btn", () => {
    modal.style.display = "none";
});
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// ===== function to take the values out of the attributes object and apply them on the page
const generateAbilities = () => {
    $("#abilities").empty();
    console.log("generateing abilities")
    // create 3 container divs
    let containerDiv = $("<div>").attr("class", "row"); // for str and dex
    // create 6 divs, 1 for each ability, each with a col-5 class
    for (const property in attributes) {
        let attributeDiv = $("<div>").attr("class", "col-xl-12");
        let subDiv = $("<div>").attr("class", "row");
        let attribute = $("<h3>").attr("class", "col-8 abilitiesCol").text(property);
        let attrValue = $("<h3>").attr("class", "col-4 abilitiesCol").text(attributes[property]);
        attrValue.attr("id", property + "Val");
        // append the attribute and the value to the subDiv 
        subDiv.append(attribute);
        subDiv.append(attrValue);
        // append the subdiv to the attribute div
        attributeDiv.append(subDiv);
        // append the attribute div to the container div
        containerDiv.append(attributeDiv);
    };
    // append the container div (now visible on page)
    $("#abilities").append(containerDiv);
};

// ===== function to take an array and generate stats and add buttons on the page for each element =====
const generateStatButtons = (array) => {
    console.log("generateing stat buttons")
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
};

// ===== create click event for the button "generate stats" =====
$("#generateStats").on("click", function () {
    console.log("generating stats button clicked")
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

// ===== function to re-work and consolidate the stats 
const consolidateStats = (value) => {
    console.log("consolidating Stats")
    // create a temperary array
    let equalArray = [];
    let tempGeneratedArray = [];
    let tempConsolidatedArray = [];
    // loop through generated stats to find the first occurance of value
    for (let i = 0; i < generatedStats.length; i++) {
        // any values that are not equal to the selected stat are pushed to one array
        if (value != generatedStats[i]) tempGeneratedArray.push(generatedStats[i])
        else if (value == generatedStats[i]) equalArray.push(generatedStats[i])
    };
    console.log("results from first loop")
    console.log("equal array")
    console.log(equalArray)
    console.log("temp generated array")
    console.log(tempGeneratedArray)
    console.log("temp consolidated array")
    console.log(tempConsolidatedArray)
    // loop through the equal array and put one of the elements in consolidated array and the rest in generated array
    // ======= this is causing an infinite loop ====
    for (let j = 0; j < equalArray.length; j++) {
        console.log(j)
        if (j === 0) tempConsolidatedArray.push(equalArray[j])
        else tempGeneratedArray.push(equalArray[j])
        
    };
    console.log("results from second loop")
    console.log("equal array")
    console.log(equalArray)
    console.log("temp generated array")
    console.log(tempGeneratedArray)
    console.log("temp consolidated array")
    console.log(tempConsolidatedArray)

    generatedStats = tempGeneratedArray;
    consolidatedStats.push(tempConsolidatedArray[0]);
}

$("#addStatButton").on("click", ".statButton", function () {
    console.log("clicked addStatButton")
    console.log(generatedStats);
    console.log(consolidatedStats);
    // empty the whole div of stats
    $("#addStatButton").empty();
    // empty the abilities div 
    $("#abilities").empty();
    // set variable for the stat clicked on 
    let stat = ($(this).text());
    // pull up the modal
    modal.style.display = "block";
    // show the stat on the page
    $("#stat-value").text(stat);

    $("#strength").on("click", () => {
        if ($("#strengthVal").text() === "") {
            attributes.strength = stat;
            consolidateStats(stat);
            generateStatButtons(generatedStats);
            generateAbilities();
        }
        else {
            $("#addStatButton").empty();
            generatedStats.push($("#strengthVal").text());
            attributes.strength = stat;
            consolidateStats(stat);
            generateStatButtons(generatedStats);
            generateAbilities();
        }

    });
    $("#dexterity").on("click", () => {
        if ($("#dexterityVal").text() === "") {
            attributes.dexterity = stat;
            consolidateStats(stat);
            generateStatButtons(generatedStats);
            generateAbilities();
        }
        else {
            $("#addStatButton").empty();
            generatedStats.push($("#dexterityVal").text());
            attributes.dexterity = stat;
            consolidateStats(stat);
            generateStatButtons(generatedStats);
            generateAbilities();
        }
    });
    $("#constitution").on("click", () => {
        if ($("#constitutionVal").text() === "") {
            attributes.constitution = stat;
            consolidateStats(stat);
            generateStatButtons(generatedStats);
            generateAbilities();
        }
        else {
            $("#addStatButton").empty();
            generatedStats.push($("#constitutionVal").text());
            attributes.constitution = stat;
            consolidateStats(stat);
            generateStatButtons(generatedStats);
            generateAbilities();
        }
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
    // add the items of consolidated array to generated stats array
    generatedStats = generatedStats.concat(consolidatedStats);
    // remove all items from consolidated stats
    consolidatedStats.splice(0);
    // clear the field
    $("#addStatButton").empty();
    $(".col-4").empty()
    attributes.strength = "";
    attributes.dexterity = "";
    attributes.constitution = "";
    attributes.intelligence = "";
    attributes.wisdom = "";
    attributes.charisma = "";

    // append the values to the page
    generateStatButtons(generatedStats);
    generateAbilities();
});

generateAbilities();
