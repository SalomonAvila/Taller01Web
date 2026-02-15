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

function Mesa(numPersonas, edades, tipoEvento, fechaReserva){
    let fechaActual = new Date();
    if(numPersonas <= 0){
        console.log("No se puede crear la reserva ya que el numero de personas no esta permitido (mín 1)");
        return;
    }
    
    let edadesRango = true;
    let i = 0;

    while (edadesRango == true && i < edades.length) {
        if (1 <= edades[i] <= 100) {   
            edadesRango = false;
        }
        i++;
    }
    
    if (!edadesRango) {
        console.log("Hay edades no válidas en la reserva");
        return;
    }

    if(fechaReserva < fechaActual){
        console.log("La fecha seleccionada para la reserva no es valida, debe ser una fecha mayor o igual al día de hoy "+ fechaActual);
        return;
    }
}