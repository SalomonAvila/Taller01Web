// Característica: Realizar pedido

// Lista de platos disponibles en el menú del restaurante
const platos = [
    { idPlato: 1, nombre: "Toston con Hogao", precio: 15000 },
    { idPlato: 2, nombre: "Arepa de chocolo", precio: 10000 },
    { idPlato: 3, nombre: "Bandeja paisa", precio: 40000 },
    { idPlato: 4, nombre: "Frijolada", precio: 25000 },
    { idPlato: 5, nombre: "Queso con bocadillo", precio: 4000 }
];

// Array que almacena los platos seleccionados por el mesero para el pedido actual
let pedido = [];

// Elementos del DOM para la funcionalidad de pedido
const contenedorPlatos = document.getElementById("contenedorPlatos");
const iniciarPedido = document.getElementById("iniciarPedido");
const totalPedido = document.getElementById("totalPedido");
const formularioPedido = document.getElementById("formularioPedido");
const numPersonas = document.getElementById("numPersonas");

/**
 * Crea dinámicamente un formulario para agregar un plato al pedido
 * Genera un select con los platos disponibles, un input para la cantidad
 * y un botón para confirmar la selección.
 */
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
                alert("Necesita seleccionar un plato")
                return;
            }
            const cantidad = parseInt(cantidadPlato.value);
            if(cantidad <= 0 || isNaN(cantidad) || cantidad == ""){
                alert("Se necesita una cantidad valida")
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

/**
 * Muestra un mensaje de confirmación con el nombre del plato y cantidad seleccionada
 * Este elemento se agrega al contenedor para que el usuario vea su selección.
 */
function MostrarConfirmacionPlato(nombre, cantidad){

    const contenedor = document.createElement("div");
    contenedor.className = "form-group";
    contenedor.textContent = `Plato: ${nombre} || Cantidad: ${cantidad}`;
    contenedorPlatos.appendChild(contenedor);
}

/**
 * Despliega el botón "Agregar Plato" que permite al mesero añadir
 * más platos al pedido actual después de haber confirmado uno.
 */
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

/**
 * Despliega los botones finales: "Enviar Pedido" y "Reiniciar Pedido"
 * Solo se muestran una vez, después de que se haya agregado el primer plato.
 */
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

/**
 * Limpia los contenedores de botones "Agregar Plato" y "Enviar/Reiniciar"
 * para resetear la interfaz del pedido.
 */
function LimpiarControlesPedido(){
    document.getElementById("contenedorAgregarPlato").innerHTML = "";
    document.getElementById("contenedorBotonEnviar").innerHTML = "";
}

/**
 * Event listener para el botón "Iniciar Pedido" y limpia
 * cualquier pedido anterior y crea un nuevo formulario para
 * agregar platos
*/
iniciarPedido.addEventListener("click", function(){

        pedido = [];
        contenedorPlatos.innerHTML = "";
        totalPedido.textContent = "";
        LimpiarControlesPedido();        
        CrearFormularioPlato();
        iniciarPedido.style.display = "none";
});

/**
 * Event listener para enviar el pedido completo
 * Calcula el total, muestra el resumen y recarga la página después de 2 segundos
 */
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
    
    // Recargar página después de 2 segundos para permitir ver el resumen
    setTimeout(function(){
        location.reload();
    }, 2000);
});


// Contenedor donde se generarán dinámicamente los inputs de edades
const contenedorEdades = document.getElementById("contenedorEdades");

/**
 * Event listener que genera dinámicamente inputs de edad según el número de personas.
 * Cuando el usuario cambia la cantidad de personas, se crean o eliminan campos de edad
 * para mantener la cantidad correcta de inputs.
 */
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

// Dispara el evento input al cargar la página para generar el input inicial de edad
numPersonas.dispatchEvent(new Event("input"));

/**
 * Función que valida los datos de la reserva de mesa.
 * Verifica que el número de personas sea válido, las edades estén entre 1-100,
 * se haya seleccionado un tipo de evento y la fecha sea válida (igual o posterior a hoy).
 */
function Mesa(numPersonas, edades, tipoEvento, fechaReserva){
    if(numPersonas <= 0){
        alert("No se puede crear la reserva ya que el numero de personas no esta permitido (mín 1)");
        return;
    }
    
    for(let i = 0; i < edades.length; i++){
        if (isNaN(edades[i]) || edades[i] < 1 || edades[i] > 100) {
            alert("Hay edades no válidas en la reserva. Todas las edades deben estar entre 1 y 100 años");   
            return false;
        }
    }

    if(tipoEvento == null || tipoEvento == ""){
        alert("Debe seleccionar un evento valido");
        return false;
    }

    let fechaActual = new Date();
    //Validar Fecha
    if(fechaReserva < fechaActual){
        alert("La fecha seleccionada para la reserva no es valida, debe ser una fecha mayor o igual al día de hoy "+ fechaActual);
        return false;
    }
    return true;
}

/**
 * Event listener para el formulario de reserva
 * Obtiene los datos, valida y confirma la reserva,
 * luego resetea el formulario
 */

const formularioReserva = document.getElementById("formularioReserva");
formularioReserva.addEventListener("submit", function(formReserva){

    formReserva.preventDefault(); //evita que se recargue la página

    const cantidad = parseInt(numPersonas.value);

    // Obtener edades
    const edadesInputs = document.querySelectorAll(".edadInput");
    const edades = [];

    edadesInputs.forEach(input => {
        edades.push(parseInt(input.value));
    });

    const tipoEvento = document.getElementById("evento").value;
    const fechaValor = document.getElementById("fechaReserva").value;
    const fechaReserva = new Date(fechaValor);

    const resultado = Mesa(cantidad, edades, tipoEvento, fechaReserva);

    if(resultado){
        alert("Reserva confirmada");
        formularioReserva.reset();
        contenedorEdades.innerHTML = "";
        numPersonas.dispatchEvent(new Event("input"));
    }
});