



function calculateOutput(){
    console.log("Started calculation")
    const {inputHTML, selectedSortTypeRadioButtonId, selectedSortTypeInputVal} = fetchInput()
}

function fetchInput(){
    const inputHTML = $("#inputArea").html()

    const selectedSortTypeRadioButtonId = $('input[name="sortTypeRadio"]:checked').attr("id")
    const selectedSortTypeInputId = selectedSortTypeRadioButtonId + "Input"
    const selectedSortTypeInputVal = $("#" + selectedSortTypeInputId).val()

    return {inputHTML, selectedSortTypeRadioButtonId, selectedSortTypeInputVal}
}