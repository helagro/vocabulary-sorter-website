



function calculateOutput(){
    console.log("Started calculation")
    const {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal} = fetchInput()
    const outputArr = routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal)
    printOutput(outputArr)

}

function fetchInput(){
    const inputArea = $("#inputArea")

    const selectedSortTypeRadioButtonId = $('input[name="sortTypeRadio"]:checked').attr("id")
    const selectedSortTypeInputId = selectedSortTypeRadioButtonId + "Input"
    const selectedSortTypeInputVal = $("#" + selectedSortTypeInputId).val()

    return {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal}
}

function routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal){
    var outputArr

    switch(selectedSortTypeRadioButtonId){
        case "separator":
            break
        case "elementProperty":
            outputArr = sortByElementProperty(inputArea, selectedSortTypeInputVal)
            break
        default:
            console.log("Err: " + selectedSortTypeRadioButtonId)
    }

    return outputArr
}

function sortByElementProperty(inputArea, selectedSortTypeInputVal){
    const sort = selectedSortTypeInputVal.split(":")
    if(sort.length != 2){
        console.log('Invalid input, example: "font-weight:700"')
        return
    }

    let res = []
    const children = inputArea.find("*")
    for (child of children){
        if($(child).css(sort[0]) != sort[1])
            continue 

        const text = $(child).text()

        if(text == " ")
            continue

        res.push(text)
    }
    return res
}

function printOutput(outpurArr){
    const outputArea = $("#outputArea")
    outputArea.val("")

    for (word of outpurArr){
        const formattedWord = word + "\n" //TODO better
        outputArea.val((index, val) => val + formattedWord )
    }
}