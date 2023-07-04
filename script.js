class Calculator {
  constructor(previousOperandTextInput, currentOperandTextInput) {
    this.previousOperandTextInput = previousOperandTextInput;
    this.currentOperandTextInput = currentOperandTextInput;
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operator = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  chooseOperator(operator) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operator = operator
    console.log(this.operator)
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation;
    let previous = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operator) {
      case '+':
        computation = previous + current
        break
      case '-':
        computation = previous - current
        break
      case '÷':
        computation = previous / current
        break
      case '*':
        computation = previous * current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operator = undefined
    this.previousOperand = ''
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  formatDisplayNumber(number) {
    const numberToString = number.toString()
    // select numbers before decimal
    const beforeDecimalDigits = parseFloat(numberToString.split('.')[0])
    // select numbers after decimal
    const afterDecimalDigits = numberToString.split('.')[1]
    // format whole integer to be displayed
    let displayInteger
    console.log(afterDecimalDigits);
    // if no digits before decimal then nothing to display, or display with commas
    if (isNaN(beforeDecimalDigits)) {
      displayInteger = ''
    } else {
      displayInteger = beforeDecimalDigits.toLocaleString('en', { maximumFractionDigits: 0})
    }
    // if numbers after decimal, concatenate before and after numbers with '.'
    if (afterDecimalDigits != null) {
    return `${displayInteger}.${afterDecimalDigits}`
    } else {
      return displayInteger
    }
  }

  updateDisplay() {
    this.currentOperandTextInput.innerText =
      this.formatDisplayNumber(this.currentOperand)
    if (this.operator != null) {
      this.previousOperandTextInput.innerText =
      `${this.formatDisplayNumber(this.previousOperand)} ${this.operator}`
      console.log(this.previousOperandTextInput.innerText)
    } else {
      this.previousOperand = ''
    }
  }
}

const previousOperandTextInput = document.querySelector('[data-previous-operand]');
const currentOperandTextInput = document.querySelector('[data-current-operand]');
const numberButtons = document.querySelectorAll('[data-number');
const operatorButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
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
    calculator.updateDisplay;
  })
});

equalButton.addEventListener ('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

clearAllButton.addEventListener ('click', () => {
  calculator.clear();
  calculator.updateDisplay()
})

deleteButton.addEventListener ('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})
