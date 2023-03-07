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

// Listeners and elements
const savedRecordsContainer = document.querySelector("#RecordsContainer");

const CalculateForm = document.querySelector("#CalculateButton");
CalculateButton.addEventListener("click", Total);

const SaveButton = document.querySelector("#SaveRecordButton");
SaveButton.addEventListener("click", SaveRecord);

const result = document.getElementById("InvestmentResultOutput");

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

// Global variables
let currentRecord, savedRecords;

// Get session
if (localStorage.getItem("savedRecords") === null) {
  savedRecords = new Array();
} else {
  savedRecords = JSON.parse(localStorage.getItem("savedRecords"));
  console.log("Session restored");
  LoadRecords(savedRecords);
}

// Get input values

function getPeriod() {
  const SliderButtonA = document.querySelector("#SliderButton__Beginning");
  return SliderButtonA.classList.contains("Active");
}

function getValue(id) {
  return parseFloat(document.getElementById(id).value);
}

// load stored records

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function LoadRecords(records) {
  //Agregar aquí que se haga display de un card bien bonito si no hay resultados
  removeAllChildNodes(savedRecordsContainer);
  for (const record of records) {
    const element = document.createElement("div");
    element.classList.add("Record__Card");
    element.innerHTML = `<p class="Record__Amount">${record.total}</p>
    <div class="Record__Information_Grid">
      <div class="Record__Details">
        <p class="DetailValue" id="DetailValue1">${record.base}</p>
        <p class="DetailDescription" id="DetailDescription1">Initial Investment</p>
      </div>
      <div class="Record__Details">
        <p class="DetailValue" id="DetailValue2">${record.interest}</p>
        <p class="DetailDescription" id="DetailDescription2">Annual interest rate</p>
      </div>
      <div class="Record__Details">
        <p class="DetailValue" id="DetailValue3">${record.anual_add}</p>
        <p class="DetailDescription" id="DetailDescription3">Annual increment</p>
      </div>
      <div class="Record__Details">
        <p class="DetailValue" id="DetailValue4">${record.years}</p>
        <p class="DetailDescription" id="DetailDescription4">Investment term</p>
      </div>
    </div>`;
    savedRecordsContainer.append(element);
  }
}

// Compount interest calculation

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
    result.textContent = record.total.toFixed(2);
    currentRecord = record;
  }
}

//Función para listar cálculos
function FilteringRecords(filter) {
  let tempRecords = savedRecords;

  if (filter) {
    filterValue = parseFloat(
      prompt("Ingrese el número mínimo de años de inversión")
    ); //Cambiar esto por el valor que tiene el filtro
    tempRecords = records.filter(function (record) {
      return record.years >= filterValue;
    });
  }
  LoadRecords(tempRecords);
}

//AGREGAR FUNCION QUE ME QUITE LOS FILTROS

function SaveRecord() {
  let lastRecord = currentRecord;
  if (lastRecord == undefined) {
    //cambiar por un toast
    console.log("Invalid calculation");
  } else if (!isNaN(lastRecord.total)) {
    savedRecords.push(lastRecord);
    console.log("Record saved");
    localStorage.setItem("savedRecords", JSON.stringify(savedRecords));
    LoadRecords(savedRecords);
  }
}
