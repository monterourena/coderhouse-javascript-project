// Declaración de variables
let exit, period, base, anual_add, years, interest, total;
let records = new Array();

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

// Funciones para la solicitud de datos
function Period() {
  period = prompt(
    "Seleccione:\n 1. Agregar al inicio del periodo \n 2. Agregar al final del periodo"
  );
}
function Base() {
  base = parseFloat(prompt("Ingrese el monto de capital inicial (USD)"));
}
function Anual() {
  anual_add = parseFloat(
    prompt("Ingrese el monto anual a agregar a la inversión (USD)")
  );
}
function Years() {
  years = parseFloat(prompt("Ingrese el plazo de la inversión (Años)"));
}
function Interest() {
  interest = parseFloat(prompt("Ingrese el porcentaje de interés anual (%)"));
}

//Función para el cálculo del interés compuesto
function Total() {
  Period();
  if (period === "1" || period === "2") {
    Base();
    Anual();
    Years();
    Interest();

    const record = new Record(period, base, anual_add, years, interest, base);

    if (record.period === "1") {
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

    alert(
      `El monto final de tu inversión es de ${record.total.toFixed(2)} USD`
    );
    records.push(record);
  } else {
    alert("La opción seleccionada no es correcta, intente de nuevo");
  }
}

//Función para listar cálculos
function Listar(filter) {
  let tempRecords = records;
  let listOfRecords = "";

  if(filter){
    listOfRecords = "Filtrado de elementos \n" ;
    filterValue = parseFloat(prompt("Ingrese el número mínimo de años de inversión"));
    tempRecords = records.filter(function(record){return record.years >= filterValue})
  }
  
  tempRecords.forEach(function (record, index) {
    listOfRecords =
      listOfRecords +
      `---- Registro ${index + 1} ----\n
      Años de inversión: ${record.years}\n
      Interes: ${record.interest}\n
      Total: ${record.total.toFixed(2)}\n`;
  });

  if(listOfRecords === "" || listOfRecords === "Filtrado de elementos \n"){listOfRecords="No hay registros para mostrar"}
  alert(listOfRecords);
}

while (true) {
  exit = prompt(
    "Seleccione una opción: \n 1. Calcular Interés \n 2. Listar registros \n 3. Filtrar registros por años\n 4. Salir"
  );
  if (exit === "1") {
    Total();
  } else if (exit === "2") {
    Listar(false);
  } else if (exit === "3") {
    Listar(true);
  } else if (exit === "4") {
    alert("Gracias por utilizar nuestro simulador");
    break;
  } else {
    alert("La opción seleccionada es incorrecta. Intente de nuevo.");
  }
}
