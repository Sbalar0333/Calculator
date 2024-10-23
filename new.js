document.addEventListener('DOMContentLoaded', function () {

    const calculatorScreenFirst = document.querySelectorAll('.calculator-screen')[0];
    const calculatorScreenOperator = document.querySelectorAll('.calculator-screen')[1];
    const calculatorScreenCurrent = document.querySelectorAll('.calculator-screen')[2];

    const keys = document.querySelector('.calculator-keys');

    let firstValue = '';
    let operator = '';
    let currentValue = '';
    let waitingForNewValue = false;
    let decimalAdded = false;

    keys.addEventListener('click', function(event) {

        const target = event.target;
        const value = target.value;

        

        switch(value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':

                if (currentValue !== '' && !waitingForNewValue) {
                    if (firstValue === '') {
                        firstValue = currentValue;
                    } else {
                        firstValue = calculate(firstValue, currentValue, operator);
                    }
                    operator = value;
                    calculatorScreenFirst.value = firstValue;
                    calculatorScreenOperator.value = operator;
                    currentValue = "";
                    calculatorScreenCurrent.value = "";
                    decimalAdded = false;
                } else {
                    operator = value;
                    calculatorScreenOperator.value = operator;
                    
                }
                waitingForNewValue = false;
                break;

            case '=':
                if (firstValue !== '' && operator !== '' && currentValue !== '') {
                    currentValue = calculate(firstValue, currentValue, operator);
                    calculatorScreenCurrent.value = currentValue;
                    calculatorScreenFirst.value = "";
                    calculatorScreenOperator.value = "";
                    firstValue = '';
                    operator = '';
                    decimalAdded = false;
                } else if ((operator == '+' || operator == '-') && (calculatorScreenFirst.value !== "" && calculatorScreenOperator.value !== "")){
                    currentValue='0';
                    waitingForNewValue = true;
                } else if ((operator == '*' || operator == '/') && (calculatorScreenFirst.value !== "" && calculatorScreenOperator.value !== "")) {
                    currentValue='1';
                    waitingForNewValue = true;
                }
                if (firstValue === '') {
                    firstValue = currentValue;
                } else {
                    firstValue = calculate(firstValue, currentValue, operator);
                }
                operator = value;
                calculatorScreenFirst.value = firstValue;
                calculatorScreenOperator.value = operator;
                currentValue = "";
                calculatorScreenOperator.value = "";
                calculatorScreenCurrent.value = "";
                decimalAdded = false;
                waitingForNewValue = true;
                break;

            case 'CE':

                firstValue = '';
                operator = '';
                currentValue = '';
                calculatorScreenFirst.value = "";
                calculatorScreenOperator.value = "";
                calculatorScreenCurrent.value = "0";
                decimalAdded = false;
                waitingForNewValue = false;
                break;

            case 'C':

                currentValue = '';
                calculatorScreenCurrent.value = '0';
                decimalAdded = false;
                waitingForNewValue = false;
                break;

            case 'DEL':

                currentValue = currentValue.slice(0, -1);
                calculatorScreenCurrent.value = currentValue || '0';
                decimalAdded = false;
                break;

            case '.':
                if(currentValue ==='' || currentValue ==='.'){
                    currentValue = '0.';
                    decimalAdded = true;
                }
                if (!decimalAdded && currentValue.length < 12) {
                    currentValue += value;
                    calculatorScreenCurrent.value = currentValue;
                    decimalAdded = true;
                    
                }else if (currentValue.length < 12)  {
                   let decimaltemp = currentValue.replace('.','');
                   let storeValue= decimaltemp.concat(".");
                    currentValue  = storeValue;
                    calculatorScreenCurrent.value= currentValue; 
                }
                break;

            case undefined:
            break;

            default:

                if (waitingForNewValue) {
                    currentValue = value;
                    waitingForNewValue = false;
                } else if (currentValue === '0') {
                    currentValue = value;
                } else if (currentValue.length < 12)  {
                    currentValue = currentValue + value;
                }

                calculatorScreenCurrent.value = currentValue;
                break;
        }
    });

    
    

    function calculate(firstValue, secondValue, operator) {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(secondValue);
        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '%':
                result = (num1 / 100) * num2;
                break;
            default:
                return secondValue;
        }
        return result.toString();
    }
});










