// ids
    // diceValue
    // rollButton
    // rollValue
// sudo

// make an event listener for the button
$("#rollButton").on("click", function() {
    $("#rollValue").empty()
    var valueDiv = $("<div>")
    valueDiv.attr("id", "rollValueDiv")
    // set variable for the integer value selected
    var selectedValue = $("#diceValue").val();
    console.log(selectedValue)
    if (selectedValue === "") alert("Please select a value")
    else if (selectedValue === "100") {
        parseInt(selectedValue);
        var newRoll = Math.floor(Math.random() * selectedValue + 1);
        valueDiv.append(newRoll).append("%");
    }
    else {
        parseInt(selectedValue);
        var newRoll = (Math.floor(Math.random() * selectedValue + 1));
        valueDiv.append(newRoll);
    }
    $("#rollValue").append(valueDiv)
})

