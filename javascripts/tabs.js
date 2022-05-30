function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

function flexElement(id) {
    document.getElementById(id).style.display = 'flex';
}



var containerArr = ['hair','gloves','coat','necklace'];

function changeContainer(container) {
    for (let i = 0; i < containerArr.length; i++) {
        hideElement(containerArr[i] + 'OptionsContainer');
    }
    flexElement(container + 'OptionsContainer');
}

changeContainer('hair');