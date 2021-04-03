// select all the buttons
const buttons = document.querySelectorAll('button');
// select the <input type="text" class="display" disabled> element
const inputValue = document.querySelector('.inputValue');
// select the <input type="text" class="operation" disabled> element
const operationValue = document.querySelector('.operationValue');

// add eventListener to each button
buttons.forEach(function(button) {
    button.addEventListener('click', calculate);
});

// calculate function
function calculate(event) {
    // current clicked buttons value
    const clickedButtonValue = event.target.value;

    if (clickedButtonValue === '=') {
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
    } else if ((clickedButtonValue === '+') ||
        (clickedButtonValue === '-') ||
        (clickedButtonValue === '*') ||
        (clickedButtonValue === '/')) {
        if (inputValue.value === '') {
            return;
        }
        if (inputValue.value === '-0') {
            inputValue.value = 0;
        }
        if (inputValue.value.indexOf('%') >= 0) {
            operationValue.value = eval(inputValue.value.slice(0, -1) + '/100');
        } else {
            operationValue.value = inputValue.value;
        }
        operationValue.value += clickedButtonValue;
        // clear everything on display
        inputValue.value = '';
    } else if (clickedButtonValue === 'A') {
        // clear everything on display
        inputValue.value = '';
        operationValue.value = '';
    } else if (clickedButtonValue === 'C') {
        // clear everything on display
        inputValue.value = '';
    } else if (clickedButtonValue === 'd') {
        if (eval(inputValue.value) > 0) {
            inputValue.value = '-' + inputValue.value;
        } else {
            if (inputValue.value === '') {
                inputValue.value = '-0';
            } else {
                inputValue.value = inputValue.value.substring(1);
            }
        }
    } else if (clickedButtonValue === '%') {
        if (inputValue.value.indexOf('%') >= 0) {
            inputValue.value = inputValue.value.slice(0, -1);
        } else if (inputValue.value === '') {
            inputValue.value += '0%';
        } else {
            inputValue.value += clickedButtonValue;
        }
    } else {
        if (inputValue.value.indexOf('%') >= 0) {
            if (inputValue.value === '0%') {
                inputValue.value = clickedButtonValue + '%';
            } else {
                inputValue.value = inputValue.value.slice(0, -1) + clickedButtonValue + '%';
            }
        } else if (inputValue.value === '-0') {
            inputValue.value = '-' + clickedButtonValue;
        } else if (inputValue.value === '0') {
            inputValue.value = clickedButtonValue;
        } else {
            // otherwise concatenate it to the display
            inputValue.value += clickedButtonValue;
        }
    }
}