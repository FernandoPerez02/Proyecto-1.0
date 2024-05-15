(() => {
  "use strict";

  // Obtener el botón de "Iniciar sesión"
  const botonRegistrar = document.getElementById("btn_iniciar");

  // Agregar evento de clic al botón de "Iniciar sesión"
  botonRegistrar.addEventListener("click", (event) => {
    event.preventDefault();
    // Obtener el formulario asociado al botón de "Iniciar sesión"
    const formulario = botonRegistrar.closest("form");

    // Verificar la validez de cada campo
    let nombreValido = formulario.querySelector("#user").value.trim() !== "";
    let passValida = formulario.querySelector("#password").value.trim() !== "";

    // Verificar si ningún campo está lleno
    if (!nombreValido || !passValida) {
      event.preventDefault();
      event.stopPropagation();
      Swal.fire({
        title: "Error",
        text: "Debes llenar todos los campos del formulario.",
        icon: "error",
        button: "OK",
        customClass: {
          popup: "custom-swal",
        }
      });
      return;
    }

    // Mostrar mensaje de registro exitoso
    Swal.fire({
      title: "Iniciando sesión",
      icon: "info",
      timer: 2000, // Duración del mensaje en milisegundos (2 segundos)
      showConfirmButton: false,
      allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
      customClass: {
        popup: "custom-swal",
      },
      willClose: () => {
        window.location.href = "../../Home - copia/home.html"; // Redirección después de cerrar el mensaje
      }
    });

    // Limpiar los valores de los campos del formulario
    formulario.reset();
    inputs.forEach(input => {
      input.classList.remove('is-invalid');
    });
    form_validacion.classList.remove('was-validated');
  });

  const formulario = document.getElementById("form_validacion");
  const inputs = document.querySelectorAll("#form_validacion input");

  const expresiones = {
    usuario: /^[A-Z-a-z]{6,15}$/i,
    contraseña: /^(?=.*[A-Z])(?=.*\d{2})[A-Z\d]{4,8}$/i,

  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "usuario":
        if (expresiones.usuario.test(e.target.value)) {
          document
            .querySelector("#grup_usuario .error")
            .classList.remove("error-activo");
        } else {
          document
            .querySelector("#grup_usuario .error")
            .classList.add("error-activo");
        }
        break;

      case "contraseña":
        if (expresiones.contraseña.test(e.target.value)) {
          document
            .querySelector("#grup_contraseña .error")
            .classList.remove("error-activo");
        } else {
          document
            .querySelector("#grup_contraseña .error")
            .classList.add("error-activo");
        }
        break;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
  });
})();
