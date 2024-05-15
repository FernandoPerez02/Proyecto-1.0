document.addEventListener("DOMContentLoaded", function () {
  var btn_volver = document.getElementById("btn_volver");
  btn_volver.addEventListener("click", function (event) {
    event.preventDefault();

    Swal.fire({
      title: "¿Desea cancelar el proceso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      customClass: {
        popup: "custom-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../../Ini_sesion/in_ses.html";
      }
    });
  });

  const formulario = document.getElementById("form_validacion");

  const inputs = document.querySelectorAll("#form_validacion input");

  const expresiones = {
    correo: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    contraseñaactual: /^[A-Z0-9]{4,8}$/i,
    newcontraseña: /^[A-Z0-9]{4,8}$/i,
    confirmarcontraseña: /^[A-Z0-9]{4,8}$/i
  };

  const campos = {
    correo: false,
    contraseñaactual: false,
    newcontraseña: false,
    confirmarcontraseña: false
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
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

      case "contraseñaactual":
        if (expresiones.contraseñaactual.test(e.target.value)) {
          document
            .querySelector("#grup_contraseña .error")
            .classList.remove("error-activo");
          campos["contraseñaactual"] = true;
        } else {
          document
            .querySelector("#grup_contraseña .error")
            .classList.add("error-activo");
          campos["contraseñaactual"] = false;
        }
        break;

      case "newcontraseña":
        if (expresiones.newcontraseña.test(e.target.value)) {
          document
            .querySelector("#grup_newcontraseña .error")
            .classList.remove("error-activo");
          campos["newcontraseña"] = true;
        } else {
          document
            .querySelector("#grup_newcontraseña .error")
            .classList.add("error-activo");
          campos["newcontraseña"] = false;
        }
        break;

      case "confirmarcontraseña":
        if (expresiones.confirmarcontraseña.test(e.target.value) && e.target.value === document.getElementById('newPassword').value) {
          document
            .querySelector("#grup_confirmarcontraseña .error")
            .classList.remove("error-activo");
          campos["confirmarcontraseña"] = true;
        } else {
          document
            .querySelector("#grup_confirmarcontraseña .error")
            .classList.add("error-activo");
          campos["confirmarcontraseña"] = false;
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

    if (!campos.correo) {
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

    if (campos.correo && campos.contraseñaactual && campos.confirmarcontraseña && campos.newcontraseña) {
      // Aquí puedes abrir la modal si todo está correcto
      formulario.reset();
    }
  });

});

