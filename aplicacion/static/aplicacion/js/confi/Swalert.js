const imageForm = document.getElementById('imageForm');
const imageInput = document.getElementById('imageInput');
const imagefoto = document.getElementById('foto');

let currentImage = null;

// Check if there is a stored image URL in localStorage
const storedImageUrl = localStorage.getItem('imageUrl');
if (storedImageUrl) {
    currentImage = storedImageUrl;
    updatefoto();
}

imageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            currentImage = event.target.result;
            updatefoto();
            // Store the image URL in localStorage
            localStorage.setItem('imageUrl', currentImage);
        };
        reader.readAsDataURL(file);
    }
});

function updatefoto() {
    if (currentImage) {
        foto.innerHTML = `<img src="${currentImage}" id="imagen">`;
    } else {
        foto.innerHTML = '';
    }
}


document.addEventListener("DOMContentLoaded", function () {
  var btn_cerrar = document.getElementById("btn_cerrar");
  btn_cerrar.addEventListener("click", function (event) {
    event.preventDefault();

    Swal.fire({
      title: "¿Deseas Cerrar Sesion?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
      customClass: {
        popup: "custom-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
            title: "Sesion Cerrada",
            icon: "success",
            customClass: {
                popup: "custom-swal",
            }
        }).then(() => {
          window.location.href = "../../Ini_sesion/in_ses.html";
        });
      } else {
      }
    });
  });
});


