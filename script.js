



function calculateOutput(){
    console.log("Started calculation")
    const {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal, outputSeperator} = fetchInput()
    const output = routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal)
    printOutputs(output, outputSeperator)

}

function fetchInput(){
    const inputArea = showingInput

    const selectedSortTypeRadioButtonId = $('input[name="sortTypeRadio"]:checked').attr("id")
    const selectedSortTypeInputId = selectedSortTypeRadioButtonId + "Input"
    const selectedSortTypeInputVal = $("#" + selectedSortTypeInputId).val()

    const outputSeperatorRadioId = $("input[name='outputSeperatorRadio']:checked").attr("id")
    const outputSeperator = getSeparator(outputSeperatorRadioId)

    return {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal, outputSeperator}
}

function getSeparator(outputSeperatorRadioId,){
    switch(outputSeperatorRadioId){
        case "newLineOutputSeperator":
            return "\n"
        case "customOutputSeperator":
            const outputSeperatorValueId = outputSeperatorRadioId + "Input"
            const outputSeperatorValue = $("#" + outputSeperatorValueId).val()
            return outputSeperatorValue
    }
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

function printOutputs(output, outputSeperator){
    printOutput(output.noMatch, $("#outputArea"), outputSeperator)
    printOutput(output.matching, $("#outputArea1"), outputSeperator)
}


function printOutput(outpurArr, outputArea, outputSeperator){
    outputArea.val("")

    for (word of outpurArr){
        const formattedWord = formatOutputWord(word, outputSeperator)
        outputArea.val((index, val) => val + formattedWord )
    }
}

function formatOutputWord(word, outputSeperator){
    word = word.replace(/(?<=(^|\s|=))\W/g, "")
    word = word.trim()
    word += outputSeperator

    return word
}