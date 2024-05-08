import { ButtonElement } from "../components/Button.js";
import Section from "../components/Section.js";
import {
  copyButton,
  buttonClassSelector,
  buttonSelector,
  buttonsNumbersListSelector,
  buttonsSymbolsListSelectorRight,
  buttonsSymbolsListSelectorBottom,
  monitorClassSelector,
  allowedKeys,
  digitsAndDot,
  brackets,
  operators,
} from "../utils/constants.js";
import { Calculator } from "../components/calculator.js";

const calculator = new Calculator(monitorClassSelector);

function createNewButton(number, eventListener) {
  const button = new ButtonElement(
    number,
    buttonSelector,
    buttonClassSelector,
    eventListener
  );
  const buttonElement = button.generateButton();

  return buttonElement;
}

function createNumbersButtons() {
  const elements = [];

  for (let i = 0; i < 12; i++) {
    let symbol = i - 2;
    let type = "number";

    if (i === 0) {
      symbol = "←";
      type = "clearOne";
    }
    if (i === 1) {
      symbol = ".";
      type = "dot";
    }
    elements.push(
      createNewButton(symbol, (e) => {
        if (type !== "clearOne") {
          calculator.show(e.target.textContent, type);
        } else {
          calculator.clearOneSymbol();
        }
      })
    );
  }

  const buttonsList = new Section(buttonsNumbersListSelector, elements);
  buttonsList.renderItems();
}

function createSymbolsButtons() {
  const symbolsRight = ["/", "*", "+", "C"];
  const symbolsBottom = ["-", "=", ")", "("];

  const elementsRight = [];
  const elementsBottom = [];

  for (let i = 0; i < symbolsRight.length; i++) {
    elementsRight.push(
      createNewButton(symbolsRight[i], (e) => {
        if (symbolsRight[i] !== "C") {
          calculator.show(e.target.textContent, "symbol");
        } else {
          calculator.clear();
        }
      })
    );
  }

  for (let i = 0; i < symbolsBottom.length; i++) {
    elementsBottom.push(
      createNewButton(symbolsBottom[i], (e) => {
        if (symbolsBottom[i] !== "=") {
          calculator.show(
            e.target.textContent,
            symbolsBottom[i] === "(" || symbolsBottom[i] === ")"
              ? "bracket"
              : "symbol"
          );
        } else {
          calculator.calculate();
        }
      })
    );
  }

  async function copyTextToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Не удалось скопировать текст: ", err);
    }
  }

  copyButton.addEventListener("click", (event) => {
    copyTextToClipboard(calculator.copy());
  });

  window.addEventListener("keydown", (event) => {
    // Проверяем, содержится ли нажатая клавиша в списке разрешенных
    if (!allowedKeys.includes(event.key)) {
      return;
    }

    // Если нажата клавиша Enter или "=", можно вызвать функцию для вычисления выражения
    if (event.key === "Enter" || event.key === "=") {
      calculator.calculate();
    }

    if (event.key === "Backspace" || event.key === "=") {
      calculator.clearOneSymbol();
    }

    // Проверка на ввод чисел или десятичной точки
    if (digitsAndDot.includes(event.key)) {
      calculator.show(event.key, event.key === "." ? "dot" : "number");
    }

    // Проверка на ввод операторов
    if (operators.includes(event.key)) {
      calculator.show(event.key, "symbol");
    }

    // Проверка на ввод скобок
    if (brackets.includes(event.key)) {
      calculator.show(event.key, "bracket");
    }
  });

  const buttonsListRight = new Section(
    buttonsSymbolsListSelectorRight,
    elementsRight
  );
  const buttonsListBottom = new Section(
    buttonsSymbolsListSelectorBottom,
    elementsBottom
  );

  buttonsListRight.renderItems();
  buttonsListBottom.renderItems();
}
createNumbersButtons();
createSymbolsButtons();
