function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

function flexElement(id) {
    document.getElementById(id).style.display = 'flex';
}

function updateStyle (id, styleVal) {
    document.getElementById(id).style = styleVal;
}

function addClass(id, value) {
    document.getElementById(id).classList.add(value);
}

function removeClass(id, value) {
    document.getElementById(id).classList.remove(value);
}



var containerArr = ['hair','gloves','coat','necklace'];

function changeContainer(container) {
    currentTab = container;
    for (let i = 0; i < containerArr.length; i++) {
        hideElement(containerArr[i] + 'OptionsContainer');
        removeClass(containerArr[i] + 'Btn','selectedBtn');
        //updateStyle(containerArr[i] + 'Btn','background-color: var(--buttonDefault); border: solid 2px var(--buttonDefaultBorder)');
    }
    flexElement(container + 'OptionsContainer');
    addClass(currentTab + 'Btn','selectedBtn');
    //updateStyle(currentTab + 'Btn','background-color: var(--buttonHover); border: solid 2px var(--buttonDefaultBorder)');
}

changeContainer('hair');
