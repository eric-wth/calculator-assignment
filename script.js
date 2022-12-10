const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator_display')
const keys = calculator.querySelector('.calculator_keys')

const add = (a, b) => {
    let answer = parseFloat(a) + parseFloat(b);
    return answer;
}

const subtract = (a, b) => {
    let answer = parseFloat(a) - parseFloat(b);
    return answer;
}

const multiply = (a, b) => {
    let answer = parseFloat(a) * parseFloat(b);
    return answer;
}

const divide = (a, b) => {
    if (b > 0) {
        let answer = parseFloat(a) / parseFloat(b);
        return answer;
    }
    else {
        return("Lol! Mathematical oopsie");
    }    
}

const operate = (num1, op, num2) => {
    let result;
    switch(op) {
        case 'add':
            result = add(num1, num2);
            break;
        case 'subtract':
            result = subtract(num1, num2);
            break;
        case 'multiply':
            result = multiply(num1, num2);
            break;
        case 'divide':
            result = divide(num1, num2);
            break;
    }
    return result;
}  
  
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.textContent;
      const previousKeyType = calculator.dataset.previousKeyType;
  
      Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
  
      if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator') {
          display.textContent = keyContent;
        }
        else {
          display.textContent = displayedNum + keyContent;
        }
      }
  
      if (action === 'decimal') {
        display.textContent = displayedNum + '.'
      }
  
      if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        
      }
  
      if (action === 'clear') {
        display.innerText = '0';
      }
  
      if (action === 'operate') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
  
        display.textContent = operate(firstValue, operator, secondValue)
      }
    }
})