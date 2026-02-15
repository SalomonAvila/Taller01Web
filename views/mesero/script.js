const platos = [
    { id: 1, nombre: "Toston con Hogao", precio: 15000 },
    { id: 2, nombre: "Arepa de chocolo", precio: 10000 },
    { id: 3, nombre: "Bandeja paisa", precio: 40000 },
    { id: 3, nombre: "Frijolada", precio: 25000 },
    { id: 3, nombre: "Queso con bocadillo", precio: 4000 }
];


document.addEventListener("DOMContentLoaded",function(){
    let contenedor = document.getElementById('contenedorTomarPedido');
    const formularioHTML = `
        <form id="nuevoPlato">
            <p>Seleccione el plato:</p>
            <select name="platos">
                <option value="toston">Toston con Hogao</option>
                <option value="toston">Toston con Hogao</option>
                <option value="toston">Toston con Hogao</option>
                <option value="toston">Toston con Hogao</option>
                <option value="toston">Toston con Hogao</option>
            </select>
        </form>
    `;
});

const numPersonas = document.getElementById("numPersonas");
const contenedorEdades = document.getElementById("contenedorEdades");

//Genera inputs dinamicamente cuqndo cambia el numero
numPersonas.addEventListener("input", function(){

    contenedorEdades.innetHTML = ""; //Limpia los anteriores

    let cantidad = parseInt(numPersonas.value);

    if(cantidad > 0){
        for(let i = 1; i <= cantidad; i++){
            let input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "100";
            input.placeholder = "Edad persona" + i;
            input.classList.add("edadInput");

            contenedorEdades.appendChild(input);
        }
    }
});

function Mesa(numPersonas, edades, tipoEvento, fechaReserva){
    let fechaActual = new Date();

    if(numPersonas <= 0){
        console.log("No se puede crear la reserva ya que el numero de personas no esta permitido (mín 1)");
        return;
    }
    
    for(let i = 0; i <= edades.length; i++){
        if (1 < edades[i] || edades[i] > 100) {
            console.log("Hay edades no válidas en la reserva");   
            return false;
        }
    }
    
    //Validar Fecha
    let fechaSeleccionada = new Date(fechaReserva);

    if(fechaSeleccionada < fechaActual){
        console.log("La fecha seleccionada para la reserva no es valida, debe ser una fecha mayor o igual al día de hoy "+ fechaActual);
        return false;
    }

    console.log("Reserva realizada con exito");
    return true;
}