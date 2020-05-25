// character generator 

const raceArray = ["Dwarf", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"];
const classArray = ["Barbarian", "Bard", "Cleric", "Druid", "Figher", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
const backgroundArray = ["Acolyte", "Charlatan", "Criminal", "Entertainer", "Folk Hero", "Guild Artisan", "Hermit", "Noble", "Outlander", "Sage", "Sailor", "Soldier", "Urchin"];
const genderArray = ["Male", "Female"]
const alignmentObj = {
    lawfull: ["Lawfull", "Neutral", "Chaotic"],
    moral: ["Good", "Neutral", "Evil"]
}

function raceSelecter() {
    let x = Math.floor(Math.random() * raceArray.length)
    let race = raceArray[x]
    let raceElement = $("<p>").append(race)
    raceElement.attr("id", "race-name")
    $("#charDetails").append(raceElement)
}

function classSelecter() {
    let x = Math.floor(Math.random() * classArray.length)
    let charClass = classArray[x]
    let classElement = $("<p>").append("Class: " + charClass)
    $("#charDetails").append(classElement)
}
function backgroundSelecter() {
    let x = Math.floor(Math.random() * backgroundArray.length)
    let background = backgroundArray[x]
    let backgroundElement = $("<p>").append("Background: " + background)
    $("#charDetails").append(backgroundElement)
}
function genderSelecter() {
    let x = Math.floor(Math.random() * genderArray.length)
    let gender = genderArray[x]
    let genderElement = $("<p>").append("Gender: " + gender)
    $("#charDetails").append(genderElement)
}
function alignmentSelector() {
    let x = Math.floor(Math.random() * alignmentObj.lawfull.length)
    let y = Math.floor(Math.random() * alignmentObj.moral.length)
    let lawfull = alignmentObj.lawfull[x]
    let moral = alignmentObj.moral[y]
    let alignmentElement = $("<p>").append("Alignment: " + lawfull + "-" + moral)
    $("#charDetails").append(alignmentElement)
}

$("#randomize").on("click", () => {
    $("#charDetails").empty();
    raceSelecter();
    genderSelecter();
    classSelecter();
    backgroundSelecter();
    alignmentSelector();
    $("#hide-box").attr("id", "show-box")
})