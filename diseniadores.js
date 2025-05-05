
const diseniadores = [
  { nombre: "Ana Torres", estilo: "Minimalista", categorias: ["Ilustración", "Diseño UX"] },
  { nombre: "Carlos Vega", estilo: "Retro", categorias: ["Pixel Art", "Branding"] },
  { nombre: "Lucía Ramírez", estilo: "Futurista", categorias: ["3D", "Diseño UX"] }
];

function mostrarDiseniadores(lista) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";
  lista.forEach(d => {
    const div = document.createElement("div");
    div.classList.add("diseniador-card");
    div.innerHTML = `<h3>${d.nombre}</h3><p><strong>Estilo:</strong> ${d.estilo}</p><p><strong>Categorías:</strong> ${d.categorias.join(", ")}</p>`;
    contenedor.appendChild(div);
  });
}

mostrarDiseniadores(diseniadores);
