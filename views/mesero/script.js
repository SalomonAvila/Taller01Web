// Característica: Realizar pedido

const platos = [
    { idPlato: 1, nombre: "Toston con Hogao", precio: 15000 },
    { idPlato: 2, nombre: "Arepa de chocolo", precio: 10000 },
    { idPlato: 3, nombre: "Bandeja paisa", precio: 40000 },
    { idPlato: 4, nombre: "Frijolada", precio: 25000 },
    { idPlato: 5, nombre: "Queso con bocadillo", precio: 4000 }
];

let pedido = [];

const contenedorPlatos = document.getElementById("contenedorPlatos");
const iniciarPedido = document.getElementById("iniciarPedido");
const totalPedido = document.getElementById("totalPedido");
const formularioPedido = document.getElementById("formularioPedido");
const numPersonas = document.getElementById("numPersonas");

function CrearFormularioPlato(){
    
    const contenedorPedido = document.createElement("div");
    contenedorPedido.className = "form-group";
    
    const seleccion = document.createElement("select");
    seleccion.innerHTML = `<option value="">-- Selecciona un plato --</option>`;

    platos.forEach(plato => {
            const opcion = document.createElement("option");
            opcion.value = plato.idPlato;
            opcion.textContent = plato.nombre;
            seleccion.appendChild(opcion);
    });

    const cantidadPlato = document.createElement("input");
    cantidadPlato.type = "number";
    cantidadPlato.min = 1;
    cantidadPlato.value = 1;

    const cantidad = parseInt(cantidadPlato.value);
    if(cantidad <= 0){
        return;
    }

    const confirmarPlato = document.createElement("button");
    confirmarPlato.type = "button";
    confirmarPlato.textContent = "Confirmar";
    confirmarPlato.className = "btn-enviar";

    contenedorPedido.appendChild(seleccion);
    contenedorPedido.appendChild(cantidadPlato);
    contenedorPedido.appendChild(confirmarPlato);
    contenedorPlatos.appendChild(contenedorPedido);

    confirmarPlato.addEventListener("click", function(){

            const idLocal = parseInt(seleccion.value);
            if(!idLocal){
                return;
            }
            const cantidad = parseInt(cantidadPlato.value);
            if(cantidad <= 0 || isNaN(cantidad) || cantidad == ""){
                return;
            }

            const plato = platos.find(plato => plato.idPlato === idLocal);
            
            pedido.push({

                    nombre: plato.nombre,
                    precio: plato.precio,
                    cantidad: parseInt(cantidadPlato.value)
                }
            );

            MostrarConfirmacionPlato(plato.nombre, cantidadPlato.value);
            contenedorPedido.remove();
            DesplegarBotonAgregar();
            DesplegarBotonesFinales();
        });
}

function MostrarConfirmacionPlato(nombre, cantidad){

    const contenedor = document.createElement("div");
    contenedor.className = "form-group";
    contenedor.textContent = `Plato: ${nombre} || Cantidad: ${cantidad}`;
    contenedorPlatos.appendChild(contenedor);
}

function DesplegarBotonAgregar(){

    const contenedorAgregarPlato = document.getElementById("contenedorAgregarPlato");
    contenedorAgregarPlato.innerHTML = "";

    const botonAgregar = document.createElement("button");
    botonAgregar.type = "button";
    botonAgregar.textContent = "Agregar Plato";
    botonAgregar.className = "btn-enviar";

    contenedorAgregarPlato.appendChild(botonAgregar);

    botonAgregar.addEventListener("click", function(){
        contenedorAgregarPlato.innerHTML = "";
        CrearFormularioPlato();
    });
}

function DesplegarBotonesFinales(){
    
    const contenedor = document.getElementById("contenedorBotonEnviar");
    if(contenedor.children.length > 0){
        return;
    }

    const botonEnviar = document.createElement("button");
    botonEnviar.type = "submit";
    botonEnviar.textContent = "Enviar Pedido";
    botonEnviar.className = "btn-enviar";

    const botonReiniciar = document.createElement("button");
    botonReiniciar.type = "button";
    botonReiniciar.textContent = "Reiniciar Pedido";
    botonReiniciar.className = "btn-enviar";

    contenedor.append(botonEnviar, botonReiniciar);

    botonReiniciar.addEventListener("click", function(){

        pedido = [];
        contenedorPlatos.innerHTML = "";
        totalPedido.textContent = "";
        LimpiarControlesPedido();
        contenedor.innerHTML = "";
        CrearFormularioPlato();
    })

}

function LimpiarControlesPedido(){
    document.getElementById("contenedorAgregarPlato").innerHTML = "";
    document.getElementById("contenedorBotonEnviar").innerHTML = "";
}


iniciarPedido.addEventListener("click", function(){

        pedido = [];
        contenedorPlatos.innerHTML = "";
        totalPedido.textContent = "";
        LimpiarControlesPedido();        
        CrearFormularioPlato();
        iniciarPedido.style.display = "none";
});

formularioPedido.addEventListener("submit", function(formPedido){
    
    formPedido.preventDefault();
    let total = 0;
    contenedorPlatos.innerHTML = "<h4>Resumen del pedido:</h4>";

    pedido.forEach(objeto => {

        total += objeto.precio * objeto.cantidad;
        const objeto2 = document.createElement("div");
        objeto2.textContent = `Plato: ${objeto.nombre} || Cantidad: ${objeto.cantidad}`;
        contenedorPlatos.appendChild(objeto2);
    });

    totalPedido.textContent = `Total del pedido: ${total} COP`;
    LimpiarControlesPedido();
});

// Característica: Reservar mesa
const contenedorEdades = document.getElementById("contenedorEdades");

//Genera inputs dinamicamente cuqndo cambia el numero
numPersonas.addEventListener("input", function(){

    contenedorEdades.innerHTML = ""; //Limpia los anteriores

    let cantidad = parseInt(numPersonas.value);

    if(cantidad > 0){
        for(let i = 1; i <= cantidad; i++){
            let input = document.createElement("input");
	    input.placeholder = "Edad persona" + i;
            input.type = "number";
            input.min = "1";
            input.max = "100";
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
    
    for(let i = 0; i < edades.length; i++){
        if (edades[i] < 1 || edades[i] > 100) {
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