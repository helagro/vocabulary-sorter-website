const inputTextArea = $("#inputTextArea")
const inputEditableDiv = $("#inputEditableDiv")
let showingInput = inputTextArea

$('input[type=radio][name=sortTypeRadio]').change(function() {
    if (this.id == 'separator') {
        console.log("changes")
        inputAreaSelector(inputTextArea, inputEditableDiv)
    }
    else if (this.id == "elementProperty"){
        inputAreaSelector(inputEditableDiv, inputTextArea)
    }
})

function inputAreaSelector(inputToShow, inputToHide){
    $(inputToShow).show()
    inputToHide.hide()

    showingInput = inputToShow
}