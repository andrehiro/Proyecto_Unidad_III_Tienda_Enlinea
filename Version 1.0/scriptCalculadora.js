const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let currentOperator = "";
let shouldClearDisplay = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;

        if (buttonText.match(/[0-9]/)) {
            if (shouldClearDisplay) {
                display.textContent = "";
                shouldClearDisplay = false;
            }
            display.textContent += buttonText;
        } else if (buttonText === "C") {
            display.textContent = "0";
            currentInput = "";
            currentOperator = "";
        } else if (buttonText === "=") {
            if (currentOperator && currentInput) {
                const result = calculate(parseFloat(currentInput), currentOperator, parseFloat(display.textContent));
                display.textContent = result;
                currentInput = result;
                currentOperator = "";
                shouldClearDisplay = true;
            }
        } else {
            currentOperator = buttonText;
            currentInput = display.textContent;
            shouldClearDisplay = true;
        }
    });
});

function calculate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return "Error";
            }
        default:
            return num2;
    }
}

document.getElementById("botonMostrarCalculadora").addEventListener("click", function () {
    var calculator = document.getElementById("calculator");
    

    if (calculator.style.display === "none" || calculator.style.display === "") {
        calculator.style.display = "block";
    } else {
        calculator.style.display = "none";
    }
});