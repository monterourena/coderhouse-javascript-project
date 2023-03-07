// Objects
class Record {
  constructor(period, base, anual_add, years, interest, total) {
    this.period = period;
    this.base = base;
    this.anual_add = anual_add;
    this.years = years;
    this.interest = interest;
    this.total = total;
  }
}

// Global variables
let currentRecord, savedRecords;

// General Functions
function NewToast(Message){
  Toastify({
    text: Message,
    duration: 1500,
    close: false,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(96.53deg, #6166DE 20.58%, #5CAFCE 96.44%)",
    }
  }).showToast();
}

// LISTENERS AND DOM ELEMENTS

// --> General Elements
const savedRecordsContainer = document.querySelector("#RecordsContainer");

const CalculateForm = document.querySelector("#CalculateButton");
CalculateButton.addEventListener("click", Total);

const SaveButton = document.querySelector("#SaveRecordButton");
SaveButton.addEventListener("click", SaveRecord);

const result = document.getElementById("InvestmentResultOutput");

// --> Slider
const SliderButtonA = document.querySelector("#SliderButton__Beginning");
const SliderButtonB = document.querySelector("#SliderButton__End");

SliderButtonA.addEventListener("click", function () {
  SliderButtonA.classList.add("Active");
  SliderButtonB.classList.remove("Active");
  Total();
});

SliderButtonB.addEventListener("click", function () {
  SliderButtonB.classList.add("Active");
  SliderButtonA.classList.remove("Active");
  Total();
});

// --> Filters
const SetFilterButton = document.querySelector("#SetFilterButton")
SetFilterButton.addEventListener("click", FilteringRecords)

const ClearFilterButton = document.querySelector("#ClearFilterButton")
ClearFilterButton.addEventListener("click", function(){
  LoadRecords(savedRecords)
  NewToast("Filters cleared")
})

// SESSION AND LOCAL STORAGE
const ClearRecordsButton = document.querySelector("#ClearRecordsButton")
ClearRecordsButton.addEventListener("click", ClearStorage)

if (localStorage.getItem("savedRecords") === null) {
  savedRecords = new Array();
} else {
  savedRecords = JSON.parse(localStorage.getItem("savedRecords"));
  console.log("Session restored");
  LoadRecords(savedRecords);
  NewToast("Session restored")
}

function ClearStorage(){
  savedRecords = []
  localStorage.setItem("savedRecords", JSON.stringify(savedRecords));
  LoadRecords(savedRecords)
  NewToast("Records cleared")
}


// DOM MANIPULATION FUNCTIONS
// Get input values

function getPeriod() {
  const SliderButtonA = document.querySelector("#SliderButton__Beginning");
  return SliderButtonA.classList.contains("Active");
}

function getValue(id) {
  return parseFloat(document.getElementById(id).value);
}

// Records manipulation

function RemoveAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function LoadRecords(records) {

  console.log("Loading these records:", records)
  //Agregar aquí que se haga display de un card bien bonito si no hay resultados
  RemoveAllChildNodes(savedRecordsContainer);
  for (const record of records) {
    const element = document.createElement("div");
    element.classList.add("Record__Card");
    element.innerHTML = `<p class="Record__Amount">${
      "$ " + record.total.toFixed(2)
    }</p>
    <div class="Record__Information_Grid">
      <div class="Record__Details">
        <p class="DetailValue" id="DetailValue1">${
          "$ " + record.base.toFixed(1)
        }</p>
        <p class="DetailDescription" id="DetailDescription1">Initial Investment</p>
      </div>
      <div class="Record__Details">
        <p class="DetailValue" id="DetailValue2">${
          record.interest.toFixed(1) + " %"
        }</p>
        <p class="DetailDescription" id="DetailDescription2">Annual interest rate</p>
      </div>
      <div class="Record__Details">
        <p class="DetailValue" id="DetailValue3">${
          "$ " + record.anual_add.toFixed(1)
        }</p>
        <p class="DetailDescription" id="DetailDescription3">Annual increment</p>
      </div>
      <div class="Record__Details">
        <p class="DetailValue" id="DetailValue4">${
          record.years.toFixed(0) + " years"
        }</p>
        <p class="DetailDescription" id="DetailDescription4">Investment term</p>
      </div>
    </div>`;
    savedRecordsContainer.append(element);
  }
}

// MAIN CALCULATIONS

function Total() {
  let period = getPeriod();
  let base = getValue("InitialInvestmentInput");
  let anual_add = getValue("AnnualIncrementInput");
  let interest = getValue("RateInput");
  let years = getValue("YearInput");

  const record = new Record(period, base, anual_add, years, interest, base);
  if (isNaN(years)) {
    //If there if no years entered, we do not compute the calculation
    record.total = NaN;
  } else {
    if (record.period === true) {
      for (let i = 0; i < record.years; i++) {
        record.total =
          (record.total + record.anual_add) * (1 + record.interest / 100);
      }
    } else {
      for (let i = 0; i < record.years; i++) {
        record.total =
          record.total * (1 + record.interest / 100) + record.anual_add;
      }
    }
  }

  //Inputs validation

  if (isNaN(record.total)) {
    result.textContent = "Missing inputs";
    console.log("Missing inputs");
  } else {
    result.textContent = "$ "+record.total.toFixed(2);
    currentRecord = record;
  }
}

//Función para listar cálculos
function FilteringRecords() {
  let tempRecords = savedRecords;

  filterValue = getValue("FilterInput")
  tempRecords = tempRecords.filter(function (record) {
    return record.years >= filterValue;
  });

  LoadRecords(tempRecords);
  NewToast("Filter applied")
}

//AGREGAR FUNCION QUE ME QUITE LOS FILTROS

function SaveRecord() {
  let lastRecord = currentRecord;
  if (lastRecord == undefined) {
    NewToast("Invalid record")
    console.log("Invalid calculation");
  } else if (!isNaN(lastRecord.total)) {
    savedRecords.push(lastRecord);
    console.log("Record saved");
    localStorage.setItem("savedRecords", JSON.stringify(savedRecords));
    LoadRecords(savedRecords);
    NewToast("Record saved")
  }
}
