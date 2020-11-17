



function calculateOutput(){
    console.log("Started calculation")
    fetchInput()
}

function fetchInput(){
    const inputHTML = $("#inputArea").html()

    const selectedSortTypeRadioButtonId = $('input[name="sortTypeRadio"]:checked').attr("id")
    const selectedSortTypeInputId = selectedSortTypeRadioButtonId + "Input"
    const selectedSortTypeInputVal = $("#" + selectedSortTypeInputId).val()

    console.log(selectedSortTypeInputVal)
}