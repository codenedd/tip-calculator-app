const calculator = document.querySelector(".container");
const billAmount = document.querySelector("#bill");
const percentAmount = document.querySelector("#percent");
const peopleAmount = document.querySelector("#people");
const labelOfPeople = document.querySelector(".people label");
const peopleInput = document.querySelector(".people-input");
const results = document.querySelectorAll(".results__score");
const percentButtons = document.querySelectorAll(".percent__amount button");
const reset = document.querySelector("#reset");
let tipAmount;

const percents = ["5%", "10%", "15%", "25%", "50%"];

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
  controlInputs();
  countTip();
  if (event.target === percentAmount) {
    percentButtons.forEach((button) => button.classList.remove("percent__amount__toggled"));
    tipAmount = percentAmount.value / 100;
    countTip();
  }

  if (event.target === billAmount && billAmount.value > 0) {
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

function controlInputs() {
  if (percentAmount.value > 100) {
    percentAmount.value = 100;
  }
  if (percentAmount.value < 0) {
    percentAmount.value = 0;
  }

  if (String(percentAmount.value).charAt(0) === "0") {
    percentAmount.value = Number(percentAmount.value);
  }

  if (peopleAmount.value == 0 && !peopleInput.classList.contains("input-zero")) {
    peopleInput.classList.add("input-zero");
    labelOfPeople.innerHTML += "<span>Can't be zero<span>";
  }

  if ((peopleAmount.value > 0 || peopleAmount.value == "") && peopleInput.classList.contains("input-zero")) {
    peopleInput.classList.remove("input-zero");
    labelOfPeople.innerHTML = "Number of People";
  }

  if (String(peopleAmount.value).charAt(0) === "0") {
    peopleAmount.value = Number(peopleAmount.value);
  }
}
