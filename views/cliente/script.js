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
  const tbody = document.getElementById("tbodyPlatos");
  tbody.innerHTML = "";

  if (lista.length === 0) {
    tbody.innerHTML = "<tr class=\"fila-aviso\"><td colspan=\"5\">No hay platos que coincidan.</td></tr>";
    return;
  }

  const filas = lista.map((plato) => `
    <tr>
      <td><img src="../../images/${plato.imagen}" alt="${plato.nombre}" class="menu-img"></td>
      <td>${plato.nombre}</td>
      <td>${plato.categoria}</td>
      <td>${plato.descripcion}</td>
      <td>${formatearPrecio(plato.precio)}</td>
    </tr>
  `);

  tbody.innerHTML = filas.join("");
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

