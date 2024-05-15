let listaQuimicos = [];

const objQuimico = {
    id: '',
    tipo: '',
    nombre: '',
    descripcion: '',
    tipoQuimico: '',
    medida: '',
    observacion: '',
    fecha: '',
    estado: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const tipoInput = document.querySelector("#tipo");
const nombreInput = document.querySelector('#nombre');
const descripcionInput = document.querySelector("#descripcion");
const tipoQuimicoInput = document.querySelector('#tipoQuimico');
const medidaInput = document.querySelector("#medida");
const observacionInput = document.querySelector("#observacion");
const fechaInput = document.querySelector("#fecha");
const estadoInput = document.querySelector("#estado");
const btnAgregarInput = document.querySelector('#btnAgregar');
const modalTitle = document.querySelector('.modal-title');
const editbtn = document.querySelector('#btnAgregar');
const btnEliminar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (tipoInput.value === '' || nombreInput.value === '' || descripcionInput.value === '' ||
        tipoQuimicoInput.value === '' || medidaInput.value === '' || observacionInput.value === '' ||
        fechaInput.value === '' || estadoInput.value === ''
    ) {
        alert('Borrar registro');
        return;
    }

    if (editando) {
        editarQuimico();
        editando = false;
    } else {
        objQuimico.id = Date.now();
        objQuimico.tipo = tipoInput.value;
        objQuimico.nombre = nombreInput.value;
        objQuimico.descripcion = descripcionInput.value;
        objQuimico.tipoQuimico = tipoQuimicoInput.value;
        objQuimico.medida = medidaInput.value;
        objQuimico.observacion = observacionInput.value;
        objQuimico.fecha = fechaInput.value;
        objQuimico.estado = estadoInput.value;

        agregarQuimico();
    }
}

function guardarLocalStorage(listaQuimicos) {
    localStorage.setItem('quimicos', JSON.stringify(listaQuimicos))
}

function obtenerLocalStorage() {
    listaQuimicos = JSON.parse(localStorage.getItem('quimicos')) || [];
    mostrarQuimicos();
}

function agregarQuimico() {

    listaQuimicos.push({...objQuimico });

    guardarLocalStorage(listaQuimicos)
    obtenerLocalStorage()

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objQuimico.id = '';
    objQuimico.tipo = '';
    objQuimico.nombre = '';
    objQuimico.descripcion = '';
    objQuimico.tipoQuimico = '';
    objQuimico.medida = '';
    objQuimico.observacion = '';
    objQuimico.fecha = '';
    objQuimico.estado = '';
}

function mostrarQuimicos() {
    
    const tablaBody = document.getElementById('tablaBody');
    limpiarHTML(tablaBody);

    listaQuimicos.forEach(quimicos => {
        const { id, tipo, nombre, descripcion, tipoQuimico, medida, observacion, fecha, estado } = quimicos

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${id}</td>
            <td>${tipo}</td>
            <td>${nombre}</td>
            <td>${descripcion}</td>
            <td>${tipoQuimico}</td>
            <td>${medida}</td>
            <td>${observacion}</td>
            <td>${fecha}</td>
            <td>${estado}</td>
            `;

        const botonedit = document.getElementById('btnEditar')
       
        botonedit.dataset.id = id;
        botonedit.onclick = () => {
            cargarQuimico(id);
            var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                keyboard: false
            });
            myModal.show();
        };
    
        tablaBody.appendChild(tr);
    })
}

function limpiarHTML(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function cargarQuimico(id) {
    const quimicos = listaQuimicos.find(e => e.id == id);

    if (quimicos) {
        tipoInput.value = quimicos.tipo;
        nombreInput.value = quimicos.nombre;
        descripcionInput.value = quimicos.descripcion;
        tipoQuimicoInput.value = quimicos.tipoQuimico;
        medidaInput.value = quimicos.medida;
        observacionInput.value = quimicos.observacion;
        fechaInput.value = quimicos.fecha;
        estadoInput.value = quimicos.estado;
        objQuimico.id = quimicos.id;

        modalTitle.textContent = 'Editar Datos';
        editbtn.textContent = 'Guardar Cambios';
        editando = true;
    }
}

function editarQuimico() {

    objQuimico.tipo = tipoInput.value;
    objQuimico.nombre = nombreInput.value;
    objQuimico.descripcion = descripcionInput.value;
    objQuimico.tipoQuimico = tipoQuimicoInput.value;
    objQuimico.medida = medidaInput.value;
    objQuimico.observacion = observacionInput.value;
    objQuimico.fecha = fechaInput.value;
    objQuimico.estado = estadoInput.value;

    listaQuimicos = listaQuimicos.map(quimicos => {
        if (quimicos.id === objQuimico.id) {
            return objQuimico;
        } else { };
        return quimicos;
    });

    guardarLocalStorage(listaQuimicos);
    obtenerLocalStorage();

    mostrarQuimicos();
    editando = false;
}


function ModalEliminar() {
    const registros = JSON.parse(localStorage.getItem('quimicos')) || [];
  
    const modalBody = document.querySelector('#exampleModal tbody');
    modalBody.innerHTML = '';

    registros.forEach((registro, index) => {
      const row = `
        <tr>
          <td>${registro.tipo}</td>
          <td>${registro.nombre}</td>
          <td>${registro.descripcion}</td>
          <td>${registro.tipoQuimico}</td>
          <td>${registro.medida}</td>
          <td>${registro.observacion}</td>
          <td>${registro.fecha}</td>
          <td>${registro.estado}</td>
          <td><input type="checkbox" class="form-check-input" id="check${index}"></td>
        </tr>
      `;
      modalBody.innerHTML += row;
    });
  
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  
    const btnEliminar = document.querySelector('#btnAgregar');
    btnEliminar.textContent = 'Eliminar';
  
    btnEliminar.addEventListener('click', eliminarQuimicosSeleccionados);
  }
  
  function eliminarQuimicosSeleccionados() {

    let registros = JSON.parse(localStorage.getItem('quimicos')) || [];
  
    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {

        registros = registros.filter((registro, i) => i !== index);
      }
    });
  
    localStorage.setItem('quimicos', JSON.stringify(registros));
  
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();
  
    obtenerLocalStorage();
  }
  
  document.querySelector('#btnEliminar').addEventListener('click', ModalEliminar);
  


obtenerLocalStorage(); 

