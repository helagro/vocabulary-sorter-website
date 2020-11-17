



function calculateOutput(){
    console.log("Started calculation")
    const {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal} = fetchInput()
    routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal)

}

function fetchInput(){
    const inputArea = $("#inputArea")

    const selectedSortTypeRadioButtonId = $('input[name="sortTypeRadio"]:checked').attr("id")
    const selectedSortTypeInputId = selectedSortTypeRadioButtonId + "Input"
    const selectedSortTypeInputVal = $("#" + selectedSortTypeInputId).val()

    return {inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal}
}

function routeSortTypes(inputArea, selectedSortTypeRadioButtonId, selectedSortTypeInputVal){
    switch(selectedSortTypeRadioButtonId){
        case "separator":
            break
        case "tag":
            sortByTag(inputArea, selectedSortTypeInputVal)
            break
        default:
            console.log("Err: " + selectedSortTypeRadioButtonId)
    }
}

function sortByTag(inputArea, selectedSortTypeInputVal){
    const matchingTags = inputArea.find(selectedSortTypeInputVal)
    console.log(matchingTags)
}