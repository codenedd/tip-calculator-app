const calculator = document.querySelector(".container");
const billAmount = document.querySelector("#bill");
const percentAmount = document.querySelector("#percent");
const peopleAmount = document.querySelector("#people");
const results = document.querySelectorAll(".results__score");
let tipAmount;

calculator.addEventListener("click", (event) => {
  console.log(event.target.innerText);
});
