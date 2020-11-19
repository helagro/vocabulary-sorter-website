



function calculateOutput(){
    console.log("Started calculation")
    const {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal} = fetchInput()
    const output = routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal)
    printOutputs(output)

}

function fetchInput(){
    const inputArea = showingInput

    const selectedSortTypeRadioButtonId = $('input[name="sortTypeRadio"]:checked').attr("id")
    const selectedSortTypeInputId = selectedSortTypeRadioButtonId + "Input"
    const selectedSortTypeInputVal = $("#" + selectedSortTypeInputId).val()

    return {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal}
}

function routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal){
    var output

    switch(selectedSortTypeRadioButtonId){
        case "separator":
            output = sortBySeperator(inputArea, selectedSortTypeInputVal)
            break
        case "elementProperty":
            output = sortByElementProperty(inputArea, selectedSortTypeInputVal)
            break
        default:
            console.log("Err: " + selectedSortTypeRadioButtonId)
    }

    return output
}

function sortBySeperator(inputArea, selectedSortTypeInputVal){
    let matching = []
    let noMatch = []

    const children = inputArea.find("*")
    for (child of children){
        if(child.children.length != 0)
            continue

        const text = $(child).text()
        if(isOnlyWhitespace(text))
            continue

        if(elementIsMatchingCssRule(child, cssRule)){
            matching.push(text)   
        } else{
            noMatch.push(text)
        }
    }
}

function sortByElementProperty(inputArea, selectedSortTypeInputVal){
    const cssRule = selectedSortTypeInputVal.split(":")
    if(cssRule.length != 2){
        console.log('Invalid input, example: "font-weight:700"')
        return
    }
    const trimmedCssRule = [cssRule[0].trim(), cssRule[1].trim()]

    let matching = []
    let noMatch = []

    const children = inputArea.find("*")
    for (child of children){
        if(child.children.length != 0)
            continue

        const text = $(child).text()
        if(isOnlyWhitespace(text))
            continue

        if(elementIsMatchingCssRule(child, trimmedCssRule)){
            matching.push(text)   
        } else{
            noMatch.push(text)
        }
    }
    return {matching: matching,
            noMatch: noMatch}
}

function isOnlyWhitespace(str){
    return str.trim() == ""
}

function elementIsMatchingCssRule(element, cssRule){
    return $(element).css(cssRule[0]) == cssRule[1]
}

function printOutputs(output){
    printOutput(output.noMatch, $("#outputArea"))
    printOutput(output.matching, $("#outputArea1"))
}

function printOutput(outpurArr, outputArea){
    outputArea.val("")

    for (word of outpurArr){
        const formattedWord = formatOutputWord(word)
        outputArea.val((index, val) => val + formattedWord )
    }
}

function formatOutputWord(word){
    word = word.replace(/(?<=(^|\s|=))\W/g, "")
    word += "\n"

    return word
}