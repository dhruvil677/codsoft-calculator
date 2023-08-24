document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    let currentInput = "0";
    let currentOperator = "";
    let waitingForNextNumber = false;

    function updateDisplay() {
    display.textContent = currentInput;
    }

    function handleNumberClick(number) {
    if (waitingForNextNumber) {
        currentInput = number;
        waitingForNextNumber = false;
    } else {
        currentInput = currentInput === "0" ? number : currentInput + number;
    }
    
    updateDisplay();
    }

    function handleOperatorClick(operator) {
    if (currentOperator !== "") {
        performCalculation();
    }
    currentOperator = operator;
    waitingForNextNumber = true;
    }

    function performCalculation() {
      const prevValue = parseFloat(display.textContent);
      const newValue = parseFloat(currentInput);
      switch (currentOperator) {
        case "+":
          currentInput = (prevValue + newValue).toString();
          break;
        case "-":
          currentInput = (prevValue - newValue).toString();
          break;
        case "*":
          currentInput = (prevValue * newValue).toString();
          break;
        case "/":
          currentInput = (prevValue / newValue).toString();
          break;
      }
      currentOperator = "";
      updateDisplay();
    }
  
    function handleEqualsClick() {
      if (currentOperator !== "") {
        performCalculation();
        currentOperator = "";
        waitingForNextNumber = true;
      }
    }
  
    function handleClearClick() {
      currentInput = "0";
      currentOperator = "";
      waitingForNextNumber = false;
      updateDisplay();
    }
  
    const numberButtons = document.querySelectorAll(".btn[data-number]");
    const operatorButtons = document.querySelectorAll(".btn[data-operator]");
    const equalsButton = document.getElementById("equals");
    const clearButton = document.getElementById("clear");
  
    numberButtons.forEach(button => {
      button.addEventListener("click", () => {
        handleNumberClick(button.getAttribute("data-number"));
      });
    });
  
    operatorButtons.forEach(button => {
      button.addEventListener("click", () => {
        handleOperatorClick(button.getAttribute("data-operator"));
      });
    });
  
    equalsButton.addEventListener("click", handleEqualsClick);
  
    clearButton.addEventListener("click", handleClearClick);
  });
  