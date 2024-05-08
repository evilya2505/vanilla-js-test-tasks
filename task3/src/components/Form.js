import { CatFeeding } from "./CatFeeding.js";

export class Form {
  constructor(
    initialFoodNeeded,
    initialBowlCapacity,
    initialNumCats,
    initialEatingTime,
    initialRefillTime,
    formClassSelector,
    foodNeededSelector,
    bowlCapacitySelector,
    numCatsSelector,
    eatingTimeSelector,
    refillTimeSelector,
    statusSelector,
    errorSelector,
    buttonSelector
  ) {
    this._formClassSelector = formClassSelector;

    this._foodNeeded = initialFoodNeeded;
    this._bowlCapacity = initialBowlCapacity;
    this._numCats = initialNumCats;
    this._eatingTime = initialEatingTime;
    this._refillTime = initialRefillTime;

    this._foodNeededSelector = foodNeededSelector;
    this._bowlCapacitySelector = bowlCapacitySelector;
    this._numCatsSelector = numCatsSelector;
    this._eatingTimeSelector = eatingTimeSelector;
    this._refillTimeSelector = refillTimeSelector;

    this._currentBowlCapacity = bowlCapacity;

    this._statusSelector = statusSelector;
    this._erorSelector = errorSelector;
    this._buttonSelector = buttonSelector;

    this._isError = false;

    this._setEventListeners();
  }

  setFoodNeeded(value) {
    this._foodNeeded = value;
  }

  setBowlCapacity(value) {
    this._bowlCapacity = value;
  }

  setNumCats(value) {
    this._numCats = value;
  }

  setEatingTime(value) {
    this._eatingTime = value;
  }

  setRefillTime(value) {
    this._refillTime = value;
  }

  _validate() {
    const errorLabel = document.querySelector(this._erorSelector);

    errorLabel.textContent = "";

    if (
      parseInt(this._bowlCapacity) < parseInt(this._foodNeeded) ||
      parseInt(this._bowlCapacity) < 1 ||
      parseInt(this._foodNeeded) < 1 ||
      parseInt(this._eatingTime) < 1 ||
      parseInt(this._numCats) < 1 ||
      parseInt(this._refillTime) < 1
    ) {
      this._isError = true;
    }

    if (this._isError) {
      errorLabel.textContent =
        "Значения не валидны. Не могут быть отрицательными, равными нулю, m должно быть больше b";
    }
  }

  _setEventListeners() {
    const formElement = document.querySelector(this._formClassSelector);

    formElement.addEventListener("submit", (e) => {
      console.log(true);
      e.preventDefault();

      this._validate();
      if (!this._isError) {
        const catFeeding = new CatFeeding(
          this._foodNeeded,
          this._bowlCapacity,
          this._numCats,
          this._eatingTime,
          this._refillTime,
          this._statusSelector,
          this._buttonSelector
        );
        catFeeding.startSimulation();
      }
    });
  }
}
