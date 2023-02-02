// Declaración de variables
let exit, period, base, anual_add, years, interest, total;

// Funciones para la solicitud de datos
function Period() {
  period = prompt(
    "Seleccione:\n 1.Agregar al inicio del periodo \n 2. Agregar al final del periodo"
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
    total = base;
    if (period === "1") {
      for (let i = 0; i < years; i++) {
        total = (total + anual_add) * (1 + interest / 100);
      }
    } else {
      for (let i = 0; i < years; i++) {
        total = total * (1 + interest / 100) + anual_add;
      }
    }

    alert(`El monto final de tu inversión es de ${total.toFixed(2)} USD`);
  } else {
    alert("La opción seleccionada no es correcta, intente de nuevo");
  }
}

while (true) {
  exit = prompt("Seleccione una opción: \n 1. Calcular Interés \n 2. Salir");
  if (exit === "1") {
    Total();
  } else if (exit === "2") {
    alert("Gracias por utilizar nuestro simulador");
    break;
  } else {
    alert("La opción seleccionada es incorrecta. Intente de nuevo.");
  }
}
