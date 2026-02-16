// Constructor platos
function Plato (nombre, categoria, descripcion, precio, imagen){
    this.nombre = nombre;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
}

//Quemar datos
const platosMenu = [
  new Plato("Toston con hogao", "Entrada", "Tostadas de plátano maduro...", 15000, "tostones.jpeg"),
  new Plato("Arepa de chocolo", "Entrada", "Arepas de chocolo con queso...", 10000, "arepa.jpeg"),
  new Plato("Bandeja paisa", "Plato fuerte", "Bandeja con frijoles, arroz...", 40000, "bandeja.jpeg"),
  new Plato("Frijolada", "Plato fuerte", "Plato de frijoles con chicharrón...", 25000, "frijolada.jpeg"),
  new Plato("Queso con bocadillo", "Postre", "Sandwich de bocadillo derretido...", 4000, "bocadillo.jpeg")
];

function formatearPrecio(valor) {
  return `$${valor.toLocaleString("es-CO")}`;
}

function renderPlatos(lista) {
  const contenedor = document.getElementById("contenedorPlatos");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<div class=\"fila-aviso\">No hay platos que coincidan.</div>";
    return;
  }

  const tarjetas = lista.map((plato) => `
    <article class="menu-item">
      <img src="../../images/${plato.imagen}" alt="${plato.nombre}" class="menu-img">
      <div class="menu-info">
        <div class="menu-encabezado">
          <h3 class="menu-nombre">${plato.nombre}</h3>
          <span class="menu-precio">${formatearPrecio(plato.precio)}</span>
        </div>
        <p class="menu-categoria">${plato.categoria}</p>
        <p class="menu-descripcion">${plato.descripcion}</p>
      </div>
    </article>
  `);

  contenedor.innerHTML = tarjetas.join("");
}

function filtrarPlatos(nombre, categoria) {
  const texto = nombre.trim().toLowerCase();
  return platosMenu.filter((plato) => {
    const coincideNombre = texto === "" || plato.nombre.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "Todas" || plato.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });
}

document.getElementById("btnBuscar").addEventListener("click", () => {
  const nombre = document.getElementById("inputNombre").value;
  const categoria = document.getElementById("selectCategoria").value;
  const resultados = filtrarPlatos(nombre, categoria);
  renderPlatos(resultados);
});

renderPlatos(platosMenu);

