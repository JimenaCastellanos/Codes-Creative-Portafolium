document.getElementById('uploadForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('imageUpload');

  if (!fileInput.files.length) {
    alert("Selecciona una imagen primero.");
    return;
  }

  const file = fileInput.files[0];
  const validTypes = ['image/png', 'image/jpeg'];

  if (!validTypes.includes(file.type)) {
    alert("Formato no soportado. Solo se permiten JPG y PNG.");
    fileInput.value = '';
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const imageUrl = event.target.result;

    const previewArea = document.getElementById('previewArea');
    previewArea.innerHTML = ''; // Limpiar anteriores

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Vista previa';
    img.style.maxWidth = '100%';
    img.style.borderRadius = '8px';
    img.style.marginTop = '10px';

    previewArea.appendChild(img);
    fileInput.value = '';
  };

  reader.readAsDataURL(file);
});
