const calculator = document.querySelector(".container");
const billAmount = document.querySelector("#bill");
const percentAmount = document.querySelector("#percent");
const peopleAmount = document.querySelector("#people");
const results = document.querySelectorAll(".results__score");
const percentButtons = document.querySelectorAll(".percent__amount button");
const reset = document.querySelector("#reset");
let tipAmount;

calculator.addEventListener("click", (event) => {
  if (event.target.type === "submit") {
    percentButtons.forEach((button) => button.classList.remove("percent__amount__toggled"));
    event.target.classList.toggle("percent__amount__toggled");
    percentAmount.value = "";
    tipAmount = Number(event.target.innerText.slice(0, -1)) / 100;
    countTip();
  }

  if (event.target === reset) {
    percentButtons.forEach((button) => button.classList.remove("percent__amount__toggled"));
    peopleAmount.value = "";
    billAmount.value = "";
    percentAmount.value = "";
    results[0].innerText = `$0.00`;
    results[1].innerText = `$0.00`;
  }
});

calculator.addEventListener("input", (event) => {
  CheckCorrectOfInputAmount(event.target, event.target.parentNode, event.target.labels[0]);
  countTip();
  if (event.target === percentAmount) {
    percentButtons.forEach((button) => button.classList.remove("percent__amount__toggled"));
    tipAmount = percentAmount.value / 100;
    countTip();
  }

  if (!Number.isInteger(Number(billAmount.value))) {
    billAmount.value = Number(billAmount.value).toFixed(2);
  }
});

function countTip() {
  if (tipAmount > 0 && peopleAmount.value > 0 && billAmount.value > 0) {
    console.log(tipAmount, peopleAmount.value, billAmount.value);
    let countedTip = (billAmount.value / peopleAmount.value) * tipAmount;
    let total = billAmount.value / peopleAmount.value + countedTip;
    results[0].innerText = `$${countedTip.toFixed(2)}`;
    results[1].innerText = `$${total.toFixed(2)}`;
  }
}

function CheckCorrectOfInputAmount(inputElement, input, label) {
  console.log(inputElement, input, label);
  if (inputElement.value == 0 && !input.classList.contains("input-zero")) {
    input.classList.add("input-zero");
    label.innerHTML += "<span>Can't be zero<span>";
  }

  if ((inputElement.value > 0 || inputElement.value == "") && input.classList.contains("input-zero")) {
    input.classList.remove("input-zero");
    label.removeChild(label.lastChild);
  }

  if (String(inputElement.value).charAt(0) === "0") {
    inputElement.value = Number(inputElement.value);
  }

  if (inputElement.min !== "" && inputElement.value < 0) {
    inputElement.value = Number(inputElement.min);
  }

  if (inputElement.max !== "" && inputElement.value > 100) {
    inputElement.value = Number(inputElement.max);
  }
}
