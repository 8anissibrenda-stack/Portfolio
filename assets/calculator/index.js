// CALCULATOR PROGRAM
const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

function deleteLast() {
  if (display.value === "Error") {
    display.value = "";
    return;
  }
  display.value = display.value.slice(0, -1);
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Numbers
  if (key >= "0" && key <= "9") {
    appendToDisplay(key);
  }

  // Operators
  else if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "." ||
    key === "%" ||
    key === "(" ||
    key === ")"
  ) {
    appendToDisplay(key);
  }

  // Enter
  else if (key === "Enter") {
    event.preventDefault();
    calculate();
  }

  // Backspace
  else if (key === "Backspace") {
    deleteLast();
  }

  // Escape
  else if (key === "Escape") {
    clearDisplay();
  }
});
