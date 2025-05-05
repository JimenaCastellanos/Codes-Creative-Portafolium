
document.getElementById("input-nombre").addEventListener("input", aplicarFiltros);
document.getElementById("select-estilo").addEventListener("change", aplicarFiltros);
document.getElementById("filtros-categorias").addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  const nombre = document.getElementById("input-nombre").value.toLowerCase();
  const estilo = document.getElementById("select-estilo").value;
  const categoriasSeleccionadas = Array.from(document.querySelectorAll(".filtro-categoria:checked")).map(e => e.value);

  const filtrados = diseniadores.filter(d => {
    const coincideNombre = d.nombre.toLowerCase().includes(nombre);
    const coincideEstilo = estilo ? d.estilo === estilo : true;
    const coincideCategoria = categoriasSeleccionadas.length > 0
      ? categoriasSeleccionadas.every(cat => d.categorias.includes(cat))
      : true;
    return coincideNombre && coincideEstilo && coincideCategoria;
  });

  mostrarDiseniadores(filtrados);
}
