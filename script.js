const form = document.getElementById("profile-form");
const preview = document.getElementById("profile-pic-preview");
const input = document.getElementById("profile-pic-input");
const removeBtn = document.getElementById("remove-pic");
const toast = document.getElementById("toast");

const DEFAULT_IMG = "images/default-avatar.jpg";

// Cargar datos guardados si existen
document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("perfil"));
  if (data && data.nombre) {
    document.getElementById("nombre").value = data.nombre;
    document.getElementById("apellidos").value = data.apellidos;
    document.getElementById("descripcion").value = data.descripcion;
    document.getElementById("carrera").value = data.carrera;
    document.getElementById("universidad").value = data.universidad;
    document.getElementById("origen").value = data.origen;
    preview.src = data.imagen || DEFAULT_IMG;
  } else {
    preview.src = DEFAULT_IMG;
  }
});

// Actualizar preview
input.addEventListener("change", () => {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => preview.src = e.target.result;
    reader.readAsDataURL(file);
  }
});

// Eliminar imagen
removeBtn.addEventListener("click", () => {
  preview.src = DEFAULT_IMG;
  input.value = "";
});

// Guardar datos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    descripcion: document.getElementById("descripcion").value,
    carrera: document.getElementById("carrera").value,
    universidad: document.getElementById("universidad").value,
    origen: document.getElementById("origen").value,
    imagen: preview.src !== location.href + DEFAULT_IMG ? preview.src : ""
  };
  localStorage.setItem("perfil", JSON.stringify(data));
  localStorage.setItem("showToast", "true"); // Indicador para mostrar toast en perfil
  window.location.href = "perfil.html"; // Redirige inmediatamente
});
