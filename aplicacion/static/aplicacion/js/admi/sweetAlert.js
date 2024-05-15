document.addEventListener("DOMContentLoaded", function () {
  //contador para el id
  let count = 1;
  //mostrar el id inicial para cargar la pagina
  document.getElementById("codigo").innerText = "log" + count;

  var btn_cancel = document.getElementById("btn_cancel");
  btn_cancel.addEventListener("click", function (event) {
    event.preventDefault(); // Evita la redirección predeterminada al hacer clic en el enlace

    Swal.fire({
      title: "¿Desea cancelar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      customClass: {
        popup: "custom-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Codigo para cancelar el registro
        Swal.fire("Registro cancelado", "", "success").then(() => {
          window.location.href = "../../Ini_sesion/in_ses.html";
          //ir a otra pagina al oprimir "Si" en la alerta
        });
      } else {
        // No hacer nada si el usuario elige no cancelar
      }
    });
  });

  (() => {
    "use strict";

    // Obtener el botón de "Registrar"
    const botonRegistrar = document.getElementById("btn_register");

    // Agregar evento de clic al botón de "Registrar"
    botonRegistrar.addEventListener("click", (event) => {
      event.preventDefault();
      // Obtener el formulario asociado al botón de "Registrar"
      const formulario = botonRegistrar.closest("form");

      // Verificar la validez de cada campo
      let nombreValido = formulario.querySelector("#user").value.trim() !== "";
      let docValido = formulario.querySelector("#documen").value.trim() !== "";
      let emailValido = formulario.querySelector("#Gmail").value.trim() !== "";
      let passValida =  formulario.querySelector("#password").value.trim() !== "";
      let termValido = formulario.querySelector("#ter_con").checked;

      // Verificar si ningún campo está lleno
      if (
        !nombreValido &&
        !docValido &&
        !emailValido &&
        !passValida &&
        !termValido
      ) {
        event.preventDefault();
        event.stopPropagation();
        Swal.fire({
          title: "Error",
          text: "Debes llenar los campos del formulario.",
          icon: "error",
          button: "OK",
          customClass: {
            popup: "custom-swal",
          },
        });
        return;
      }

      // Verificar cada campo individualmente
      if (!nombreValido) {
        event.preventDefault();
        event.stopPropagation();
        formulario.querySelector("#user").classList.add("is-invalid");
        Swal.fire({
          title: "Error",
          text: "Por favor, completa el campo 'Nombre Completo'.",
          icon: "error",
          button: "OK",
          customClass: {
            popup: "custom-swal",
          },
        });
        return;
      }

      if (!docValido) {
        event.preventDefault();
        event.stopPropagation();
        formulario.querySelector("#documen").classList.add("is-invalid");
        Swal.fire({
          title: "Error",
          text: "Por favor, completa el campo 'Número de Documento'.",
          icon: "error",
          button: "OK",
          customClass: {
            popup: "custom-swal",
          },
        });
        return;
      }

      if (!emailValido) {
        event.preventDefault();
        event.stopPropagation();
        formulario.querySelector("#Gmail").classList.add("is-invalid");
        Swal.fire({
          title: "Error",
          text: "Por favor, completa el campo 'Correo Electrónico'.",
          icon: "error",
          button: "OK",
          customClass: {
            popup: "custom-swal",
          },
        });
        return;
      }

      if (!passValida) {
        event.preventDefault();
        event.stopPropagation();
        formulario.querySelector("#password").classList.add("is-invalid");
        Swal.fire({
          title: "Error",
          text: "Por favor, completa el campo 'Contraseña'.",
          icon: "error",
          button: "OK",
          customClass: {
            popup: "custom-swal",
          },
        });
        return;
      }

      if (!termValido) {
        event.preventDefault();
        event.stopPropagation();
        formulario.querySelector(".form-check").classList.add("is-invalid");
        Swal.fire({
          title: "Error",
          text: "Por favor, acepta los 'Términos y Condiciones'.",
          icon: "error",
          button: "OK",
          customClass: {
            popup: "custom-swal",
          },
        });
        return;
      }

      formulario.classList.add("was-validated");

      let registroExitoso = true;

      if (registroExitoso) {
        // Mostrar mensaje de registro exitoso
        Swal.fire({
          title: "Exito",
          text: "¡Registro Exitoso!",
          icon: "success",
          button: "Ok",
          customClass: {
            popup: "custom-swal",
          },
        }).then(() => {
          count++;
          document.getElementById("codigo").innerText = "log" + count;
        });
        // Limpiar los valores de los campos del formulario
        formulario.reset();
        inputs.forEach((input) => {
          input.classList.remove("is-invalid");
        });
        form_validacion.classList.remove("was-validated");
      }
    });
  })();

  const formulario = document.getElementById("form_validacion");

  const inputs = document.querySelectorAll("#form_validacion input");

  const expresiones = {
    usuario: /^[A-Z]{6,15}$/i,
    documento: /^[0-9]{6,10}$/,
    correo: /^[A-Z-0-9]{4,100}@.(com|co)$/i,
    contraseña: /^[A-Z-0-9]{4,8}$/i,
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "usuario":
        if (expresiones.usuario.test(e.target.value)) {
          document
            .querySelector("#grup_nombre .error")
            .classList.remove("error-activo");
          campos["usuario"] = true;
        } else {
          document
            .querySelector("#grup_nombre .error")
            .classList.add("error-activo");
          campos["usuario"] = false;
        }
        break;

      case "documento":
        if (expresiones.documento.test(e.target.value)) {
          document
            .querySelector("#grup_documento .error")
            .classList.remove("error-activo");
          campos["documento"] = true;
        } else {
          document
            .querySelector("#grup_documento .error")
            .classList.add("error-activo");
          campos["documento"] = false;
        }
        break;

      case "correo":
        if (expresiones.correo.test(e.target.value)) {
          document
            .querySelector("#grup_correo .error")
            .classList.remove("error-activo");
          campos["correo"] = true;
        } else {
          document
            .querySelector("#grup_correo .error")
            .classList.add("error-activo");
          campos["correo"] = false;
        }
        break;

      case "contraseña":
        if (expresiones.contraseña.test(e.target.value)) {
          document
            .querySelector("#grup_contraseña .error")
            .classList.remove("error-activo");
          campos["contraseña"] = true;
        } else {
          document
            .querySelector("#grup_contraseña .error")
            .classList.add("error-activo");
          campos["contraseña"] = false;
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

    if (
      campos.usuario &&
      campos.correo &&
      campos.documento &&
      campos.contraseña
    ) {
      formulario.reset();
    }
  });
});