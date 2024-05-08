import { Form } from "../components/Form.js";
import {
  refillTimeInput,
  foodNeededInput,
  bowlCapacityInput,
  numCatsInput,
  eatingTimeInput,
  formSelector,
  foodNeededSelector,
  bowlCapacitySelector,
  numCatsSelector,
  eatingTimeSelector,
  refillTimeSelector,
  statusSelector,
  formErrorLabelSelector,
  formButtonSelector,
} from "../utils/constants.js";

const form = new Form(
  foodNeededInput.value,
  bowlCapacityInput.value,
  numCatsInput.value,
  eatingTimeInput.value,
  refillTimeInput.value,
  formSelector,
  foodNeededSelector,
  bowlCapacitySelector,
  numCatsSelector,
  eatingTimeSelector,
  refillTimeSelector,
  statusSelector,
  formErrorLabelSelector,
  formButtonSelector
);

foodNeededInput.addEventListener("input", (e) => {
  form.setFoodNeeded(e.target.value);
});

bowlCapacityInput.addEventListener("input", (e) => {
  form.setBowlCapacity(e.target.value);
});

numCatsInput.addEventListener("input", (e) => {
  form.setNumCats(e.target.value);
});

eatingTimeInput.addEventListener("input", (e) => {
  form.setEatingTime(e.target.value);
});

refillTimeInput.addEventListener("input", (e) => {
  form.setRefillTime(e.target.value);
});
