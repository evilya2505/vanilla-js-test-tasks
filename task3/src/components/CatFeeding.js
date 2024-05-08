export class CatFeeding {
  constructor(
    foodNeeded,
    bowlCapacity,
    numCats,
    eatingTime,
    refillTime,
    statusSelector,
    buttonSelector
  ) {
    this._foodNeeded = parseInt(foodNeeded);
    this._bowlCapacity = parseInt(bowlCapacity);
    this._numCats = parseInt(numCats);
    this._eatingTime = parseInt(eatingTime);
    this._refillTime = parseInt(refillTime);

    this._currentFood = this._bowlCapacity;
    this._totalTime = 0;

    this._statusSelector = statusSelector;
    this._buttonSelector = buttonSelector;
  }

  _feedCat(catNumber) {
    return new Promise((resolve) => {
      const statusDiv = document.querySelector(this._statusSelector);

      if (this._currentFood < this._foodNeeded) {
        statusDiv.innerHTML += `<p>Миска пуста, бабушка заполняет миску ...</p>`;
        setTimeout(() => {
          this._currentFood = this._bowlCapacity;
          statusDiv.innerHTML += `<p>Миска снова наполнена.</p>`;
          this._totalTime += this._refillTime;
          this._feedCat(catNumber).then(resolve);
        }, this._refillTime * 1000);
      } else {
        statusDiv.innerHTML += `<p>Котик номер <strong>${catNumber}</strong> ест...</p>`;
        setTimeout(() => {
          this._currentFood -= this._foodNeeded;
          statusDiv.innerHTML += `<p>Котик номер <strong>${catNumber}</strong> закончил есть.</p>`;
          this._totalTime += this._eatingTime;
          if (catNumber < this._numCats) {
            this._feedCat(catNumber + 1).then(resolve);
          } else {
            resolve();
          }
        }, this._eatingTime * 1000);
      }
    });
  }

  async startSimulation() {
    const statusDiv = document.querySelector(this._statusSelector);
    const button = document.querySelector(this._buttonSelector);

    button.disabled = true; // Блокировать кнопку перед началом симуляции

    statusDiv.innerHTML = "";
    this._totalTime = 0;
    await this._feedCat(1); // Ожидаем завершения всей симуляции
    button.disabled = false; // Разблокировать кнопку после окончания симуляции
  }
}
