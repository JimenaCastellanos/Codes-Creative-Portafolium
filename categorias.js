
let categorias = ["Ilustración", "Pixel Art", "3D", "Diseño UX", "Branding"];

function renderizarCategorias() {
  const lista = document.getElementById("lista-categorias");
  const filtros = document.getElementById("filtros-categorias");
  lista.innerHTML = "";
  filtros.innerHTML = "";
  categorias.forEach((cat, i) => {
    lista.innerHTML += \`<li>\${cat} <button onclick="editarCategoria(\${i})">Editar</button> <button onclick="eliminarCategoria(\${i})">Eliminar</button></li>\`;
    filtros.innerHTML += \`<label><input type="checkbox" value="\${cat}" class="filtro-categoria"> \${cat}</label>\`;
  });
}

function agregarCategoria() {
  const nueva = document.getElementById("nueva-categoria").value.trim();
  if (nueva && !categorias.includes(nueva)) {
    categorias.push(nueva);
    renderizarCategorias();
  }
  document.getElementById("nueva-categoria").value = "";
}

function eliminarCategoria(i) {
  categorias.splice(i, 1);
  renderizarCategorias();
}

function editarCategoria(i) {
  const nueva = prompt("Editar categoría:", categorias[i]);
  if (nueva && !categorias.includes(nueva)) {
    categorias[i] = nueva;
    renderizarCategorias();
  }
}

document.addEventListener("DOMContentLoaded", renderizarCategorias);
