



function calculateOutput(){
    console.log("Started calculation")
    const {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal} = fetchInput()
    const output = routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal)
    printOutputs(output)

}

function fetchInput(){
    const inputArea = $("#inputArea")

    const selectedSortTypeRadioButtonId = $('input[name="sortTypeRadio"]:checked').attr("id")
    const selectedSortTypeInputId = selectedSortTypeRadioButtonId + "Input"
    const selectedSortTypeInputVal = $("#" + selectedSortTypeInputId).val()

    return {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal}
}

function routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal){
    var output

    switch(selectedSortTypeRadioButtonId){
        case "separator":
            break
        case "elementProperty":
            output = sortByElementProperty(inputArea, selectedSortTypeInputVal)
            console.log(output)
            break
        default:
            console.log("Err: " + selectedSortTypeRadioButtonId)
    }

    return output
}

function sortBySeperator(){

}

function sortByElementProperty(inputArea, selectedSortTypeInputVal){
    const sort = selectedSortTypeInputVal.split(":")
    if(sort.length != 2){
        console.log('Invalid input, example: "font-weight:700"')
        return
    }

    let matching = []
    let noMatch = []
    const children = inputArea.find("*")
    for (child of children){
        const text = $(child).text()

        if(text == " ")
            continue

        if($(child).css(sort[0]) == sort[1]){
            matching.push(text)   
        } else{
            noMatch.push(text)
        }

        
    }
    return {matching: matching,
            noMatch: noMatch}
}

function printOutputs(output){
    printOutput(output.noMatch, $("#outputArea"))
    printOutput(output.matching, $("#outputArea1"))
}

function printOutput(outpurArr, outputArea){
    outputArea.val("")

    for (word of outpurArr){
        const formattedWord = word + "\n" //TODO better
        outputArea.val((index, val) => val + formattedWord )
    }
}