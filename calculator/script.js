// Loop to generate number buttons
const buttonEl = document.querySelector('.calculator-buttons');
const numbersArray = [7,8,9,4,5,6,1,2,3];
numbersArray.forEach((number) => {
    const numberBtn = document.createElement('button');
    numberBtn.setAttribute('value', number);
    numberBtn.textContent = number;
    buttonEl.appendChild(numberBtn);
})

const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');


let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value is 0, replace it , if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed, dont add decimal
    if (awaitingNextValue) return;
    // If no decimal , add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// Calculate first and second value depending on the operator
const calculate = {
    '/': (firsNumber, secondNumber) => firsNumber / secondNumber,
    '*': (firsNumber, secondNumber) => firsNumber * secondNumber,
    '+': (firsNumber, secondNumber) => firsNumber + secondNumber,
    '-': (firsNumber, secondNumber) => firsNumber - secondNumber,
    '=': (firsNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operator
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    };
    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for nect value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
    
}

// Add event listeners for number, operator, decimal buttons
inputBtns.forEach((inputBtn) => {
    if ( inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false
    calculatorDisplay.textContent = '0';
}

// Event listener
clearBtn.addEventListener('click', resetAll);