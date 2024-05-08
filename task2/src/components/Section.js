// Класс, отвечающий за отрисовку элементов на странице
export default class Section {
  constructor(containerSelector, elements) {
    this._container = document.querySelector(containerSelector); // контейнер, в который нужно добавлять созданные элементы
    this._elements = elements;
  }

  // Метод, принимающий DOM-элемент и добавляющий его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // Метод, отвечающий за отрисовку всех элементов
  renderItems() {
    for (let i = 0; i < this._elements.length; i++) {
      this.addItem(this._elements[i]);
    }
  }
}
