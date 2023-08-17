// calculator should not evaluate more than a single pair of numbers at a time.
// should evaluate the first pair of numbers, display the result of that calculation and
// use that result as the first number in the new calculation, along with the next operator.

class Calculator {
  constructor(previousOperandTextInput, currentOperandTextInput) {
    this.previousOperandTextInput = previousOperandTextInput;
    this.currentOperandTextInput = currentOperandTextInput;
    this.clear()
  }

  // wipe out existing data
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operator = undefined
  }

  // remove last digit
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  // select max one operator at a time
  chooseOperator(operator) {
    if (this.currentOperand === '') return
    // use previous result as the first number in new calculation
    if (this.previousOperand !== '') {
      this.calculate()
    }
    this.operator = operator
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  // execute on equals
  calculate() {
    let calculation;
    let previous = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operator){
      case '+':
        calculation = previous + current
        break
      case '-':
        calculation = previous - current
        break
      // show error message if dividing by 0
      case '/':
      case '÷':
        if (current !== 0) {
          calculation = previous / current
         } else {
          alert("cannot divide by 0")
          calculation = ''
         }
        break
      case 'x':
      case '*':
        calculation = previous * current
        break
      default:
        return
    }
    this.currentOperand = calculation
    this.operator = undefined
    this.previousOperand = ''
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  prependPlusMinus(symbol) {
    if (symbol === '+/-' && this.currentOperand === '') return
    this.currentOperand = parseFloat(this.currentOperand) * -1
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString()
    // select numbers before decimal
    const beforeDecimalDigits = parseFloat(stringNumber.split('.')[0])
    // select numbers after decimal
    const afterDecimalDigits = stringNumber.split('.')[1]
    // format whole integer to be displayed
    // if no digits before decimal then nothing to display, else display with commas
    let displayInteger
    if (isNaN(beforeDecimalDigits)) {
      displayInteger = ''
    } else {
      displayInteger = beforeDecimalDigits.toLocaleString('en', { maximumFractionDigits: 0})
    }
    // if numbers present after decimal, concatenate before and after numbers with '.'
    if (afterDecimalDigits != null) {
      return `${displayInteger}.${afterDecimalDigits}`
    } else {
      return displayInteger
    }
  }

  processOutput(output) {
    // display any error messages
    if (/^[a-zA-Z]/.test(output)) {
      return output
    } else {
      return this.formatDisplayNumber(output)
    }
  }

  updateDisplay() {
    this.currentOperandTextInput.innerText = this.processOutput(this.currentOperand)
    // show equation in upper row on selecting operator
    if (this.operator != null) {
      this.previousOperandTextInput.innerText =
      `${this.formatDisplayNumber(this.previousOperand)} ${this.operator}`
    } else {
      this.previousOperandTextInput.innerText = ''
    }
  }
}

const previousOperandTextInput = document.querySelector('[data-previous-operand]');
const currentOperandTextInput = document.querySelector('[data-current-operand]');
const numberButtons = document.querySelectorAll('[data-number');
const operatorButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const plusMinusButton = document.querySelector('[data-plus-minus]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-clear-all');

const calculator = new Calculator(previousOperandTextInput, currentOperandTextInput);

numberButtons.forEach(button => {
  button.addEventListener ('click', () => {
  calculator.appendNumber(button.innerText);
  calculator.updateDisplay();
  });
});

operatorButtons.forEach(operator => {
  operator.addEventListener ('click', () => {
    calculator.chooseOperator(operator.innerText);
    calculator.updateDisplay();
  })
});

plusMinusButton.addEventListener('click', (e) => {
  calculator.prependPlusMinus(e.target.innerText);
  calculator.updateDisplay();
  console.log(e.target.innerText);
})

equalButton.addEventListener ('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
})

clearAllButton.addEventListener ('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener ('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

// keyboard functionality
window.addEventListener ('keyup', (e) => {
  let keyValue = e.key
  if ((keyValue >= 0 && keyValue < 10 || keyValue ===  '.' )) {
    calculator.appendNumber(keyValue)
    calculator.updateDisplay()
  } else if(keyValue === 'Enter' || keyValue === "=") {
    calculator.calculate()
    calculator.updateDisplay()
  } else if(keyValue === 'Escape') {
    calculator.clear()
    calculator.updateDisplay()
  } else if(keyValue === 'Delete' || keyValue === "Backspace") {
    calculator.delete()
    calculator.updateDisplay()
  } else if(keyValue === '+' ||
            keyValue === '-' ||
            keyValue === '÷' ||
            keyValue === '*' ||
            keyValue === 'x' ||
            keyValue === '/') {
      calculator.chooseOperator(keyValue)
      calculator.updateDisplay()
  } else if(e.code === 'Backslash') {
    calculator.prependPlusMinus('+/-')
    calculator.updateDisplay()
  }
})
