



function calculateOutput(){
    console.log("Started calculation")
    const {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal, outputseparator} = fetchInput()
    const output = routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal)
    printOutputs(output, outputseparator)

}

function fetchInput(){
    const inputArea = showingInput

    const selectedSortTypeRadioButtonId = $('input[name="sortTypeRadio"]:checked').attr("id")
    const selectedSortTypeInputId = selectedSortTypeRadioButtonId + "Input"
    const selectedSortTypeInputVal = $("#" + selectedSortTypeInputId).val()

    const outputseparatorRadioId = $("input[name='outputseparatorRadio']:checked").attr("id")
    const outputseparator = getSeparator(outputseparatorRadioId)

    return {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal, outputseparator}
}

function getSeparator(outputseparatorRadioId,){
    switch(outputseparatorRadioId){
        case "newLineOutputseparator":
            return "\n"
        case "customOutputseparator":
            const outputseparatorValueId = outputseparatorRadioId + "Input"
            const outputseparatorValue = $("#" + outputseparatorValueId).val()
            return outputseparatorValue
    }
}

function routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal){
    var output

    switch(selectedSortTypeRadioButtonId){
        case "separator":
            output = sortByseparator(inputArea, selectedSortTypeInputVal)
            break
        case "elementProperty":
            output = sortByElementProperty(inputArea, selectedSortTypeInputVal)
            break
        default:
            console.log("Err: " + selectedSortTypeRadioButtonId)
    }

    return output
}

function sortByseparator(inputArea, selectedSortTypeInputVal){
    let matching = []
    let noMatch = []

    const text = inputArea.val()
    if(text.length == 0){
        alert('Invalid input, example: "="')
        return
    }

    const lines = text.split("\n")

    for(line of lines){
        const qna = line.split(selectedSortTypeInputVal)
        noMatch.push(qna[0])
        matching.push(qna[1])
    }

    return {matching: matching,
            noMatch: noMatch}
}

function sortByElementProperty(inputArea, selectedSortTypeInputVal){
    const cssRule = selectedSortTypeInputVal.split(":")
    if(cssRule.length != 2){
        alert('Invalid input, example: "font-weight:700"')
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

function printOutputs(output, outputseparator){
    printOutput(output.noMatch, $("#outputArea"), outputseparator)
    printOutput(output.matching, $("#outputArea1"), outputseparator)
}


function printOutput(outpurArr, outputArea, outputseparator){
    outputArea.val("")

    for (word of outpurArr){
        const formattedWord = formatOutputWord(word, outputseparator)
        outputArea.val((index, val) => val + formattedWord )
    }
}

function formatOutputWord(word, outputseparator){
    if(!word)
        return " "

    word = word.replace(/(?<=(^|\s|=))\W/g, "")
    word = word.trim()
    word += outputseparator

    return word
}