// select all the buttons
const buttons = document.querySelectorAll('button');
// select the <input type="text" class="display" disabled> element
const inputValue = document.querySelector('.inputValue');
// select the <input type="text" class="operation" disabled> element
const operationValue = document.querySelector('.operationValue');

// add eventListener to each button
buttons.forEach(function(button) {
    button.addEventListener('click', handleKeypress);
});

// calculate function
function handleKeypress(event) {
    // current clicked buttons value
    const clickedButtonValue = event.target.value;

    switch (clickedButtonValue) {
        case '=':
            doCalculation();
            break;
        case '+':
            doOperation(clickedButtonValue);
            break;
        case '-':
            doOperation(clickedButtonValue);
            break;
        case '*':
            doOperation(clickedButtonValue);
            break;
        case '/':
            doOperation(clickedButtonValue);
            break;
        case 'A':
            doAllClear();
            break;
        case 'C':
            doClear();
            break;
        case 's':
            changeSign();
            break;
        case '%':
            changePercent();
            break;
        default:
            handleInput(clickedButtonValue);
            break;
    }
}

function doCalculation() {
    // check if the display is not empty then only do the calculation
    if (inputValue.value !== '') {
        if (inputValue.value === '-0') {
            inputValue.value = 0;
        }
        if (inputValue.value.indexOf('%') >= 0) {
            operationValue.value += eval(inputValue.value.slice(0, -1) + '/100');
        } else {
            operationValue.value += inputValue.value;
        }
        // calculate and show the answer to display
        inputValue.value = eval(operationValue.value);
    }
}

function doOperation(operationClickValue) {
    if (inputValue.value !== '') {
        if (inputValue.value === '-0') {
            inputValue.value = 0;
        }
        if (inputValue.value.indexOf('%') >= 0) {
            operationValue.value = eval(inputValue.value.slice(0, -1) + '/100');
        } else {
            operationValue.value = inputValue.value;
        }
        operationValue.value += operationClickValue;
        // clear everything on display
        inputValue.value = '';
    }
}

function doAllClear() {
    doClear();
    operationValue.value = '';
}

function doClear() {
    inputValue.value = '';
}

function changeSign() {
    var needsPercent = false;
    if (inputValue.value.indexOf('%') >= 0) {
        needsPercent = true;
        inputValue.value = inputValue.value.slice(0, -1);
    }
    if (eval(inputValue.value) > 0) {
        inputValue.value = '-' + inputValue.value;
    } else {
        if (inputValue.value === '') {
            inputValue.value = '-0';
        } else {
            inputValue.value = inputValue.value.substring(1);
        }
    }
    if (needsPercent) {
        inputValue.value += '%';
    }
}

function changePercent() {
    if (inputValue.value.indexOf('%') >= 0) {
        inputValue.value = inputValue.value.slice(0, -1);
    } else if (inputValue.value === '') {
        inputValue.value += '0%';
    } else {
        inputValue.value += '%';
    }
}

function handleInput(inputClickValue) {
    if (inputValue.value.indexOf('%') >= 0) {
        if (inputValue.value === '0%') {
            inputValue.value = inputClickValue + '%';
        } else {
            inputValue.value = inputValue.value.slice(0, -1) + inputClickValue + '%';
        }
    } else if (inputValue.value === '-0') {
        inputValue.value = '-' + inputClickValue;
    } else if (inputValue.value === '0') {
        inputValue.value = inputClickValue;
    } else {
        // otherwise concatenate it to the display
        inputValue.value += inputClickValue;
    }
}