// Класс для управления компонентом калькулятора
export class Calculator {
  constructor(monitorClassSelector) {
    this._ops = { "+": 1, "-": 1, "*": 2, "/": 2 };
    this._monitorClassSelector = monitorClassSelector;
    this._currentExpression = "";
    this._isResult = false;
  }

  _hasMatchingOpeningBracket(value) {
    if (this._currentExpression.includes("(") || value === ")") {
      let openingBracketsAmount = 0;
      let closingBracketsAmount = 0;

      for (let i = 0; i < this._currentExpression.length; i++) {
        if (this._currentExpression[i] === "(") {
          openingBracketsAmount += 1;
        }
        if (this._currentExpression[i] === ")") {
          closingBracketsAmount += 1;
        }
      }

      if (closingBracketsAmount + 1 > openingBracketsAmount) return false;
    }
    return true;
  }

  show(value, type) {
    this._element = document.querySelector(this._monitorClassSelector);
    if (this._isResult) {
      this.clear();
      this._isResult = false;
    }

    let currentText = this._element.textContent;

    const isCurrentSymbolOperator = type === "symbol";
    const isCurrentSymbolNumber = type === "number";
    const isCurrentSymbolDot = type === "dot";
    const isCurrentSymbolBracket = type === "bracket";

    // Проверяем, является ли последний введенный символ числом и начинается ли оно с нуля.
    if (isCurrentSymbolNumber) {
      const lastNumberString = currentText.split(" ").pop();
      if (
        lastNumberString.match(/^0$/) &&
        value !== "." &&
        !lastNumberString.includes(".")
      ) {
        // Если последнее число '0', новый символ не точка и последнее число не десятичное, заменяем '0' на новое число
        this._currentExpression = this._currentExpression.slice(0, -1) + value;
        this._element.textContent = this._currentExpression;

        return;
      }
    }

    // Проверяем условия для операторов
    if (isCurrentSymbolOperator) {
      if (
        currentText === "" ||
        ["+", "-", "*", "/"].includes(currentText[currentText.length - 2]) ||
        ["+", "-", "*", "/"].includes(currentText[currentText.length - 1]) ||
        currentText[currentText.length - 1] === "."
      ) {
        return;
      }
    }

    // Проверяем условия для точки
    if (isCurrentSymbolDot) {
      if (
        currentText
          .split(" ")
          [currentText.split(" ").length - 1].includes(".") ||
        currentText === ""
      )
        return;
    }

    // Проверяем и обрабатываем ввод скобок
    if (isCurrentSymbolBracket) {
      if (!this._hasMatchingOpeningBracket(value)) return false;
    }

    this._currentExpression = `${this._currentExpression}${
      isCurrentSymbolOperator ? " " : ""
    }${value}${isCurrentSymbolOperator ? " " : ""}`;

    this._element.textContent = this._currentExpression;
  }
  applyOp(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b ? a / b : "ошибка";
      default:
        return 0;
    }
  }

  _precedence(op) {
    return this._ops[op] || 0;
  }

  _evaluate(expression) {
    let values = [];
    let operators = [];
    let i = 0;

    while (i < expression.length) {
      if (expression[i] === " ") {
        i++;
        continue;
      }

      if (expression[i] === "(") {
        operators.push(expression[i]);
      } else if (/\d/.test(expression[i])) {
        let val = 0;
        while (i < expression.length && /\d/.test(expression[i])) {
          val = val * 10 + (expression[i] - "0");
          i++;
        }
        values.push(val);
        i--;
      } else if (expression[i] === ")") {
        while (operators.length && operators[operators.length - 1] !== "(") {
          let val2 = values.pop();
          let val1 = values.pop();
          let op = operators.pop();
          values.push(this.applyOp(val1, val2, op));
        }
        operators.pop();
      } else if (this._ops[expression[i]]) {
        while (
          operators.length &&
          this._precedence(operators[operators.length - 1]) >=
            this._precedence(expression[i])
        ) {
          let val2 = values.pop();
          let val1 = values.pop();
          let op = operators.pop();
          values.push(this.applyOp(val1, val2, op));
        }
        operators.push(expression[i]);
      }
      i++;
    }

    while (operators.length) {
      let val2 = values.pop();
      let val1 = values.pop();
      let op = operators.pop();
      values.push(this.applyOp(val1, val2, op));
    }

    return values.pop();
  }

  calculate() {
    this._element = document.querySelector(this._monitorClassSelector);

    try {
      const result = this._evaluate(this._currentExpression);
      this._element.textContent = result.toString();
      this._currentExpression = result.toString();
    } catch (error) {
      this._element.textContent = "Ошибка";
      console.error(error);
    } finally {
      this._isResult = true;
    }
  }

  clear() {
    this._currentExpression = "";
    this._element.textContent = "";
  }

  clearOneSymbol() {
    if (this._currentExpression !== "") {
      this._currentExpression = this._currentExpression.slice(0, -1);
      this._element.textContent = this._currentExpression;
    }
  }

  copy() {
    return this._element.textContent;
  }
}
