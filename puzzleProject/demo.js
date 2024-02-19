const layerOneLeft = document.getElementById("layerOneLeft");
const layerOneRight = document.getElementById("layerOneRight");
const layerTwoTop = document.getElementById("layerTwoTop");
const layerTwoBottom = document.getElementById("layerTwoBottom");
let layerOneState = 0;

enableLayerOne();

function enableLayerOne(){
    dragElement(layerOneLeft, layerOneConditionLeft, layerOneResolutionLeft, [(layerOneLeft.offsetLeft - layerOneLeft.offsetWidth), (layerOneLeft.offsetLeft)], true);
    dragElement(layerOneRight, layerOneConditionRight, layerOneResolutionRight, [(layerOneRight.offsetLeft + layerOneRight.offsetWidth), (layerOneRight.offsetLeft)], true);
}

function enableLayerTwo(){
    dragElement(layerTwoTop, layerTwoConditionTop, layerTwoResolutionTop, [(layerTwoTop.offsetTop - layerTwoTop.offsetHeight), (layerTwoTop.offsetTop)], false);
    dragElement(layerTwoBottom, layerTwoConditionBottom, layerTwoResolutionBottom, [(layerTwoBottom.offsetTop + layerTwoBottom.offsetHeight), (layerTwoBottom.offsetTop)], false);
    layerTwoTop.style.zIndex = 2;
    layerTwoBottom.style.zIndex = 2;
}

function dragElement(elmnt, funcCondition, funcResolution, conditionValues, direction) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
    }
  
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        if (direction)
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        else
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        if (funcCondition != undefined && funcCondition(conditionValues)){
            if (funcResolution != undefined) funcResolution(conditionValues);
        }
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
}

function layerOneConditionLeft(conditionValues){
    return (layerOneLeft.offsetLeft <= conditionValues[0] || layerOneLeft.offsetLeft > conditionValues[1]);
}

function layerOneResolutionLeft(conditionValues){
    document.onmouseup = null;
    document.onmousemove = null;

    if (layerOneLeft.offsetLeft > conditionValues[1]){
        layerOneLeft.style.left = conditionValues[1] + "px";
    }

    if (layerOneLeft.offsetLeft <= conditionValues[0]){
        layerOneLeft.onmousedown = null;
        layerOneLeft.style.left = conditionValues[0] + "px";
        layerOneLeft.style.backgroundColor = "rgb(196, 85, 85)";
        updateLayerOne();
    } 
}
function layerOneConditionRight(conditionValues){
    return (layerOneRight.offsetLeft >= conditionValues[0] || layerOneRight.offsetLeft < conditionValues[1]);
}

function layerOneResolutionRight(conditionValues){
    document.onmouseup = null;
    document.onmousemove = null;

    if (layerOneRight.offsetLeft < conditionValues[1]){
        layerOneRight.style.left = conditionValues[1] + "px";
    }

    if (layerOneRight.offsetLeft >= conditionValues[0]){
        layerOneRight.onmousedown = null;
        layerOneRight.style.left = conditionValues[0] + "px";
        layerOneRight.style.backgroundColor = "rgb(196, 85, 85)";
        updateLayerOne();
    } 
}

function updateLayerOne(){
    ++layerOneState;
    if (layerOneState == 2){
        enableLayerTwo();
    }
}

function layerTwoConditionTop(conditionValues){
    return (layerTwoTop.offsetTop <= conditionValues[0] || layerTwoTop.offsetTop > conditionValues[1]);
}

function layerTwoResolutionTop(conditionValues){
    document.onmouseup = null;
    document.onmousemove = null;

    if (layerTwoTop.offsetTop > conditionValues[1]){
        layerTwoTop.style.top = conditionValues[1] + "px";
    }

    if (layerTwoTop.offsetTop <= conditionValues[0]){
        layerTwoTop.onmousedown = null;
        layerTwoTop.style.top = conditionValues[0] + "px";
        layerTwoTop.style.backgroundColor = "rgb(66, 35, 245)";
    } 
}
function layerTwoConditionBottom(conditionValues){
    return (layerTwoBottom.offsetTop >= conditionValues[0] || layerTwoBottom.offsetTop < conditionValues[1]);
}

function layerTwoResolutionBottom(conditionValues){
    document.onmouseup = null;
    document.onmousemove = null;

    if (layerTwoBottom.offsetTop < conditionValues[1]){
        layerTwoBottom.style.top = conditionValues[1] + "px";
    }

    if (layerTwoBottom.offsetTop >= conditionValues[0]){
        layerTwoBottom.onmousedown = null;
        layerTwoBottom.style.top = conditionValues[0] + "px";
        layerTwoBottom.style.backgroundColor = "rgb(66, 35, 245)";
    } 
}