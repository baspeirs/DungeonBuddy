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

function diceRoll(num) {
    $("#rollValue").empty();
    let roll = Math.floor(Math.random() * num + 1);
    $("#rollValue").text(roll);
    console.log(roll)
}

$("#img-dice-4").on("click", () => {
    console.log("I am being clicked! 4")
    diceRoll(4)
});

$("#img-dice-6").on("click", () => {
    console.log("I am being clicked! 6")
    diceRoll(6)
});

$("#img-dice-8").on("click", () => {
    console.log("I am being clicked! 8")
    diceRoll(8)
});

$("#img-dice-10").on("click", () => {
    console.log("I am being clicked! 10")
    diceRoll(10)
});

$("#img-dice-12").on("click", () => {
    console.log("I am being clicked! 12")
    diceRoll(12)
});

$("#img-dice-20").on("click", () => {
    console.log("I am being clicked! 20")
    diceRoll(20)
});

$("#img-dice-percent").on("click", () => {
    console.log("I am being clicked! percent")
    diceRoll(100)
});