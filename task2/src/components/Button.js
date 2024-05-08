// ----- Класс, создающий кнопку с цифроы -----
export class ButtonElement {
  constructor(value, buttonSelector, buttonClassSelector, eventListener) {
    this._value = value;
    this._buttonSelector = buttonSelector;
    this._buttonClassSelector = buttonClassSelector;
    this._eventListener = eventListener;
  }

  // Получение и клонирование содержимого заготовки верстки кнопки
  _getTemplate() {
    const buttonElement = document
      .querySelector(this._buttonSelector)
      .content.querySelector(".calculator__button-item")
      .cloneNode(true);

    return buttonElement;
  }

  // Добавление обработчиков событий
  _setEventListeners() {
    this._element = this._getTemplate();
    this._element.addEventListener("click", this._eventListener);
    return this._element;
  }
  // Возвращает готовую кнопку
  generateButton() {
    this._element = this._setEventListeners();

    this._element.querySelector(this._buttonClassSelector).textContent =
      this._value;
    return this._element;
  }
}
