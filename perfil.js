document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("perfil"));
  if (data) {
    document.getElementById("nombre-display").textContent = `${data.nombre} ${data.apellidos}`;
    document.getElementById("descripcion-display").textContent = data.descripcion;
    document.getElementById("carrera-display").textContent = data.carrera;
    document.getElementById("universidad-display").textContent = data.universidad;
    document.getElementById("origen-display").textContent = data.origen;
    document.getElementById("profile-pic-display").src = data.imagen || "default-profile.png";
  }
});

document.getElementById("edit-button").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Mostrar toast si viene desde guardar perfil
const showToast = localStorage.getItem("showToast");
if (showToast === "true") {
  const toast = document.createElement("div");
  toast.textContent = "Datos guardados correctamente";
  toast.id = "toast";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = 1;
  }, 100);
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 500);
  }, 5000);
  localStorage.removeItem("showToast");
}
